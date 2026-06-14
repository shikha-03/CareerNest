import dns from "dns/promises";
import validator from "validator";

export function assertEmailFormat(email) {
  return validator.isEmail(email || "", {
    allow_utf8_local_part: false,
    require_tld: true
  });
}

export async function hasMxRecords(email) {
  const domain = email.split("@")[1];
  if (!domain) return false;

  try {
    const records = await dns.resolveMx(domain);
    return records.length > 0;
  } catch {
    return false;
  }
}
