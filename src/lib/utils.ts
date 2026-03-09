export function isValidPhone(phone: string | undefined): boolean {
  if (!phone) return false;
  if (/XX/i.test(phone)) return false;
  if (/1234\s*5678/.test(phone)) return false;
  if (phone.toLowerCase() === "placeholder") return false;
  return true;
}
