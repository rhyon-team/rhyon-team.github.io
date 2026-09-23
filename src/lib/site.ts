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
  description: 'Descripcion institucional de RHYON pendiente de definir.',
  /** Debe coincidir con `site` en astro.config.mjs. */
  url: 'https://rhyon-team.github.io',
  locale: 'es_UY',
  lang: 'es',
  /** Imagen para previews al compartir. 1200x630. */
  ogImage: '/og-image.png',
} as const;

export const contact = {
  email: '',
  phone: '',
  address: '',
} as const;

/** Perfiles de la empresa. Las vacias no se renderizan. */
export const social = {
  linkedin: '',
  instagram: '',
  x: '',
  github: 'https://github.com/rhyon-team',
} as const;

export interface NavItem {
  label: string;
  href: string;
}

/** Navegacion principal. Vacia hasta definir las secciones de la landing. */
export const navigation: NavItem[] = [];

/** Enlaces del pie. */
export const footerLinks: NavItem[] = [];
