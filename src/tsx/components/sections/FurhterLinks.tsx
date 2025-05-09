function FurtherLinks() {
  const links = [
    {
      label: 'Software für die Stadt Flensburg',
      subLabel:
        'Dies ist die Software, die für die Stadt Flensburg entwickelt und aufgesetzt wurde. Diese Software wird primär vom Technischen Betriebszentrum Flensburg genutzt.',
      url: 'https://app.green-ecolution.de/',
    },
    {
      label: 'Organisation auf GitHub',
      subLabel:
        'Dort finden Sie alle Code-Repositories, die mit dem Projekt in Verbindung stehen, wie z.B. Backend und Frontend der Software',
      url: 'https://github.com/green-ecolution',
    },
    {
      label: 'Blog-Beitrag der HS Flensburg',
      subLabel:
        'Auch auf der Website der HS Flensburg wurde ein Beitrag zum Forschungsprojekt veröffentlicht.',
      url: 'https://hs-flensburg.de/studium/master/ai/abgeschlossene-arbeiten/green-ecolution-smartes-gruenflaechenmanagement-fuer-die',
    },
    {
      label: 'Instagram-Beitrag der HS Flensburg',
      subLabel:
        'Nicht nur auf der Website, sondern auch auf Instagram wurde Green Ecolution erwähnt.',
      url: 'https://www.instagram.com/hochschuleflensburg/p/DA3aCgaPqoq/',
    },
  ]

  return (
    <section className="px-4 max-w-208 mx-auto my-28 md:px-6 lg:my-36 xl:my-52 ">
      <article className="mb-8 g:mb-14 md:text-center">
        <h2 className="font-lato font-bold text-2xl mb-6 lg:text-3xl">
          Weiterführende Links & Erwähnungen <br /> zum Forschungsprojekt
        </h2>
      </article>
      <ul className="grid grid-cols-1 gap-y-4">
        {links.map((link) => (
          <li
            key={link.label}
            className="cursor-pointer border border-green-dark-900 bg-white rounded-2xl shadow-md"
          >
            <a
              href={link.url}
              target="_blank"
              className="px-4 py-3 group rounded-2xl cursor-pointer flex items-center justify-between gap-x-8 transition-color ease-in-out duration-300 md:px-6 md:py-4 hover:bg-green-dark-900/10"
            >
              <div>
                <h3 className="font-lato font-semibold text-lg mb-2">{link.label}</h3>
                <p className="text-base">{link.subLabel}</p>
              </div>
              <figure className="shrink-0 transition-all ease-in-out duration-300 group-hover:translate-x-1">
                <img
                  src="/assets/svg/general/arrow.svg"
                  className="object-contain w-6 h-6 "
                  alt=""
                />
              </figure>
            </a>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default FurtherLinks
