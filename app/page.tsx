import Link from "next/link";

export default function Home() {
  return (
    <div className="flex-1 flex flex-col items-center max-w-[80vw]">
      <section className="animate-in flex flex-col items-center pt-[20vh] py-[15vh]">
        <h1 className="text-[max(5vw,36px)] text-gradient font-bold text-center">
          Witamy w EventFinder!
        </h1>
        <h2 className="text-[max(2vw,20px)] text-[#333333] font-medium text-center">
          Odkryj najciekawsze wydarzenia rozrywkowe w Twojej okolicy!
        </h2>
        <Link
          href={"/events"}
          className="tile p-5 text-white text-4xl font-medium my-10"
        >
          Szukaj Wydarzeń
        </Link>
        <p className="animate-in animate-delay-500 text-[#333333] text-xl max-w-[50vw] font-medium text-center">
          Nasza strona to idealne miejsce dla wszystkich, którzy szukają
          inspiracji na spędzenie wolnego czasu oraz dla organizatorów
          pragnących promować swoje wydarzenia.
        </p>
      </section>
      <section className="animate-in flex flex-col items-center py-[15vh] gap-20">
        <h1 className="text-[5vw] text-gradient font-bold text-center">
          Jak to działa?
        </h1>
        <div className="grid grid-cols-2">
          <ol className="flex flex-col gap-8 text-xl">
            <li>
              Szukaj wydarzeń: Wprowadź swoje kryteria i przeglądaj listę
              dostępnych opcji.
            </li>
            <li>
              Sprawdź szczegóły: Kliknij na interesujące Cię wydarzenie, aby
              zobaczyć więcej informacji, w tym datę, miejsce i opis.
            </li>
            <li>
              Dodaj wydarzenie: Wypełnij formularz, aby dodać własne wydarzenie
              i dotrzeć do szerszej publiczności.
            </li>
          </ol>
        </div>
      </section>
    </div>
  );
}
