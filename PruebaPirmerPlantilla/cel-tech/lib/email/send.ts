import { Resend } from "resend";

interface SendEmailParams {
  resendApiKey: string;
  to: string;
  subject: string;
  html: string;
  fromName?: string;
  fromEmail?: string;
}

export async function sendTransactionalEmail({
  resendApiKey,
  to,
  subject,
  html,
  fromName = process.env.RESEND_FROM_NAME || "Cel Tech",
  fromEmail = process.env.RESEND_FROM_EMAIL || `noreply@${process.env.RESEND_FROM_DOMAIN}`,
}: SendEmailParams) {
  const resend = new Resend(resendApiKey);

  const result = await resend.emails.send({
    from: `${fromName} <${fromEmail}>`,
    to: [to],
    subject,
    html,
  });

  if (result.error) {
    console.error("Email failed:", result.error);
    throw new Error(`Email error: ${result.error.message}`);
  }

  return result.data;
}
