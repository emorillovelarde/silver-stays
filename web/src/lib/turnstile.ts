export async function verifyTurnstile(
  token: string,
  ip: string,
): Promise<boolean> {
  if (process.env.NODE_ENV === "development") return true;

  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) {
    console.error("[verifyTurnstile] TURNSTILE_SECRET_KEY is not set");
    return false;
  }

  try {
    const res = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({ secret, response: token, remoteip: ip }),
      },
    );
    const data = await res.json();
    return data.success === true;
  } catch (err) {
    console.error("[verifyTurnstile] Error:", err);
    return false;
  }
}
