import { Link } from "next-view-transitions";
import hero from "@/assets/images/hero.png";
import Image from "next/image";
import Event from "@/assets/images/event.png";
import avatars from "@/assets/images/avatars.svg";
import WebsiteNavigation from "@/components/WebsiteNavigation";

export default function Home() {
  const events = [
    {
      image: Event,
      title: "Wonder Girls 2010 Wonder Girls World Tour San Francisco",
      description:
        "We’ll get you directly seated and inside for you to enjoy the show.",
      day: 14,
      month: "APR",
    },
    {
      image: Event,
      title: "Wonder Girls 2010 Wonder Girls World Tour San Francisco",
      description:
        "We’ll get you directly seated and inside for you to enjoy the show.",
      day: 14,
      month: "APR",
    },
    {
      image: Event,
      title: "Wonder Girls 2010 Wonder Girls World Tour San Francisco",
      description:
        "We’ll get you directly seated and inside for you to enjoy the show.",
      day: 14,
      month: "APR",
    },
  ];
  return (
    <main className={"max-w-[1440px] mx-auto"}>
      {/*hero section*/}
      <section
        className={
          "relative hero py-20 lg:h-dvh lg:max-h-[600px] flex items-center justify-center flex-col"
        }
      >
        <WebsiteNavigation />
        <div
          className={
            " flex flex-col lg:flex-row gap-8 px-4 lg:px-0 items-center max-w-[1000px] mx-auto"
          }
        >
          <div className={"flex-1"}>
            <Image src={hero} alt={"group of people"} />
          </div>
          <div
            className={
              "flex-1 text-center lg:text-start flex flex-col items-center lg:items-start gap-6"
            }
          >
            <h1 className={"text-[40px] text-white font-bold"}>
              Réservez Maintenant <br />
              et Vivez l&apos;Instant
            </h1>
            <p className={"text-[18px] text-white"}>
              Evenlify vous permet de trouver et de réserver facilement vos
              événements préférés! Ne manquez jamais une occasion de vivre des
              expériences extraordinaires.
            </p>
            <div className={"flex flex-col lg:flex-row w-full gap-8"}>
              <Link href={"/events"} className={"btn-primary"}>
                Réservations
              </Link>
              <Link className={"btn-secondary"} href={"/about"}>
                En savoir plus
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/*  Upcoming Events*/}
      <section
        className={
          "py-24 px-8 lg:px-0 flex items-center flex-col gap-12 max-w-[1086px] mx-auto"
        }
      >
        <div
          className={
            "flex flex-col lg:flex-row gap-4 lg:gap-0 w-full items-center justify-between"
          }
        >
          <h2 className={"text-[40px] text-[#242565] font-bold"}>
            Evénements à venir
          </h2>
          <div>
            {/*  category*/}
            <select
              id="countries"
              className="bg-[#F2F4FF] text-[#1D275F] text-sm rounded-[50px] focus:outline-none  block w-full p-2.5"
            >
              <option defaultValue={"category"}>Catégories</option>
              <option value="US">United States</option>
              <option value="CA">Canada</option>
              <option value="FR">France</option>
              <option value="DE">Germany</option>
            </select>
          </div>
        </div>
        <ul className={"grid w-full  gap-8 lg:gap-0 lg:grid-cols-3"}>
          {events.map(({ image, title, description, month, day }, index) => {
            return (
              <li key={index}>
                <div
                  className={
                    "bg-white rounded-[12px] overflow-hidden w-full lg:w-[343px] shadow-lg"
                  }
                >
                  <Image src={image} alt={title} className={"w-full"} />
                  <div className={"flex gap-4 px-6 pt-4 pb-6"}>
                    <div className={"flex flex-col items-center"}>
                      <span className={"text-[#3D37F1] text-[12px] font-bold"}>
                        {month}
                      </span>
                      <span className={"text-black text-[29px] font-bold"}>
                        {day}
                      </span>
                    </div>
                    <div className={"flex flex-col gap-2"}>
                      <h4 className={"text-[16px] font-bold text-black"}>
                        {title}
                      </h4>
                      <p className={"text-[#6a6a6a] text-[14px]"}>
                        {description}
                      </p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <Link
          href={"/events"}
          className={
            "bg-transparent border hover:bg-[#3D37F1] hover:text-white hover:border-[#3D37F1] transition-all border-[#3D37F1] rounded-[50px] px-8 py-[10px] text-[#3D37F1] text-[18px] font-bold"
          }
        >
          Voir Plus
        </Link>
      </section>

      {/*  create events*/}
      <section
        className={
          "flex flex-col px-8 lg:px-0 lg:flex-row items-center justify-center bg-[#EEE1FF]"
        }
      >
        <div>
          <Image src={avatars} alt={"create event avatar"} className={"p-12"} />
        </div>
        <div className={"text-center"}>
          <h2 className={"text-[34px] font-bold pb-3"}>
            Poster vos Evénements
          </h2>
          <p className={"text-[18px] text-[#272727] pb-6"}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
          </p>
          <Link
            href={"/user/events"}
            className={"btn-primary hover:text-black"}
          >
            Créer un Evénement
          </Link>
        </div>
      </section>
    </main>
  );
}
