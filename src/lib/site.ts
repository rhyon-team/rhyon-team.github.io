/**
 * Configuracion central del sitio.
 *
 * Todo dato que se repita entre paginas (nombre, contacto, navegacion, redes)
 * vive aca. Los componentes lo importan; no se escriben estos valores sueltos
 * en el markup.
 */

export const site = {
  name: 'RHYON',
  /** Se usa en <title> como sufijo: "Servicios — RHYON" */
  titleTemplate: '%s — RHYON',
  /** Fallback cuando una pagina no declara descripcion propia. */
  description:
    'Software a medida, integraciones y primeras versiones para tu negocio. Software, IA y consultoría.',
  /** Bajada de la marca. Aparece en el hero y en el footer. */
  tagline: 'Software · IA · Consultoría',
  /** Debe coincidir con `site` en astro.config.mjs. */
  url: 'https://rhyon-team.github.io',
  locale: 'es_UY',
  lang: 'es',
  /** Imagen para previews al compartir. 1200x630. */
  ogImage: '/og-image.png',
  /**
   * Color de la barra del navegador en mobile. Repite --color-brand-800 porque
   * el <meta name="theme-color"> no puede leer variables CSS: si cambia el
   * token, cambiar tambien este valor.
   */
  themeColor: '#7c1d26',
} as const;

/**
 * Canales de contacto. Los vacios no se renderizan. Email y WhatsApp son
 * placeholders pendientes: ver docs/placeholders.md.
 */
export const contact = {
  email: '',
  /** Formato internacional sin "+" ni espacios, como lo pide wa.me: 598XXXXXXXX. */
  whatsapp: '',
  /** Texto que aparece ya escrito al abrir el chat. */
  whatsappMessage: 'Hola RHYON, quiero contarles sobre un proyecto.',
  address: '',
} as const;

/** Perfiles de la empresa. Las vacias no se renderizan. */
export const social = {
  linkedin: '',
  instagram: 'https://www.instagram.com/whearerhyon/',
  x: '',
  github: 'https://github.com/rhyon-team',
} as const;

export interface NavItem {
  label: string;
  href: string;
}

/**
 * Navegacion principal. Los enlaces llevan "/" delante para que tambien
 * funcionen desde otras paginas, como la 404.
 */
export const navigation: NavItem[] = [
  { label: 'Servicios', href: '/#servicios' },
  { label: 'Contacto', href: '/#contacto' },
];

/** Enlaces del pie. */
export const footerLinks: NavItem[] = [];
