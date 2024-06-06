import Accordion from "./Accordion";

function Faq() {
  return (
    <section className="px-4 max-w-208 mx-auto my-28 md:px-6 lg:my-36 xl:my-44">
        <h2 className="font-lato font-bold text-center text-2xl mb-6 lg:mb-10 lg:text-3xl">
            Oft gestellte Fragen zu Green Ecolution
        </h2>
        <div className="flex flex-col gap-y-4 md:gap-y-6">
            <Accordion label="Wer steckt hinter dem Projekt Green Ecolution?">
                <p className="mb-4">
                    Do do ex aliquip est voluptate Lorem est fugiat amet consectetur veniam irure enim id.
                    Officia deserunt dolor sint aliquip.
                    Cupidatat consequat consequat aute sint. Cupidatat fugiat tempor cupidatat cillum in officia anim voluptate cillum mollit.
                    Est minim fugiat amet non.
                </p>
                <p>
                    Tempor amet consectetur in eiusmod quis adipisicing nulla incididunt incididunt tempor.
                    Do est esse pariatur qui. Laboris non aute Lorem amet minim elit fugiat aliqua ipsum sint fugiat ipsum cillum ad ipsum.
                    Qui eu irure reprehenderit anim sint deserunt consequat elit in excepteur aliquip excepteur tempor.
                    Velit adipisicing Lorem nostrud consectetur proident ut. Tempor deserunt laboris tempor dolor dolore ad voluptate.
                    In culpa commodo commodo aute cillum ex elit. Esse aliquip labore elit consequat.
                </p>
            </Accordion>
            <Accordion label="Wer steckt hinter dem Projekt Green Ecolution?">
                <p className="mb-4">
                    Do do ex aliquip est voluptate Lorem est fugiat amet consectetur veniam irure enim id.
                    Officia deserunt dolor sint aliquip.
                    Cupidatat consequat consequat aute sint. Cupidatat fugiat tempor cupidatat cillum in officia anim voluptate cillum mollit.
                    Est minim fugiat amet non.
                </p>
                <p>
                    Tempor amet consectetur in eiusmod quis adipisicing nulla incididunt incididunt tempor.
                    Do est esse pariatur qui. Laboris non aute Lorem amet minim elit fugiat aliqua ipsum sint fugiat ipsum cillum ad ipsum.
                    Qui eu irure reprehenderit anim sint deserunt consequat elit in excepteur aliquip excepteur tempor.
                    Velit adipisicing Lorem nostrud consectetur proident ut. Tempor deserunt laboris tempor dolor dolore ad voluptate.
                    In culpa commodo commodo aute cillum ex elit. Esse aliquip labore elit consequat.
                </p>
            </Accordion>
        </div>
    </section>
  );
}

export default Faq;
