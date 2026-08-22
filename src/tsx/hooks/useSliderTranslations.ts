import { useTranslation } from 'react-i18next'

// %s is Splide's own placeholder syntax, not i18next's, and must stay literal in both catalogs.
export function useSliderTranslations() {
  const { t } = useTranslation('common')

  return {
    prev: t('slider.prev'),
    next: t('slider.next'),
    first: t('slider.first'),
    last: t('slider.last'),
    slideX: t('slider.slideX'),
    pageX: t('slider.pageX'),
    carousel: t('slider.carousel'),
    select: t('slider.select'),
    slide: t('slider.slide'),
    slideLabel: t('slider.slideLabel'),
  }
}
