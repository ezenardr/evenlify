import { Link } from "next-view-transitions";
import Image from "next/image";
import avatars from "@/assets/images/avatars.svg";
import HeroSection from "@/components/HeroSection";
import EventSimpleCard from "@/components/EventSimpleCard";
import { database } from "@/database/databaseConnection";
import { events } from "@/database/schema";

export default async function Home() {
  // const events = [
  //   {
  //     image: Event,
  //     title: "Wonder Girls 2010 Wonder Girls World Tour San Francisco",
  //     description:
  //       "We’ll get you directly seated and inside for you to enjoy the show.",
  //     day: "14",
  //     month: "APR",
  //   },
  //   {
  //     image: Event,
  //     title: "Wonder Girls 2010 Wonder Girls World Tour San Francisco",
  //     description:
  //       "We’ll get you directly seated and inside for you to enjoy the show.",
  //     day: "14",
  //     month: "APR",
  //   },
  //   {
  //     image: Event,
  //     title: "Wonder Girls 2010 Wonder Girls World Tour San Francisco",
  //     description:
  //       "We’ll get you directly seated and inside for you to enjoy the show.",
  //     day: "14",
  //     month: "APR",
  //   },
  // ];
  const eventsList = await database.select().from(events);
  return (
    <main className={"max-w-[1440px] mx-auto"}>
      {/*hero section*/}
      <HeroSection
        title={"Réservez Maintenant et Vivez l'Instant"}
        description={
          "Evenlify vous permet de trouver et de réserver facilement vosévénements préférés! Ne manquez jamais une occasion de vivre des expériences extraordinaires."
        }
        cta={true}
      />

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
          {eventsList.map(({ title, description, date, event_id }, index) => {
            return (
              <li key={index}>
                <EventSimpleCard
                  event_id={event_id}
                  title={title}
                  date={date}
                  description={description}
                />
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
