import { NextResponse } from "next/server";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (str: string): string =>
  str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export async function POST(req: Request): Promise<NextResponse> {
  try {
    const form = await req.formData();
    const get = (key: string): string => {
      const value = form.get(key);
      return typeof value === "string" ? value.trim() : "";
    };

    const name = get("name");
    const email = get("email");
    const description = get("description");

    if (!name) {
      return NextResponse.json({ ok: false, message: "Please provide your name." }, { status: 400 });
    }
    if (!email || !EMAIL_RE.test(email)) {
      return NextResponse.json({ ok: false, message: "Please provide a valid email address." }, { status: 400 });
    }
    if (!description) {
      return NextResponse.json({ ok: false, message: "Please describe your project." }, { status: 400 });
    }

    const files = form
      .getAll("files")
      .filter((entry: unknown): entry is File => entry instanceof File && entry.size > 0);
    const googleDocs = get("googleDocs");
    const dropbox = get("dropbox");
    const phone = get("phone");
    const company = get("company");

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      const messageText = [
        "<b>🚀 New Project Lead received!</b>",
        "",
        `<b>👤 Name:</b> ${escapeHtml(name)}`,
        `<b>📧 Email:</b> ${escapeHtml(email)}`,
        phone ? `<b>📞 Phone:</b> ${escapeHtml(phone)}` : null,
        company ? `<b>🏢 Company:</b> ${escapeHtml(company)}` : null,
        "",
        "<b>📝 Project Description:</b>",
        escapeHtml(description),
        "",
        googleDocs ? `<b>📄 Google Docs:</b> ${escapeHtml(googleDocs)}` : null,
        dropbox ? `<b>📦 Dropbox:</b> ${escapeHtml(dropbox)}` : null,
        files.length ? `<b>📎 Attached Files:</b> ${files.length} file(s)` : null,
      ]
        .filter(Boolean)
        .join("\n");

      // 1. Send HTML formatted text message to Telegram
      const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: messageText,
          parse_mode: "HTML",
        }),
      });

      if (!tgRes.ok) {
        console.error("Telegram sendMessage error:", await tgRes.text());
      }

      // 2. Send file attachments directly to Telegram as documents
      for (const file of files) {
        const tgFormData = new FormData();
        tgFormData.append("chat_id", chatId);

        const arrayBuffer = await file.arrayBuffer();
        const blob = new Blob([arrayBuffer], { type: file.type || "application/octet-stream" });
        tgFormData.append("document", blob, file.name);

        const docRes = await fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
          method: "POST",
          body: tgFormData,
        });

        if (!docRes.ok) {
          console.error(`Telegram sendDocument error for ${file.name}:`, await docRes.text());
        }
      }
    } else {
      console.log("Telegram notification skipped: TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID environment variables missing.");
    }

    return NextResponse.json({
      ok: true,
      message: "Thanks! Your project details were received. We'll be in touch within one business day.",
    });
  } catch (err) {
    console.error("Error processing form:", err);
    return NextResponse.json(
      { ok: false, message: "Something went wrong processing your request." },
      { status: 500 }
    );
  }
}
