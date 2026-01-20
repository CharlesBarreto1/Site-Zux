export const WHATSAPP_PHONE_E164 = "554431102530";

/**
 * Returns a WhatsApp wa.me URL.
 * Note: Prefer using this URL in <a href> for best compatibility (avoids popup blockers).
 */
export function getWhatsAppUrl(message?: string) {
  const base = `https://wa.me/${WHATSAPP_PHONE_E164}`;
  if (!message) return base;
  return `${base}?text=${encodeURIComponent(message)}`;
}
