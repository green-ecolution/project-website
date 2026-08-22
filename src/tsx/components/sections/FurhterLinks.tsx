import { ArrowUpRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'

type ResourceLinkId =
  | 'flensburgSoftware'
  | 'github'
  | 'hsflBlog'
  | 'hsflInstagram'
  | 'digitalHub'
  | 'pressRelease'
  | 'liveDemo'

interface ResourceLink {
  id: ResourceLinkId
  url: string
}

const links: ResourceLink[] = [
  {
    id: 'flensburgSoftware',
    url: 'https://app.green-ecolution.de/',
  },
  {
    id: 'github',
    url: 'https://github.com/green-ecolution',
  },
  {
    id: 'hsflBlog',
    url: 'https://hs-flensburg.de/studium/master/ai/abgeschlossene-arbeiten/green-ecolution-smartes-gruenflaechenmanagement-fuer-die',
  },
  {
    id: 'hsflInstagram',
    url: 'https://www.instagram.com/hochschuleflensburg/p/DA3aCgaPqoq/',
  },
  {
    id: 'digitalHub',
    url: 'https://www.schleswig-holstein.de/DE/landesregierung/ministerien-behoerden/I/Presse/PI/2025/cds/251014_cds_open-source-projekte?nn=a3865cbf-b1fb-4b2f-bc47-f7ac05f3f7b5',
  },
  {
    id: 'pressRelease',
    url: 'https://www.presse-service.de/data.aspx/static/1200128.html',
  },
  {
    id: 'liveDemo',
    url: 'https://demo.green-ecolution.de/',
  },
]

function FurtherLinks() {
  const { t } = useTranslation('project')

  return (
    <section className="px-4 max-w-208 mx-auto my-20 md:px-6 lg:my-28 lg:max-w-screen-lg xl:my-36 xl:max-w-screen-xl">
      {/* Header */}
      <article className="mb-8 lg:mb-12 lg:text-center">
        <div className="inline-block mb-4 lg:mx-auto">
          <span className="text-xs font-semibold tracking-widest text-green-light-900 uppercase">
            {t('resources.sectionLabel')}
          </span>
          <div className="h-0.5 w-12 bg-gradient-to-r from-green-light-900 to-transparent mt-1" />
        </div>
        <h2 className="font-lato font-bold text-2xl lg:text-3xl text-grey-900">
          {t('resources.title')}
        </h2>
      </article>

      {/* Links Grid */}
      <ul className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {links.map((link) => (
          <li key={link.id}>
            <a
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block h-full bg-green-light-100 border border-green-dark-900/20
                rounded-2xl p-5 lg:p-6 shadow-xs hover:shadow-sm
                transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-lato font-semibold text-lg text-grey-900 mb-2 group-hover:text-green-dark-900 transition-colors">
                    {t(`resources.items.${link.id}.label`)}
                  </h3>
                  <p className="text-grey-600 text-sm leading-relaxed">
                    {t(`resources.items.${link.id}.description`)}
                  </p>
                </div>
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-green-dark-900/10 flex items-center justify-center group-hover:bg-green-dark-900 transition-colors">
                  <ArrowUpRight className="w-5 h-5 text-green-dark-900 group-hover:text-white transition-colors" />
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default FurtherLinks
