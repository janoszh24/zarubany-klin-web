import Image from "next/image";
import Navbar from "@/components/Navbar";
import Section from "@/components/Section";
import Gallery from "@/components/Gallery";
import BandMemberCard from "@/components/BandMemberCard";
import ContactCard from "@/components/ContactCard";
import SocialLink from "@/components/SocialLink";
import BookingForm from "@/components/BookingForm";
import EventsList from "@/components/EventsList";




const images = [
  { src: "/gallery/1.jpg", alt: "Zarubany Klin 1" },
  { src: "/gallery/2.jpg", alt: "Zarubany Klin 2" },
  { src: "/gallery/3.jpg", alt: "Zarubany Klin 3" },
  { src: "/gallery/4.jpg", alt: "Zarubany Klin 4" },
  { src: "/gallery/5.jpg", alt: "Zarubany Klin 5" },
  { src: "/gallery/6.jpg", alt: "Zarubany Klin 6" },
  { src: "/gallery/7.jpg", alt: "Zarubany Klin 7" },
  { src: "/gallery/8.jpg", alt: "Zarubany Klin 8" },
  { src: "/gallery/9.jpg", alt: "Zarubany Klin 9" },
  { src: "/gallery/10.jpg", alt: "Zarubany Klin 10" },
  { src: "/gallery/11.jpg", alt: "Zarubany Klin 11" },
  { src: "/gallery/12.jpg", alt: "Zarubany Klin 12" },
  { src: "/gallery/13.jpg", alt: "Zarubany Klin 13" },
  { src: "/gallery/14.jpg", alt: "Zarubany Klin 14" },
  { src: "/gallery/15.jpg", alt: "Zarubany Klin 15" },
];


/* Icons for social links */
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor">
    <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-2.9h2V9.8c0-2 1.2-3.1 3-3.1.9 0 1.8.1 1.8.1v2h-1c-1 0-1.3.6-1.3 1.2v1.5h2.2l-.4 2.9h-1.8v7A10 10 0 0 0 22 12z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor">
    <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5zm0 7.3A2.8 2.8 0 1 1 14.8 12 2.8 2.8 0 0 1 12 14.8zM17.5 6a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
  </svg>
);
const TikTokIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor">
    <path d="M16.5 2a6.5 6.5 0 0 0 4.5 4.5V10a9 9 0 0 1-4.5-1.3v6.1a6.3 6.3 0 1 1-5.7-6.3v3.4a2.9 2.9 0 1 0 2.8 2.9V2h2.9z"/>
  </svg>
);
const YouTubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" className="h-4 w-4 sm:h-5 sm:w-5" fill="currentColor">
    <path d="M23.5 6.2s-.2-1.7-.9-2.4c-.8-.9-1.7-.9-2.1-1C17.6 2.5 12 2.5 12 2.5h0s-5.6 0-8.5.3c-.4.1-1.3.1-2.1 1C.7 4.5.5 6.2.5 6.2S0 8.1 0 10v1.9c0 1.9.5 3.8.5 3.8s.2 1.7.9 2.4c.8.9 1.9.9 2.4 1 1.7.2 7.2.3 7.2.3s5.6 0 8.5-.3c.4-.1 1.3-.1 2.1-1 .7-.7.9-2.4.9-2.4s.5-1.9.5-3.8V10c0-1.9-.5-3.8-.5-3.8zM9.6 14.1V7.9l6.4 3.1-6.4 3.1z"/>
  </svg>
);


export default function Page() {
  return (
    <main className="min-h-screen">
      <Navbar />

      {/* HERO fullscreen */}
      <section id="uvod" className="relative min-h-screen min-h-[100svh] w-full overflow-hidden">
        <Image
          src="/hero1.png"
          alt="Zarubany Klin"
          fill
          priority
          className="object-cover object-[50%_50%] sm:object-top"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-6xl items-end px-4 pb-10 pt-24">
          <div className="w-full max-w-xl rounded-3xl bg-black/55 text-white backdrop-blur-md px-5 py-5 shadow-lg ring-1 ring-white/10">
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight leading-[1.05]">
              Zarubany Klin
            </h1>
            <p className="mt-4 text-base sm:text-lg text-white/85">
              Humorno-zábavná dvojica
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              {/*<a
                href="#kalendar"
                className="rounded-2xl bg-white px-5 py-3 text-black shadow hover:opacity-90 w-full sm:w-auto"
              >
                Najbližšie akcie
              </a>
              <a
                href="#kontakt"
                className="rounded-2xl border border-white/60 px-5 py-3 text-white hover:bg-white/10 w-full sm:w-auto"
              >
                Napísať
              </a>*/}
            </div>
          </div>
        </div>
      </section>

      <Section id="o-kapele" title="O nás" subtle>
        <div className="mb-10 max-w-3xl space-y-5 text-base sm:text-lg leading-relaxed text-slate-700">
          <p>
            Sme partia mladých chalanov, ktorých spája láska k hudbe a dobrému humoru.
            Publikum zabávame autorskými piesňami, v ktorých nechýba nadsádzka, vtip a
            hovorené slovo – jednoducho radosť, ktorú radi rozdávame ďalej.
          </p>

          <p>
            Za oficiálny vznik skupiny považujeme dátum <span className="font-semibold text-slate-900">15. 3. 2024</span>,
            kedy sme sa prvýkrát predstavili na sociálnych sieťach a YouTube s debutovou
            pesničkou <span className="font-semibold text-slate-900">Mechanici</span>.
          </p>

          <p>
            Postupne nasledovali ďalšie skladby, ktoré si u publika získali obľubu –
            napríklad <span className="font-semibold text-slate-900">Zetor</span> či{" "}
            <span className="font-semibold text-slate-900">Vodicky</span>. A tým to nekončí!
            Neustále pracujeme na novej tvorbe, takže sa môžete tešiť na ďalšie hudobné
            aj humorné novinky.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <BandMemberCard
            name="Matúš Putnocký - Puťo"
            //role="spev, bubon, šmišňak"
            image="/people/puto.jpg"
            bio="K hudbe bol vedený už od mladého veku. Ako 14-ročný začal hrať na bicie v svadobnej kapele, kde získal prvé pódiové skúsenosti.
              V rokoch 2021 – 2023 pôsobil v skupine Drišľak Tour, s ktorou odohral množstvo akcií a podujatí po celom Slovensku. Práve tieto skúsenosti dnes naplno pretavuje do tvorby kapely ZARUBANY KLIN."
          />

          <BandMemberCard
            name="Lukáš Kopačka - Luky"
            //role="spev, harmonika, mechanik"
            image="/people/luky.jpg"
            bio="Úspešný absolvent konzervatória aj vysokej školy. Pôsobí ako učiteľ na Základnej umeleckej škole, kde sa venuje výchove mladých talentov v hre na akordeón.
              Hudba pre neho nie je len povolaním, ale aj vášňou, ktorú prenáša do každej skladby a vystúpenia."
          />
        </div>
      </Section>

      
      <Section id="fotogaleria" title="Fotogaléria" subtle>
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-slate-700">
            Momentky z našich akcií a vystúpení. Viac nájdete na našich sociálnych sieťach:
          </p>

          <div className="flex flex-wrap gap-3">
            <SocialLink
              href="https://www.facebook.com/profile.php?id=61557028242875"
              label="Facebook"
              icon={<FacebookIcon />}
            />
            <SocialLink
              href="https://www.instagram.com/zarubany_klin?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
              label="Instagram"
              icon={<InstagramIcon />}
            />
            <SocialLink
              href="http://www.youtube.com/@ZARUBANYKLIN"
              label="YouTube"
              icon={<YouTubeIcon />}
            />
          </div>
        </div>

        <Gallery images={images} />
      </Section>

      {/*
      <Section id="kalendar" title="Kalendár" subtle>
        <p className="mb-6 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-700">
          Najbližších 10 akcií:
        </p>
        <EventsList />
      </Section> */}
      

      <Section id="kontakt" title="Kontakt" subtle>
        {/* HLAVNÝ GRID: kontakty + formulár */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* ĽAVÝ STĹPEC – BOOKING */}
          <div className="space-y-6">
            {/* Na mobile pod sebou, od sm 2 stĺpce */}
            <div className="grid gap-6 sm:grid-cols-2">
              {/* Ľuboš */}
              <ContactCard
                title="Booking"
                name="Ľuboš Romčo - Manažér"
                description="Verejné podujatia, koncerty, firemné akcie"
                phone="0908 336 675"
              />

              {/* Matúš + email pod ním */}
              <div className="space-y-4">
                <ContactCard
                  title="Booking"
                  name="Matúš Putnocký"
                  description="Súkromné podujatia"
                  phone="0949 202 153"
                  email="zarubanyklin@gmail.com"
                />
              </div>
            </div>
          </div>

          {/* PRAVÝ STĹPEC – FORMULÁR */}
          <BookingForm />
        </div>
      </Section>



      <footer className="border-t bg-slate-100/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-10">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
            
            {/* TEXT */}
            <div className="text-center text-sm opacity-70 sm:text-left">
              © {new Date().getFullYear()} Zarubany Klin<br />
            </div>

            {/* SOCIÁLNE SIETE */}
            <div className="flex gap-3">
              <SocialLink
                href="https://www.facebook.com/profile.php?id=61557028242875"
                label="Facebook"
                icon={<FacebookIcon />}
              />
              <SocialLink
                href="https://www.instagram.com/zarubany_klin?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
                label="Instagram"
                icon={<InstagramIcon />}
              />
              <SocialLink
                href="https://www.tiktok.com/@zarubany_klin_official?is_from_webapp=1&sender_device=pc"
                label="TikTok"
                icon={<TikTokIcon />}
              />
              <SocialLink
                href="http://www.youtube.com/@ZARUBANYKLIN"
                label="YouTube"
                icon={<YouTubeIcon />}
              />
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
