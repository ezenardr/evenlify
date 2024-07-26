import React from "react";
import HeroSection from "@/components/HeroSection";
import Event from "@/assets/images/event.png";
import EventSimpleCard from "@/components/EventSimpleCard";

function Events() {
  const events = [
    {
      image: Event,
      title: "Wonder Girls 2010 Wonder Girls World Tour San Francisco",
      description:
        "We’ll get you directly seated and inside for you to enjoy the show.",
      day: "14",
      month: "APR",
    },
    {
      image: Event,
      title: "Wonder Girls 2010 Wonder Girls World Tour San Francisco",
      description:
        "We’ll get you directly seated and inside for you to enjoy the show.",
      day: "14",
      month: "APR",
    },
    {
      image: Event,
      title: "Wonder Girls 2010 Wonder Girls World Tour San Francisco",
      description:
        "We’ll get you directly seated and inside for you to enjoy the show.",
      day: "14",
      month: "APR",
    },
  ];
  return (
    <main>
      <HeroSection
        title={"Découvrez et Réservez Vos Prochains Événements Favoris"}
        description={
          "Que vous soyez amateur de musique, passionné de sport, ou à la recherche de nouvelles expériences culturelles, nous avons quelque chose pour vous."
        }
      />

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
                <EventSimpleCard
                  image={image}
                  title={title}
                  month={month}
                  day={day}
                  description={description}
                />
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}

export default Events;
