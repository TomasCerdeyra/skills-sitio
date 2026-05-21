import { Resend } from "resend";

function getResend() {
  return new Resend(process.env.RESEND_API_KEY ?? "re_placeholder");
}

type SendEmailParams = {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
};

export async function sendEmail({ to, subject, html, replyTo }: SendEmailParams) {
  const from = process.env.RESEND_FROM_EMAIL ?? "pedidos@gorras.com.ar";
  const reply = replyTo ?? process.env.RESEND_REPLY_TO;

  const { data, error } = await getResend().emails.send({
    from,
    to,
    subject,
    html,
    ...(reply ? { replyTo: reply } : {}),
  });

  if (error) throw new Error(`Resend error: ${error.message}`);
  return data;
}
