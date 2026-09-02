import type { Language } from '../i18n/languages'
import { getTranslations } from '../i18n/t'

export function consentEmbedStrings(language: Language, provider: string) {
  const t = getTranslations(language, 'common')

  return {
    playLabel: t('embed.playLabel', { provider }),
    privacyHint: t('embed.privacyHint', { provider }),
    privacyLinkLabel: t('embed.privacyLinkLabel'),
    privacyLinkHref: `/${language}/datenschutz`,
  }
}
