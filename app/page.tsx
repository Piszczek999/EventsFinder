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
        <p className="animate-in animate-delay-500 text-[#333] text-xl max-w-[50vw] font-medium text-center">
          Nasza strona to idealne miejsce dla wszystkich, którzy szukają
          inspiracji na spędzenie wolnego czasu oraz dla organizatorów
          pragnących promować swoje wydarzenia.
        </p>
      </section>
      <section className="animate-in flex flex-col items-center py-[15vh] gap-20">
        <h1 className="text-[max(5vw,36px)] text-gradient font-bold text-center">
          Jak to działa?
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-10 md:gap-y-20 gap-x-0 md:gap-x-10">
          <div className="animate-in text-[#333] flex flex-col justify-center items-center text-center order-1 md:order-none">
            <strong className="text-[max(2vw,20px)]">Szukaj wydarzeń</strong>
            <p className="text-xl">
              Wprowadź swoje kryteria i przeglądaj listę dostępnych opcji.
            </p>
          </div>
          <div className="animate-in shadow rounded-[10px] h-full order-2 md:order-none">
            <img
              src="https://ghzfhsfaejmxwcbmjaec.supabase.co/storage/v1/object/public/event-photo/public/home1.png"
              alt="home1"
              className="w-full h-full object-cover rounded-[10px]"
            />
          </div>

          <div className="animate-in shadow rounded-[10px] h-full order-4 md:order-none">
            <img
              src="https://ghzfhsfaejmxwcbmjaec.supabase.co/storage/v1/object/public/event-photo/public/home2.png"
              alt="home2"
              className="w-full h-full object-cover rounded-[10px]"
            />
          </div>
          <div className="animate-in text-[#333] flex flex-col justify-center items-center text-center order-3 md:order-none">
            <strong className="text-[max(2vw,20px)]">Sprawdź szczegóły</strong>
            <p className="text-xl">
              Kliknij na interesujące Cię wydarzenie, aby zobaczyć więcej
              informacji, w tym datę, miejsce i opis.
            </p>
          </div>

          <div className="animate-in text-[#333] flex flex-col justify-center items-center text-center order-5 md:order-none">
            <strong className="text-[max(2vw,20px)]">Dodaj wydarzenie</strong>
            <p className="text-xl">
              Wypełnij formularz, aby dodać własne wydarzenie i dotrzeć do
              szerszej publiczności.
            </p>
          </div>
          <div className="animate-in shadow rounded-[10px] h-full order-6 md:order-none">
            <img
              src="https://ghzfhsfaejmxwcbmjaec.supabase.co/storage/v1/object/public/event-photo/public/home3.png"
              alt="home2"
              className="w-full h-full object-cover rounded-[10px]"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
