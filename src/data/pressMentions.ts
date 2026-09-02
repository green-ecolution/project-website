export type PressMentionId = 'ndrShMagazin' | 'landesregierungSh' | 'stadtFlensburg' | 'hsFlensburg'

interface PressMention {
  id: PressMentionId
  // Proper noun, so it stays out of the catalogue.
  outlet: string
  url: string
  // Omitted where the publication date is not stated on the source.
  date?: Date
}

export const pressMentions: PressMention[] = [
  {
    id: 'ndrShMagazin',
    outlet: 'NDR Schleswig-Holstein Magazin',
    url: 'https://www.ndr.de/nachrichten/schleswig-holstein/schleswig-holsteins-stadtbaeume-sterben,stadtbaum-100.html',
    date: new Date('2026-08-29'),
  },
  {
    id: 'landesregierungSh',
    outlet: 'Landesregierung Schleswig-Holstein',
    url: 'https://www.schleswig-holstein.de/DE/landesregierung/ministerien-behoerden/I/Presse/PI/2025/cds/251014_cds_open-source-projekte?nn=a3865cbf-b1fb-4b2f-bc47-f7ac05f3f7b5',
    date: new Date('2025-10-14'),
  },
  {
    id: 'stadtFlensburg',
    outlet: 'Stadt Flensburg',
    url: 'https://www.presse-service.de/data.aspx/static/1200128.html',
  },
  {
    id: 'hsFlensburg',
    outlet: 'Hochschule Flensburg',
    url: 'https://hs-flensburg.de/studium/master/ai/abgeschlossene-arbeiten/green-ecolution-smartes-gruenflaechenmanagement-fuer-die',
  },
]
