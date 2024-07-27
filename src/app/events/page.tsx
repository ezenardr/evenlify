import React from "react";
import HeroSection from "@/components/HeroSection";
import EventSimpleCard from "@/components/EventSimpleCard";
import { database } from "@/database/databaseConnection";
import { events } from "@/database/schema";

async function Events() {
  const eventsList = await database.select().from(events);
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
          {eventsList.map(({ title, description, date, event_id }) => {
            return (
              <li key={event_id}>
                <EventSimpleCard
                  title={title}
                  description={description}
                  date={date}
                  event_id={event_id}
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
