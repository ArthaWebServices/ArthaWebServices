"use client";

import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { CheckCircle2, FileText, Link2, Loader2, Send, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// The backend API server endpoint. Relative path in production / Vercel, or custom API URL if set.
const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

const fieldClass =
  "w-full rounded-xl border border-ink/10 bg-white px-4 py-3 text-sm text-ink shadow-sm outline-none transition-colors placeholder:text-ink/40 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 dark:border-white/10 dark:bg-white/[0.04] dark:text-ink-50 dark:placeholder:text-ink-100/40 dark:focus:border-brand-400";

const labelClass = "mb-1.5 block text-sm font-medium text-ink/80 dark:text-ink-100/80";

interface ProjectFormApiResponse {
  ok?: boolean;
  message?: string;
}

export function ProjectForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [description, setDescription] = useState("");
  const [googleDocs, setGoogleDocs] = useState("");
  const [dropbox, setDropbox] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = (event: ChangeEvent<HTMLInputElement>): void => {
    const selected = Array.from(event.target.files ?? []);
    if (selected.length) setFiles((prev) => [...prev, ...selected]);
    // Allow re-selecting the same file after removal
    event.target.value = "";
  };

  const removeFile = (index: number): void => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const reset = (): void => {
    setName("");
    setEmail("");
    setPhone("");
    setCompany("");
    setDescription("");
    setGoogleDocs("");
    setDropbox("");
    setFiles([]);
    setError("");
    setStatus("idle");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    setError("");

    if (!name.trim()) return setError("Please tell us your name.");
    if (!EMAIL_RE.test(email.trim())) return setError("Please provide a valid email address.");
    if (!description.trim()) return setError("Please describe your project.");

    setStatus("submitting");

    const formData = new FormData();
    formData.append("name", name.trim());
    formData.append("email", email.trim());
    formData.append("phone", phone.trim());
    formData.append("company", company.trim());
    formData.append("description", description.trim());
    formData.append("googleDocs", googleDocs.trim());
    formData.append("dropbox", dropbox.trim());
    files.forEach((file) => formData.append("files", file));

    try {
      const res = await fetch(`${API_BASE}/api/project`, { method: "POST", body: formData });
      const data: ProjectFormApiResponse = await res.json();
      if (!res.ok || !data.ok) {
        setStatus("error");
        if (res.status === 429) {
          setError("Too many attempts. Please wait a minute and try again.");
          return;
        }
        setError(data.message ?? "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setError("Network error. Please check your connection and try again.");
    }
  };

  if (status === "success") {
    return (
      <div className="card flex flex-col items-center gap-4 py-14 text-center">
        <CheckCircle2 className="h-12 w-12 text-brand-500" aria-hidden />
        <h2 className="h-section">Thank you!</h2>
        <p className="lead max-w-md">
          Your project details were received. We&apos;ll reply within one business day with a
          clear next step.
        </p>
        <button
          type="button"
          onClick={reset}
          className="mt-2 text-sm font-semibold text-brand-600 underline-offset-4 hover:underline dark:text-brand-300"
        >
          Send another query
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-6">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Name <span className="text-brand-600 dark:text-brand-400">*</span>
          </label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-brand-600 dark:text-brand-400">*</span>
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="jane@company.com"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="phone" className={labelClass}>
            Phone <span className="text-xs font-normal text-ink/40 dark:text-ink-100/40">(optional)</span>
          </label>
          <input
            id="phone"
            type="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 (555) 000-0000"
            className={fieldClass}
          />
        </div>

        <div>
          <label htmlFor="company" className={labelClass}>
            Company <span className="text-xs font-normal text-ink/40 dark:text-ink-100/40">(optional)</span>
          </label>
          <input
            id="company"
            type="text"
            autoComplete="organization"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Acme Inc."
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="description" className={labelClass}>
          Project description <span className="text-brand-600 dark:text-brand-400">*</span>
        </label>
        <textarea
          id="description"
          rows={5}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tell us about your goals, timeline, and what success looks like…"
          className={cn(fieldClass, "resize-y")}
        />
      </div>

      {/* Attachments */}
      <div className="rounded-2xl border border-dashed border-ink/15 p-5 dark:border-white/15">
        <div className="mb-4 flex items-center gap-2 text-sm font-medium text-ink/80 dark:text-ink-100/80">
          <Upload className="h-4 w-4 text-brand-500" aria-hidden />
          Select files from your computer, or share Google Docs / Dropbox URLs
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {/* From your computer */}
          <div>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex h-full min-h-[7rem] w-full flex-col items-center justify-center gap-2 rounded-xl border border-ink/10 bg-white px-4 py-5 text-center text-sm font-medium text-ink/70 transition-colors hover:border-brand-400/50 hover:text-brand-600 dark:border-white/10 dark:bg-white/[0.03] dark:text-ink-100/70 dark:hover:border-brand-400/50 dark:hover:text-brand-300"
            >
              <Upload className="h-5 w-5 text-brand-500" aria-hidden />
              From your computer
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="sr-only"
              onChange={handleFiles}
            />
          </div>

          {/* Google Docs */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="googleDocs"
              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink/50 dark:text-ink-100/50"
            >
              <FileText className="h-3.5 w-3.5" aria-hidden /> Google Docs URL
            </label>
            <input
              id="googleDocs"
              type="url"
              value={googleDocs}
              onChange={(e) => setGoogleDocs(e.target.value)}
              placeholder="https://docs.google.com/…"
              className={cn(fieldClass, "min-h-[7rem] sm:flex-1 sm:min-h-0")}
            />
          </div>

          {/* Dropbox */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="dropbox"
              className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-ink/50 dark:text-ink-100/50"
            >
              <Link2 className="h-3.5 w-3.5" aria-hidden /> Dropbox URL
            </label>
            <input
              id="dropbox"
              type="url"
              value={dropbox}
              onChange={(e) => setDropbox(e.target.value)}
              placeholder="https://www.dropbox.com/…"
              className={cn(fieldClass, "min-h-[7rem] sm:flex-1 sm:min-h-0")}
            />
          </div>
        </div>

        {/* Selected files */}
        {files.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {files.map((file, index) => (
              <li
                key={`${file.name}-${index}`}
                className="inline-flex items-center gap-2 rounded-full border border-ink/10 bg-white px-3 py-1.5 text-xs text-ink/70 dark:border-white/10 dark:bg-white/[0.04] dark:text-ink-100/70"
              >
                <FileText className="h-3.5 w-3.5 shrink-0 text-brand-500" aria-hidden />
                <span className="max-w-[10rem] truncate">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  aria-label={`Remove ${file.name}`}
                  className="text-ink/40 transition-colors hover:text-ink dark:text-ink-100/40 dark:hover:text-white"
                >
                  <X className="h-3.5 w-3.5" aria-hidden />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {error ? (
        <p role="alert" className="text-sm font-medium text-red-600 dark:text-red-400">
          {error}
        </p>
      ) : null}

      <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs text-ink/50 dark:text-ink-100/50">
          Free discovery call · No obligation · Reply within one business day
        </p>
        <button
          type="submit"
          disabled={status === "submitting"}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-600 px-7 py-3.5 text-base font-semibold text-white shadow-lg shadow-brand-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-brand-500 hover:shadow-brand-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-ink disabled:pointer-events-none disabled:opacity-60"
        >
          {status === "submitting" ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> Sending…
            </>
          ) : (
            <>
              <Send className="h-4 w-4" aria-hidden /> Send project details
            </>
          )}
        </button>
      </div>
    </form>
  );
}
