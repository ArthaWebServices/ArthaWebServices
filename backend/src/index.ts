import { serve } from "@hono/node-server";
import { Hono, Context } from "hono";
import { cors } from "hono/cors";
import { z } from "zod";
import { v4 as uuidv4 } from "uuid";
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
 * L_page API server (Hono) with comprehensive security, validation, and testing.
 */

// Type for app context
type AppContext = {
  Variables: {
    requestId: string;
  };
};

// Constants
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const MAX_FILES = 5;
const MAX_FIELD_LENGTH = 10000;
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 5;

// Rate limiting store (simple in-memory; use Redis for production)
const rateLimitStore = new Map<string, number[]>();

// Validation schemas
const ProjectSubmissionSchema = z.object({
  name: z.string().trim().min(2).max(100).refine((value) => !/^\s*$/.test(value), {
    message: "Name is required",
  }),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(20).optional().or(z.literal(""))
    .transform((value) => value ?? "")
    .refine((value) => value === "" || /^[+()\d\s-]{7,20}$/.test(value), {
      message: "Phone number is invalid",
    })
    .default(""),
  company: z.string().trim().max(100).optional().or(z.literal(""))
    .transform((value) => value ?? "")
    .default(""),
  description: z.string().trim().min(25).max(MAX_FIELD_LENGTH).refine((value) => !/^\s*$/.test(value), {
    message: "Project description must be at least 25 characters",
  }),
  googleDocs: z.string().trim().optional().or(z.literal(""))
    .transform((value) => value ?? "")
    .refine((value) => value === "" || /^https?:\/\//i.test(value ?? ""), {
      message: "Google Docs link must be a valid URL",
    })
    .default(""),
  dropbox: z.string().trim().optional().or(z.literal(""))
    .transform((value) => value ?? "")
    .refine((value) => value === "" || /^https?:\/\//i.test(value ?? ""), {
      message: "Dropbox link must be a valid URL",
    })
    .default(""),
});

// Utility functions
const escapeHtml = (str: string): string =>
  str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

const sanitizeString = (str: string): string => {
  return str.trim().replace(/[<>]/g, "");
};

/**
 * Rate limiter middleware - returns true if request should be allowed
 */
const checkRateLimit = (clientId: string): boolean => {
  const now = Date.now();
  const windowStart = now - RATE_LIMIT_WINDOW;

  let requests = rateLimitStore.get(clientId) || [];
  requests = requests.filter(time => time > windowStart);

  if (requests.length >= RATE_LIMIT_MAX_REQUESTS) {
    return false;
  }

  requests.push(now);
  rateLimitStore.set(clientId, requests);

  // Cleanup old entries periodically
  if (Math.random() < 0.01) {
    for (const [id, times] of rateLimitStore.entries()) {
      const validTimes = times.filter(t => t > windowStart);
      if (validTimes.length === 0) {
        rateLimitStore.delete(id);
      } else {
        rateLimitStore.set(id, validTimes);
      }
    }
  }

  return true;
};

const app = new Hono<AppContext>();

// Security headers middleware
app.use("*", async (c, next) => {
  c.header("X-Content-Type-Options", "nosniff");
  c.header("X-Frame-Options", "DENY");
  c.header("X-XSS-Protection", "1; mode=block");
  c.header("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  c.header("Content-Security-Policy", "default-src 'self'");

  // Generate request ID for logging
  const requestId = uuidv4();
  c.set("requestId", requestId);

  await next();
});

// Request logging middleware
app.use("*", async (c, next) => {
  const requestId = c.get("requestId");
  const startTime = Date.now();

  await next();

  const duration = Date.now() - startTime;
  const method = c.req.method;
  const pathStr = c.req.path;
  const status = c.res.status;

  console.log(`[${requestId}] ${method} ${pathStr} ${status} ${duration}ms`);
});

app.use("/api/*", cors({
  origin: process.env.ALLOWED_ORIGINS?.split(",") || "*",
  allowMethods: ["POST", "GET", "OPTIONS"],
  allowHeaders: ["Content-Type"],
  exposeHeaders: ["X-Request-Id"],
  credentials: false,
}));

// Keep free-tier services awake: Render sleeps free web services after 15
// minutes of inactivity. A cron service pings this endpoint every 5 minutes.
app.get("/health", (c) => {
  const requestId = c.get("requestId") || "unknown";
  return c.json({
    ok: true,
    status: "alive",
    requestId,
    timestamp: new Date().toISOString(),
  });
});

// Alias for health checks that expect /api/health
app.get("/api/health", (c) => {
  const requestId = c.get("requestId") || "unknown";
  return c.json({
    ok: true,
    status: "alive",
    requestId,
    timestamp: new Date().toISOString(),
  });
});

/**
 * POST /api/project - Submit a new project inquiry
 * 
 * Security Features:
 * - Input validation with Zod
 * - Rate limiting per IP
 * - File size and count validation
 * - XSS prevention through escaping
 * - CORS protection
 * - Request logging with request IDs
 */
app.post("/api/project", async (c) => {
  const requestId = c.get("requestId") || "unknown";

  try {
    // Rate limiting
    const clientIp = c.req.header("x-forwarded-for") || c.req.header("cf-connecting-ip") || "unknown";
    if (!checkRateLimit(clientIp)) {
      console.warn(`[${requestId}] Rate limit exceeded for IP: ${clientIp}`);
      return c.json(
        { ok: false, message: "Too many requests. Please try again later." },
        429
      );
    }

    const form = await c.req.formData();

    // Extract and sanitize form data
    const rawData = {
      name: form.get("name") as string || "",
      email: form.get("email") as string || "",
      phone: form.get("phone") as string || "",
      company: form.get("company") as string || "",
      description: form.get("description") as string || "",
      googleDocs: form.get("googleDocs") as string || "",
      dropbox: form.get("dropbox") as string || "",
    };

    // Validate using Zod
    let validatedData;
    try {
      validatedData = ProjectSubmissionSchema.parse(rawData);
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        const fieldErrors = validationError.issues.map((e: z.ZodIssue) => `${e.path.join(".")}: ${e.message}`);
        console.warn(`[${requestId}] Validation failed:`, fieldErrors);
        return c.json(
          {
            ok: false,
            message: "Validation failed",
            errors: fieldErrors,
          },
          400
        );
      }
      throw validationError;
    }

    // Handle file uploads
    const files = form
      .getAll("files")
      .filter((entry: unknown): entry is File => entry instanceof File && entry.size > 0);

    // Validate file count
    if (files.length > MAX_FILES) {
      console.warn(`[${requestId}] Too many files uploaded: ${files.length}`);
      return c.json(
        { ok: false, message: `Maximum ${MAX_FILES} files allowed` },
        400
      );
    }

    // Validate file sizes
    let totalSize = 0;
    const validFiles: Array<{ name: string; size: number }> = [];
    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        console.warn(`[${requestId}] File too large: ${file.name} (${file.size} bytes)`);
        return c.json(
          { ok: false, message: `File "${file.name}" exceeds maximum size of ${MAX_FILE_SIZE / 1024 / 1024}MB` },
          400
        );
      }
      totalSize += file.size;
      if (totalSize > MAX_FILE_SIZE * 2) {
        console.warn(`[${requestId}] Total file size too large: ${totalSize} bytes`);
        return c.json(
          { ok: false, message: "Total file size exceeds limit" },
          400
        );
      }
      validFiles.push({ name: file.name, size: file.size });
    }

    // Log submission
    console.log(`[${requestId}] === New project inquiry ===`);
    console.log(`[${requestId}] Name:        ${validatedData.name}`);
    console.log(`[${requestId}] Email:       ${validatedData.email}`);
    console.log(`[${requestId}] Phone:       ${validatedData.phone || "—"}`);
    console.log(`[${requestId}] Company:     ${validatedData.company || "—"}`);
    console.log(`[${requestId}] Description: ${validatedData.description.substring(0, 100)}...`);
    if (validatedData.googleDocs) console.log(`[${requestId}] Google Docs: ${validatedData.googleDocs}`);
    if (validatedData.dropbox) console.log(`[${requestId}] Dropbox:     ${validatedData.dropbox}`);
    if (validFiles.length) {
      console.log(`[${requestId}] Attached files (${validFiles.length}):`);
      validFiles.forEach((file) => console.log(`[${requestId}]   - ${file.name} (${(file.size / 1024).toFixed(1)} KB)`));
    }

    // Send Telegram Notification
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (botToken && chatId) {
      try {
        const messageText = [
          "<b>🚀 New Project Lead received!</b>",
          "",
          `<b>👤 Name:</b> ${escapeHtml(validatedData.name)}`,
          `<b>📧 Email:</b> ${escapeHtml(validatedData.email)}`,
          validatedData.phone ? `<b>📞 Phone:</b> ${escapeHtml(validatedData.phone)}` : null,
          validatedData.company ? `<b>🏢 Company:</b> ${escapeHtml(validatedData.company)}` : null,
          "",
          "<b>📝 Project Description:</b>",
          escapeHtml(validatedData.description),
          "",
          validatedData.googleDocs ? `<b>📄 Google Docs:</b> ${escapeHtml(validatedData.googleDocs)}` : null,
          validatedData.dropbox ? `<b>📦 Dropbox:</b> ${escapeHtml(validatedData.dropbox)}` : null,
          validFiles.length ? `<b>📎 Attached Files:</b> ${validFiles.length} file(s)` : null,
        ]
          .filter(Boolean)
          .join("\n");

        console.log(`[${requestId}] Sending Telegram notification...`);
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
          const error = await tgRes.text();
          console.error(`[${requestId}] Telegram error:`, error);
        } else {
          console.log(`[${requestId}] ✅ Telegram notification sent`);
        }

        // Send file attachments
        for (const file of files) {
          try {
            const tgFormData = new FormData();
            tgFormData.append("chat_id", chatId);
            const arrayBuffer = await file.arrayBuffer();
            const blob = new Blob([arrayBuffer], { type: file.type || "application/octet-stream" });
            tgFormData.append("document", blob, file.name);

            const docRes = await fetch(`https://api.telegram.org/bot${botToken}/sendDocument`, {
              method: "POST",
              body: tgFormData,
            });

            if (docRes.ok) {
              console.log(`[${requestId}] ✅ File sent: ${file.name}`);
            } else {
              console.error(`[${requestId}] Failed to send file: ${file.name}`);
            }
          } catch (err) {
            console.error(`[${requestId}] Error sending file ${file.name}:`, err);
          }
        }
      } catch (err) {
        console.error(`[${requestId}] Telegram integration error:`, err);
        // Don't fail the request if Telegram fails
      }
    } else {
      console.log(`[${requestId}] Telegram notifications disabled (missing credentials)`);
    }

    return c.json(
      {
        ok: true,
        message: "Thanks! Your project details were received. We'll be in touch within one business day.",
        requestId,
      },
      200
    );
  } catch (err) {
    const id = c.get("requestId") || "unknown";
    console.error(`[${id}] Unexpected error:`, err);
    return c.json(
      { ok: false, message: "An unexpected error occurred. Please try again later.", requestId: id },
      500
    );
  }
});

// 404 handler
app.notFound((c) => {
  let requestId = "unknown";
  try {
    requestId = c.get("requestId") || "unknown";
  } catch {
    // ignore
  }
  
  return c.json(
    { ok: false, message: "Endpoint not found", requestId },
    404
  );
});

// Error handler
app.onError((err, c) => {
  let requestId = "unknown";
  try {
    requestId = c.get("requestId") || "unknown";
  } catch {
    // ignore
  }
  
  console.error(`[${requestId}] Unhandled error:`, err);

  if (err instanceof Error) {
    return c.json(
      {
        ok: false,
        message: "An error occurred",
        error: process.env.NODE_ENV === "development" ? err.message : undefined,
        requestId,
      },
      500
    );
  }

  return c.json(
    { ok: false, message: "An unexpected error occurred", requestId },
    500
  );
});

const port = Number(process.env.PORT || 4000);

serve({ fetch: app.fetch, port }, (info) => {
  console.log(`🚀 API server listening on http://localhost:${info.port}`);
  console.log(`📝 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🔒 Security headers enabled`);
  console.log(`⏱️ Rate limiting: ${RATE_LIMIT_MAX_REQUESTS} requests per ${RATE_LIMIT_WINDOW / 1000}s`);
});
