export function siteOrigin(site: URL | undefined): string {
  if (!site) {
    throw new Error('astro.config.mjs muss die Option site setzen')
  }
  return site.origin
}
