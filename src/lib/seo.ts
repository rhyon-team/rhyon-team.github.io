import { site, social, contact } from './site';

/**
 * Datos estructurados (JSON-LD) de la organizacion.
 *
 * Es lo que Google usa para entender que la marca, el sitio y los perfiles
 * sociales son una misma entidad. Referencia: https://schema.org/Organization
 */
export function organizationSchema() {
  // Solo los perfiles efectivamente cargados en site.ts.
  const sameAs = Object.values(social).filter((url) => url.length > 0);

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: site.name,
    url: site.url,
    logo: new URL('/favicon.svg', site.url).toString(),
    description: site.description,
    ...(sameAs.length > 0 ? { sameAs } : {}),
    ...(contact.email
      ? {
          contactPoint: {
            '@type': 'ContactPoint',
            email: contact.email,
            contactType: 'customer service',
          },
        }
      : {}),
  };
}

/** Construye el <title> aplicando la plantilla, salvo en la home. */
export function buildTitle(title?: string): string {
  if (!title) return site.name;
  return site.titleTemplate.replace('%s', title);
}
