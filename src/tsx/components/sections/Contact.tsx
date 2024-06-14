import Button from "../Button";

function Contact() {
  return (
    <section className="px-4 max-w-screen-lg mx-auto my-28 md:grid md:grid-cols-2 md:gap-x-10 md:px-6 lg:my-36 xl:max-w-screen-xl xl:my-44">
        <h2 className="font-lato font-bold text-2xl mb-6 lg:mb-10 lg:text-3xl">
            Hast du weitere Fragen, Feedback oder ein Anliegen?
        </h2>
        <article>
            <p className="mb-6 lg:mb-10">
                Konnten deine Fragen nicht beantwortet werden oder hast du möchtest du mehr Informationen erfahren?
                Bei Fragen, Anregungen oder Anliegen kannst du uns gern kontaktieren.
                Unser Team wird sich schnellstmöglich bei dir melden.
            </p>

            <Button href="mailto:info@green-ecolution.de" ariaLabel="Kontaktiere uns gern per Mail" isDark>
                <img
                    src="/assets/svg/socials/mail.svg"
                    className="w-6 h-6" alt="" loading="lazy"/>
                <span>Kontakt</span>
            </Button>
        </article>
    </section>
  );
}

export default Contact;
