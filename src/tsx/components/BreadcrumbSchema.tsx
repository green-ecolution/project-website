import type { ParseKeys } from 'i18next'
import { useTranslation } from 'react-i18next'
import { useLanguage } from '../../i18n/useLanguage'

interface BreadcrumbItem {
  nameKey: ParseKeys<'common'>
  path: string
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[]
}

const BASE_URL = 'https://green-ecolution.de'

function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const { t } = useTranslation('common')
  const language = useLanguage()

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: t(item.nameKey),
      item: `${BASE_URL}/${language}${item.path}`,
    })),
  }

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default BreadcrumbSchema
