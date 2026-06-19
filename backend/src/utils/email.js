import nodemailer from "nodemailer";

function createTransport() {
  if (!process.env.SMTP_HOST) {
    return null;
  }

  return nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: Number(process.env.SMTP_PORT) === 465,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 20000,
  family: 4
  });
}

export async function sendEmail({ to, subject, html, requireDelivery = false }) {
  const transporter = createTransport();
  if (!transporter) {
    if (requireDelivery) {
      throw new Error("SMTP is not configured. Cannot deliver email.");
    }
    console.log(`[email skipped] ${subject} -> ${to}`);
    return;
  }

  const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject,
    html
  });

  if (requireDelivery && !info.accepted?.includes(to)) {
    throw new Error("Email provider did not accept this recipient.");
  }

  return info;
}
