/**
 * Konfigurasi kontak resmi terpusat untuk Kenaltaher (Taher Daeng Matora).
 * Seluruh komponen, tombol CTA, section kontak, dan footer menggunakan konfigurasi ini.
 */
export const contactConfig = {
  whatsappNumber: "6281257591101",
  whatsappDisplay: "0812-5759-1101",
  whatsappUrl: "https://wa.me/6281257591101",
  githubUrl: "https://github.com/kenaltahercom",
  instagramUrl: "https://www.instagram.com/kenaltaher?psln=MXNkdGE2eHFkcmU1eA==",
  email: "taherdaeng386@gmail.com",
  emailUrl: "mailto:taherdaeng386@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/kenaltaher-b074a5445?utm_source=share_via&utm_content=profile&utm_medium=member_android",
} as const;

export type ContactConfig = typeof contactConfig;

/**
 * Helper untuk menyusun URL WhatsApp dengan pesan pembuka / ringkasan proyek.
 */
export function getWhatsAppUrl(message?: string): string {
  if (!message) return contactConfig.whatsappUrl;
  return `${contactConfig.whatsappUrl}?text=${encodeURIComponent(message)}`;
}
