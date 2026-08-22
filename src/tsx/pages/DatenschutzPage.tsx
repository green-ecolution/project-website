import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import Hero from '../components/sections/Hero'
import BreadcrumbSchema from '../components/BreadcrumbSchema'
import { DEFAULT_LANGUAGE } from '../../i18n/languages'
import { useLanguage } from '../../i18n/useLanguage'

const processingRestrictionItemIds = [
  'disputedAccuracy',
  'unlawfulProcessing',
  'noLongerNeeded',
  'pendingObjection',
] as const

function DatenschutzPage() {
  const { t } = useTranslation('legal')
  const language = useLanguage()

  useEffect(() => {
    document.title = t('datenschutz.meta.title')
  }, [t])

  const linkClasses =
    'text-green-dark-900 font-semibold underline underline-offset-2 transition-all ease-in-out duration-300 hover:text-green-light-900'

  return (
    <main
      id="main-content"
      className="relative overflow-hidden before:bg-cover before:bg-background-dark-dot before:w-4/5 before:h-[100vh] before:max-h-[45rem] before:absolute before:-right-4 before:-top-16 before:-z-10 before:bg-no-repeat sm:before:-right-10 lg:before:max-h-[55rem] xl:before:w-[70rem] xl:before:-right-40 2xl:before:right-[10%] 2xl:before:bg-contain"
    >
      <BreadcrumbSchema
        items={[
          { name: 'Startseite', path: '/' },
          { name: 'Datenschutz', path: '/datenschutz' },
        ]}
      />
      <Hero
        headline={t('datenschutz.hero.headline')}
        description={t('datenschutz.hero.description')}
        label={t('datenschutz.hero.label')}
      />

      <section className="px-4 max-w-208 mx-auto md:px-6 lg:max-w-screen-lg xl:max-w-screen-xl mt-16 mb-28 lg:mb-36 xl:mb-52">
        <div className="space-y-12">
          {language !== DEFAULT_LANGUAGE && (
            <p className="text-sm text-grey-900/70 bg-grey-100/50 border border-grey-200/50 rounded-xl p-4">
              {t('translationNotice')}
            </p>
          )}

          {/* Section 1: Datenschutz auf einen Blick */}
          <div>
            <h2 className="font-lato font-bold text-2xl mb-4 lg:text-3xl text-grey-900 pl-4 border-l-4 border-green-light-900">
              {t('datenschutz.sections.overview.title')}
            </h2>

            <h3 className="font-lato font-bold text-xl mb-3 mt-6 text-grey-900">
              {t('datenschutz.sections.overview.generalNotes.title')}
            </h3>
            <p className="mb-4">{t('datenschutz.sections.overview.generalNotes.paragraph')}</p>

            <h3 className="font-lato font-bold text-xl mb-3 mt-6 text-grey-900">
              {t('datenschutz.sections.overview.dataCollection.title')}
            </h3>

            <h4 className="font-bold mb-2 text-grey-900">
              {t('datenschutz.sections.overview.dataCollection.responsibleParty.question')}
            </h4>
            <p className="mb-4">
              {t('datenschutz.sections.overview.dataCollection.responsibleParty.answer')}
            </p>

            <h4 className="font-bold mb-2 text-grey-900">
              {t('datenschutz.sections.overview.dataCollection.howWeCollect.question')}
            </h4>
            <p className="mb-4">
              {t('datenschutz.sections.overview.dataCollection.howWeCollect.answer')}
            </p>

            <h4 className="font-bold mb-2 text-grey-900">
              {t('datenschutz.sections.overview.dataCollection.whatWeUseFor.question')}
            </h4>
            <p className="mb-4">
              {t('datenschutz.sections.overview.dataCollection.whatWeUseFor.answer')}
            </p>

            <h4 className="font-bold mb-2 text-grey-900">
              {t('datenschutz.sections.overview.dataCollection.yourRights.question')}
            </h4>
            <p>{t('datenschutz.sections.overview.dataCollection.yourRights.answer')}</p>
          </div>

          {/* Section 2: Hosting */}
          <div>
            <h2 className="font-lato font-bold text-2xl mb-4 lg:text-3xl text-grey-900 pl-4 border-l-4 border-green-light-900">
              {t('datenschutz.sections.hosting.title')}
            </h2>

            <h3 className="font-lato font-bold text-xl mb-3 mt-6 text-grey-900">
              {t('datenschutz.sections.hosting.externalHosting.title')}
            </h3>
            <p className="mb-4">{t('datenschutz.sections.hosting.externalHosting.paragraph1')}</p>
            <p className="mb-4">{t('datenschutz.sections.hosting.externalHosting.paragraph2')}</p>
            <p className="mb-4">{t('datenschutz.sections.hosting.externalHosting.paragraph3')}</p>
            <p className="font-bold">
              {t('datenschutz.sections.hosting.externalHosting.hostersIntro')}
            </p>
            <address className="not-italic mt-2 bg-grey-100/50 rounded-xl p-6 border border-grey-200/50">
              <p>Digitalocean LLC</p>
              <p>101 Avenue of the Americas</p>
              <p>10th Floor New York, NY 10013</p>
              <p>United States</p>
            </address>
          </div>

          {/* Section 3: Allgemeine Hinweise und Pflichtinformationen */}
          <div>
            <h2 className="font-lato font-bold text-2xl mb-4 lg:text-3xl text-grey-900 pl-4 border-l-4 border-green-light-900">
              {t('datenschutz.sections.generalInfo.title')}
            </h2>

            <h3 className="font-lato font-bold text-xl mb-3 mt-6 text-grey-900">
              {t('datenschutz.sections.generalInfo.dataProtection.title')}
            </h3>
            <p className="mb-4">
              {t('datenschutz.sections.generalInfo.dataProtection.paragraph1')}
            </p>
            <p className="mb-4">
              {t('datenschutz.sections.generalInfo.dataProtection.paragraph2')}
            </p>
            <p>{t('datenschutz.sections.generalInfo.dataProtection.paragraph3')}</p>

            <h3 className="font-lato font-bold text-xl mb-3 mt-6 text-grey-900">
              {t('datenschutz.sections.generalInfo.responsibleParty.title')}
            </h3>
            <p className="mb-4">
              {t('datenschutz.sections.generalInfo.responsibleParty.paragraph1')}
            </p>
            <address className="not-italic mb-4 bg-grey-100/50 rounded-xl p-6 border border-grey-200/50">
              <p className="font-bold">PROGEEK GmbH</p>
              <p>Lise-Meitner-Str. 2</p>
              <p>24941 Flensburg</p>
              <p className="mt-2">
                {t('impressum.sections.contact.emailLabel')}{' '}
                <a href="mailto:info@progeek.de" className={linkClasses}>
                  info@progeek.de
                </a>
              </p>
            </address>
            <p>{t('datenschutz.sections.generalInfo.responsibleParty.paragraph2')}</p>

            <h3 className="font-lato font-bold text-xl mb-3 mt-6 text-grey-900">
              {t('datenschutz.sections.generalInfo.storageDuration.title')}
            </h3>
            <p>{t('datenschutz.sections.generalInfo.storageDuration.paragraph')}</p>

            <h3 className="font-lato font-bold text-xl mb-3 mt-6 text-grey-900">
              {t('datenschutz.sections.generalInfo.legalBases.title')}
            </h3>
            <p>{t('datenschutz.sections.generalInfo.legalBases.paragraph')}</p>

            <h3 className="font-lato font-bold text-xl mb-3 mt-6 text-grey-900">
              {t('datenschutz.sections.generalInfo.consentWithdrawal.title')}
            </h3>
            <p>{t('datenschutz.sections.generalInfo.consentWithdrawal.paragraph')}</p>

            <h3 className="font-lato font-bold text-xl mb-3 mt-6 text-grey-900">
              {t('datenschutz.sections.generalInfo.objectionRight.title')}
            </h3>
            <p className="mb-4 p-4 bg-green-light-100 rounded-lg">
              {t('datenschutz.sections.generalInfo.objectionRight.paragraph1')}
            </p>
            <p className="p-4 bg-green-light-100 rounded-lg">
              {t('datenschutz.sections.generalInfo.objectionRight.paragraph2')}
            </p>

            <h3 className="font-lato font-bold text-xl mb-3 mt-6 text-grey-900">
              {t('datenschutz.sections.generalInfo.complaintRight.title')}
            </h3>
            <p>{t('datenschutz.sections.generalInfo.complaintRight.paragraph')}</p>

            <h3 className="font-lato font-bold text-xl mb-3 mt-6 text-grey-900">
              {t('datenschutz.sections.generalInfo.dataPortability.title')}
            </h3>
            <p>{t('datenschutz.sections.generalInfo.dataPortability.paragraph')}</p>

            <h3 className="font-lato font-bold text-xl mb-3 mt-6 text-grey-900">
              {t('datenschutz.sections.generalInfo.sslTls.title')}
            </h3>
            <p>{t('datenschutz.sections.generalInfo.sslTls.paragraph')}</p>

            <h3 className="font-lato font-bold text-xl mb-3 mt-6 text-grey-900">
              {t('datenschutz.sections.generalInfo.accessErasureCorrection.title')}
            </h3>
            <p>{t('datenschutz.sections.generalInfo.accessErasureCorrection.paragraph')}</p>

            <h3 className="font-lato font-bold text-xl mb-3 mt-6 text-grey-900">
              {t('datenschutz.sections.generalInfo.processingRestriction.title')}
            </h3>
            <p className="mb-4">
              {t('datenschutz.sections.generalInfo.processingRestriction.intro')}
            </p>
            <ul className="list-disc list-inside space-y-2 mb-4">
              {processingRestrictionItemIds.map((id) => (
                <li key={id}>
                  {t(`datenschutz.sections.generalInfo.processingRestriction.items.${id}`)}
                </li>
              ))}
            </ul>
            <p>{t('datenschutz.sections.generalInfo.processingRestriction.outro')}</p>
          </div>

          {/* Section 4: Datenerfassung auf dieser Website */}
          <div>
            <h2 className="font-lato font-bold text-2xl mb-4 lg:text-3xl text-grey-900 pl-4 border-l-4 border-green-light-900">
              4. Datenerfassung auf dieser Website
            </h2>

            <h3 className="font-lato font-bold text-xl mb-3 mt-6 text-grey-900">Cookies</h3>
            <p className="mb-4">
              Unsere Internetseiten verwenden so genannte „Cookies". Cookies sind kleine Textdateien
              und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend
              für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf
              Ihrem Endgerät gespeichert. Session-Cookies werden nach Ende Ihres Besuchs automatisch
              gelöscht. Permanente Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese
              selbst löschen oder eine automatische Löschung durch Ihren Webbrowser erfolgt.
            </p>
            <p className="mb-4">
              Teilweise können auch Cookies von Drittunternehmen auf Ihrem Endgerät gespeichert
              werden, wenn Sie unsere Seite betreten (Third-Party-Cookies). Diese ermöglichen uns
              oder Ihnen die Nutzung bestimmter Dienstleistungen des Drittunternehmens (z.B. Cookies
              zur Abwicklung von Zahlungsdienstleistungen).
            </p>
            <p className="mb-4">
              Cookies haben verschiedene Funktionen. Zahlreiche Cookies sind technisch notwendig, da
              bestimmte Websitefunktionen ohne diese nicht funktionieren würden (z.B. die
              Warenkorbfunktion oder die Anzeige von Videos). Andere Cookies dienen dazu, das
              Nutzerverhalten auszuwerten oder Werbung anzuzeigen.
            </p>
            <p className="mb-4">
              Cookies, die zur Durchführung des elektronischen Kommunikationsvorgangs, zur
              Bereitstellung bestimmter, von Ihnen erwünschter Funktionen oder zur Optimierung der
              Website erforderlich sind (notwendige Cookies), werden auf Grundlage von Art. 6 Abs. 1
              lit. f DSGVO gespeichert, sofern keine andere Rechtsgrundlage angegeben wird. Der
              Websitebetreiber hat ein berechtigtes Interesse an der Speicherung von notwendigen
              Cookies zur technisch fehlerfreien und optimierten Bereitstellung seiner Dienste.
            </p>
            <p>
              Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies
              informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für
              bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der Cookies
              beim Schließen des Browsers aktivieren. Bei der Deaktivierung von Cookies kann die
              Funktionalität dieser Website eingeschränkt sein.
            </p>

            <h3 className="font-lato font-bold text-xl mb-3 mt-6 text-grey-900">
              Server-Log-Dateien
            </h3>
            <p className="mb-4">
              Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten
              Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
            </p>
            <ul className="list-disc list-inside space-y-1 mb-4">
              <li>Browsertyp und Browserversion</li>
              <li>verwendetes Betriebssystem</li>
              <li>Referrer URL</li>
              <li>Hostname des zugreifenden Rechners</li>
              <li>Uhrzeit der Serveranfrage</li>
              <li>IP-Adresse</li>
            </ul>
            <p>
              Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die
              Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der
              Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien
              Darstellung und der Optimierung seiner Website – hierzu müssen die Server-Log-Files
              erfasst werden.
            </p>

            <h3 className="font-lato font-bold text-xl mb-3 mt-6 text-grey-900">Kontaktformular</h3>
            <p className="mb-4">
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem
              Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks
              Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert.
              Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
            <p className="mb-4">
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO,
              sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur
              Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen
              beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven
              Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf
              Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde; die
              Einwilligung ist jederzeit widerrufbar.
            </p>
            <p>
              Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns
              zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck
              für die Datenspeicherung entfällt. Zwingende gesetzliche Bestimmungen – insbesondere
              Aufbewahrungsfristen – bleiben unberührt.
            </p>
          </div>

          <p className="text-sm text-grey-900/60 mt-8">
            Quelle:{' '}
            <a
              href="https://www.e-recht24.de/"
              target="_blank"
              rel="noreferrer noopener"
              className={linkClasses}
            >
              eRecht24
            </a>
          </p>
        </div>
      </section>
    </main>
  )
}

export default DatenschutzPage
