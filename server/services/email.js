import { google } from "googleapis";

const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN,
  GMAIL_USER_EMAIL,
} = process.env;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN || !GMAIL_USER_EMAIL) {
  console.warn(
    "[email] Missing Gmail API environment variables. " +
    "Expected: GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, GOOGLE_REFRESH_TOKEN, GMAIL_USER_EMAIL"
  );
}

// Initialize OAuth2 client
const oAuth2Client = new google.auth.OAuth2(
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET
);

/**
 * Get an authenticated Gmail client using OAuth2 refresh token
 */
async function getGmailClient() {
  oAuth2Client.setCredentials({
    refresh_token: GOOGLE_REFRESH_TOKEN,
  });

  const gmail = google.gmail({
    version: "v1",
    auth: oAuth2Client,
  });

  return gmail;
}

/**
 * Build a raw RFC 2822 email message and base64url encode it
 */
function buildRawMessage({ from, to, subject, html }) {
  const headers = [
    `From: ${from}`,
    `To: ${to}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    'Content-Type: text/html; charset="UTF-8"',
  ];

  const message = `${headers.join("\r\n")}\r\n\r\n${html}`;

  // Base64url encode (RFC 4648)
  return Buffer.from(message)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

/**
 * Send a single email via Gmail API
 */
async function sendSingleEmail({ to, subject, html }) {
  if (!GMAIL_USER_EMAIL) {
    throw new Error("GMAIL_USER_EMAIL is not configured");
  }

  const gmail = await getGmailClient();
  const raw = buildRawMessage({
    from: GMAIL_USER_EMAIL,
    to,
    subject,
    html,
  });

  await gmail.users.messages.send({
    userId: "me",
    requestBody: {
      raw,
    },
  });
}


export async function sendEmail({ to, subject, html }) {
  if (!to || !subject || !html) {
    throw new Error("to, subject, and html are required");
  }

  const recipients = Array.isArray(to) ? to : [to];

  for (const recipient of recipients) {
    if (!recipient || typeof recipient !== "string") {
      console.warn(`[email] Skipping invalid recipient: ${recipient}`);
      continue;
    }

    try {
      await sendSingleEmail({ to: recipient, subject, html });
      console.log(`[email] Email sent successfully to: ${recipient}`);
    } catch (error) {
      console.error(`[email] Failed to send email to ${recipient}:`, error.message);
      throw error;
    }
  }
}
