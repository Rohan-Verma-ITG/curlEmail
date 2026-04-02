import { useEmailForm } from "../hooks/useEmailForm";
import RequestLog from "./RequestLog";

function FieldError({ msg }) {
  if (!msg) return null;
  return (
    <p role="alert" className="mt-1 text-sm text-red-500 dark:text-red-400 flex items-center gap-1">
      <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
      </svg>
      {msg}
    </p>
  );
}

const inputBase =
  "w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-all focus:ring-2 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500";
const inputNormal =
  "border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-indigo-200 dark:focus:ring-indigo-800";
const inputError =
  "border-red-400 dark:border-red-500 focus:border-red-400 focus:ring-red-200 dark:focus:ring-red-900";

export default function EmailForm() {
  const { fields, errors, loading, logs, handleChange, handleSubmit, clearLogs } = useEmailForm();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-indigo-50 dark:from-gray-950 dark:to-gray-900 flex flex-col items-center justify-start px-4 py-12">
      {/* Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600 text-white mb-4 shadow-lg">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
          Inbound Email Tester
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Simulate inbound email webhooks · <code className="text-indigo-500 text-xs">POST /webhooks/email/inbound</code>
        </p>
      </div>

      {/* Card */}
      <div className="w-full max-w-lg bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
            Compose Email
          </h2>
        </div>

        <form onSubmit={handleSubmit} noValidate className="px-6 py-6 space-y-5">
          {/* Sender */}
          <div>
            <label htmlFor="sender" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Sender Email <span className="text-red-400">*</span>
            </label>
            <input
              id="sender"
              name="sender"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={fields.sender}
              onChange={handleChange}
              disabled={loading}
              aria-invalid={!!errors.sender}
              aria-describedby={errors.sender ? "sender-error" : undefined}
              className={`${inputBase} ${errors.sender ? inputError : inputNormal}`}
            />
            <FieldError msg={errors.sender} />
          </div>

          {/* Subject */}
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Subject <span className="text-red-400">*</span>
            </label>
            <input
              id="subject"
              name="subject"
              type="text"
              placeholder="Order not received"
              value={fields.subject}
              onChange={handleChange}
              disabled={loading}
              aria-invalid={!!errors.subject}
              className={`${inputBase} ${errors.subject ? inputError : inputNormal}`}
            />
            <FieldError msg={errors.subject} />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Message <span className="text-red-400">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              placeholder="Describe your issue..."
              value={fields.message}
              onChange={handleChange}
              disabled={loading}
              aria-invalid={!!errors.message}
              className={`${inputBase} resize-none ${errors.message ? inputError : inputNormal}`}
            />
            <FieldError msg={errors.message} />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold text-sm px-4 py-3 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900 shadow-sm"
          >
            {loading ? (
              <>
                <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Sending…
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
                Send Email
              </>
            )}
          </button>
        </form>
      </div>

      {/* Request Log Panel */}
      <RequestLog logs={logs} onClear={clearLogs} />
    </div>
  );
}
