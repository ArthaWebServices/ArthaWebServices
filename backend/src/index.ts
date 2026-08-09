import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { cors } from "hono/cors";
import fs from "node:fs";
import path from "node:path";

// Auto-load .env file if process.env variables are not populated
try {
  const envPath = path.resolve(process.cwd(), ".env");
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, "utf-8");
    for (const line of envContent.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx > 0) {
        const key = trimmed.slice(0, eqIdx).trim();
        let val = trimmed.slice(eqIdx + 1).trim();
        if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
          val = val.slice(1, -1);
        }
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  }
} catch (e) {
  // Ignore error
}

/**
 * L_page API server (Hono).
 */

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escapeHtml = (str: string): string =>
  str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const app = new Hono();

app.use("/api/*", cors());

app.post("/api/project", async (c) => {
  const form = await c.req.formData();
  const get = (key: string): string => {
    const value = form.get(key);
    return typeof value === "string" ? value.trim() : "";
  };

  const name = get("name");
  const email = get("email");
  const description = get("description");

  // Required fields
  if (!name) {
    return c.json({ ok: false, message: "Please provide your name." }, 400);
  }
  if (!email || !EMAIL_RE.test(email)) {
    return c.json({ ok: false, message: "Please provide a valid email address." }, 400);
  }
  if (!description) {
    return c.json({ ok: false, message: "Please describe your project." }, 400);
  }

  const files = form
    .getAll("files")
    .filter((entry: unknown): entry is File => entry instanceof File && entry.size > 0);
  const googleDocs = get("googleDocs");
  const dropbox = get("dropbox");

  // --- Log submission to console ---
  console.log("=== New project query ===");
  console.log(`Name:        ${name}`);
  console.log(`Email:       ${email}`);
  console.log(`Phone:       ${get("phone") || "—"}`);
  console.log(`Company:     ${get("company") || "—"}`);
  console.log(`Description: ${description}`);
  if (googleDocs) console.log(`Google Docs: ${googleDocs}`);
  if (dropbox) console.log(`Dropbox:     ${dropbox}`);
  if (files.length) {
    console.log(`Attached files (${files.length}):`);
    files.forEach((file) => console.log(`  - ${file.name} (${(file.size / 1024).toFixed(1)} KB)`));
  } else {
    console.log("Attached files: none");
  }
  console.log("=============================");

  // --- Send Telegram Notification & File Attachments ---
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (botToken && chatId) {
    try {
      const phone = get("phone");
      const company = get("company");

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

      // 1. Send HTML-formatted text message to Telegram
      console.log("Attempting to send Telegram message to chat ID:", chatId);
      const tgRes = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: messageText,
          parse_mode: "HTML",
        }),
      });

      const tgResultText = await tgRes.text();
      if (!tgRes.ok) {
        console.error("❌ Telegram sendMessage error:", tgResultText);
      } else {
        console.log("✅ Telegram text notification sent successfully!");
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

        const docResultText = await docRes.text();
        if (!docRes.ok) {
          console.error(`❌ Telegram sendDocument error for ${file.name}:`, docResultText);
        } else {
          console.log(`✅ Sent file attachment '${file.name}' to Telegram.`);
        }
      }
    } catch (err) {
      console.error("❌ Error pushing to Telegram:", err);
    }
  } else {
    console.log("ℹ️ Telegram notifications skipped (TELEGRAM_BOT_TOKEN / TELEGRAM_CHAT_ID missing).");
  }

  return c.json(
    { ok: true, message: "Thanks! Your project details were received. We'll be in touch within one business day." },
    200
  );
});

const port = Number(process.env.PORT || 4000);

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`API server listening on http://localhost:${info.port}`);
});
