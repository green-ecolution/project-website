import { Trans, useTranslation } from 'react-i18next'
import Accordion from '../Accordion'

const faqIds = ['origin', 'value', 'openSource', 'sensors', 'progress'] as const

const linkClassName =
  'text-green-dark-900 font-semibold underline underline-offset-2 transition-all ease-in-out duration-300 hover:text-green-light-900'

function Faq() {
  const { t } = useTranslation('home')

  // Single source of truth: the JSON-LD schema reads answerPlain, the accordion
  // renders answerRich, both kept in sync in the translation catalog.
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqIds.map((id) => ({
      '@type': 'Question',
      name: t(`faq.items.${id}.question`),
      acceptedAnswer: {
        '@type': 'Answer',
        text: t(`faq.items.${id}.answerPlain`),
      },
    })),
  }

  return (
    <section className="px-4 max-w-208 mx-auto my-20 md:px-6 lg:my-28 xl:my-36 xl:max-w-screen-lg">
      <script
        type="application/ld+json"
        // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Section Label */}
      <div className="mb-6 lg:mb-8 flex justify-center">
        <div className="inline-block">
          <span className="text-xs font-semibold tracking-widest text-green-light-900 uppercase">
            {t('faq.sectionLabel')}
          </span>
          <div className="h-0.5 w-12 bg-gradient-to-r from-green-light-900 to-transparent mt-1 mx-auto" />
        </div>
      </div>

      <h2 className="font-lato font-bold text-center text-2xl mb-8 text-grey-900 lg:mb-12 lg:text-3xl">
        {t('faq.title')}
      </h2>

      <ul className="flex flex-col gap-y-4 md:gap-y-5">
        <div>
          <Accordion label={t('faq.items.origin.question')}>
            <p>
              <Trans
                i18nKey="faq.items.origin.answerRich"
                ns="home"
                components={{
                  hsfl: (
                    <a
                      href="https://hs-flensburg.de/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClassName}
                    />
                  ),
                  progeek: (
                    <a
                      href="https://progeek.de/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClassName}
                    />
                  ),
                  grenzregion: (
                    <a
                      href="https://smarte-grenzregion.de/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClassName}
                    />
                  ),
                  flensburg: (
                    <a
                      href="https://www.flensburg.de/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={linkClassName}
                    />
                  ),
                }}
              />
            </p>
          </Accordion>
        </div>
        <div>
          <Accordion label={t('faq.items.value.question')}>
            <Trans
              i18nKey="faq.items.value.answerRich"
              ns="home"
              components={{
                p1: <p className="mb-4" />,
                p2: <p />,
              }}
            />
          </Accordion>
        </div>
        <div>
          <Accordion label={t('faq.items.openSource.question')}>
            <Trans
              i18nKey="faq.items.openSource.answerRich"
              ns="home"
              components={{
                p1: <p className="mb-4" />,
                p2: <p />,
                repo: (
                  <a
                    href="https://github.com/green-ecolution"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClassName}
                  />
                ),
                opendata: (
                  <a
                    href="https://opendata.schleswig-holstein.de/dataset"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClassName}
                  />
                ),
              }}
            />
          </Accordion>
        </div>
        <div>
          <Accordion label={t('faq.items.sensors.question')}>
            <Trans
              i18nKey="faq.items.sensors.answerRich"
              ns="home"
              components={{
                p1: <p className="mb-4" />,
                p3: <p className="mt-4" />,
                list: <ul className="list-disc pl-4" />,
                item1: <li />,
                item2: <li />,
                watermark: (
                  <a
                    href="https://www.irrometer.com/pdf/403.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClassName}
                  />
                ),
                smt100: (
                  <a
                    href="https://www.truebner.de/de/smt100.php"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClassName}
                  />
                ),
              }}
            />
          </Accordion>
        </div>
        <div>
          <Accordion label={t('faq.items.progress.question')}>
            <Trans
              i18nKey="faq.items.progress.answerRich"
              ns="home"
              components={{
                p1: <p />,
                p2: <p className="mt-4" />,
                p3: <p className="mt-4" />,
                hsfl: (
                  <a
                    href="https://hs-flensburg.de/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClassName}
                  />
                ),
                program: <strong />,
                funding: <strong />,
                progeek: (
                  <a
                    href="https://progeek.de/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClassName}
                  />
                ),
                flensburg: (
                  <a
                    href="https://www.flensburg.de/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClassName}
                  />
                ),
                grenzregion: (
                  <a
                    href="https://smarte-grenzregion.de/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClassName}
                  />
                ),
              }}
            />
          </Accordion>
        </div>
      </ul>
    </section>
  )
}

export default Faq
