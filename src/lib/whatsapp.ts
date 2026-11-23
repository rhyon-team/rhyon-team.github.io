import { contact } from './site';

/** Enlace que abre un chat con la empresa y el mensaje inicial ya escrito. */
export function obtenerEnlaceWhatsApp(): string {
  return `https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(contact.whatsappMessage)}`;
}
