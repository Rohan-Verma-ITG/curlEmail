const ENDPOINT = "http://localhost:8000/webhooks/email/inbound";
const MAX_RETRIES = 2;

export async function sendInboundEmail({ sender, subject, message }, retries = MAX_RETRIES) {
  const formData = new URLSearchParams();
  formData.append("sender", sender);
  formData.append("subject", subject);
  formData.append("stripped-text", message);

  let lastError;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data?.message || `Server error: ${response.status}`);
      }

      return { ok: true, status: response.status, data };
    } catch (err) {
      lastError = err;
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, 800 * (attempt + 1)));
      }
    }
  }

  throw lastError;
}
