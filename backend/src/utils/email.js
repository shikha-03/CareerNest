import nodemailer from "nodemailer";
import dns from "dns";
import { promisify } from "util";

dns.setDefaultResultOrder("ipv4first");
const resolve4 = promisify(dns.resolve4);

async function createTransport() {
  const smtpHost = process.env.SMTP_HOST;
  if (!smtpHost) {
    return null;
  }

  let host = smtpHost;
  try {
    const addresses = await resolve4(smtpHost);
    if (addresses.length > 0) {
      host = addresses[0];
    }
  } catch (error) {
    console.warn(`Could not resolve IPv4 SMTP host ${smtpHost}: ${error.message}`);
  }

  return nodemailer.createTransport({
    host,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
    },
    requireTLS: Number(process.env.SMTP_PORT || 587) === 587,
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 30000,
    family: 4,
    tls: {
      servername: smtpHost
    }
  });
}

export async function sendEmail({ to, subject, html, requireDelivery = false }) {
  const transporter = await createTransport();
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
