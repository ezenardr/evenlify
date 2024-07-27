import React from "react";
import WebsiteNavigation from "@/components/WebsiteNavigation";
import { Link } from "next-view-transitions";
import { database } from "@/database/databaseConnection";
import { categories, events, images } from "@/database/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import currencyConverter from "@/lib/currencyConverter";
import { Carousel } from "flowbite-react";

async function Event({ params }: { params: { id: string } }) {
  const [singleEvent] = await database
    .select()
    .from(events)
    .where(eq(events.event_id, params.id));
  const imageList = await database
    .select()
    .from(images)
    .where(eq(images.field_id, params.id));
  const [uniqueCategories] = await database
    .select()
    .from(categories)
    .where(eq(categories.category_id, singleEvent.category_id));
  return (
    <main className={"overflow-x-hidden"}>
      <WebsiteNavigation black={true} />
      <section className={"py-20  px-8 lg:px-0 max-w-[1086px] mx-auto"}>
        <div
          className={
            "hidden lg:flex items-center divide-x-2  py-[1.2rem] text-sm text-[#9d9d9d]"
          }
        >
          <Link href={"/events"} className={"px-[1rem]"}>
            All events
          </Link>
          <span className={"px-[1rem]"}>{uniqueCategories.title}</span>
          <span className={"pl-[1rem] font-medium text-primary text-[1.2rem]"}>
            {singleEvent.title}
          </span>
        </div>
        <div className={"flex flex-col lg:flex-row gap-10"}>
          <div className="lg:hidden h-[300px]">
            <Carousel leftControl="" rightControl="">
              {imageList.map(({ image_url, image_name, image_id }) => {
                return (
                  <Image
                    key={image_id}
                    src={image_url}
                    alt={image_name}
                    width={1200}
                    height={500}
                  />
                );
              })}
            </Carousel>
          </div>
          <div className={"flex-1 hidden lg:grid grid-cols-3 gap-8"}>
            <div
              className={
                "bg-[#EAEAEA] col-start-1 col-end-4 overflow-hidden flex items-center justify-center h-[300px] rounded-[1rem] "
              }
            >
              <Image
                width={1200}
                height={667}
                className={"hover:scale-110 w-full transition-all"}
                src={imageList[0].image_url}
                alt={imageList[0].image_name}
              />
            </div>
            {imageList
              .reverse()
              .slice(0, -1)
              .map(({ image_id, image_url, image_name }) => {
                return (
                  <div key={image_id}>
                    <Image
                      className={
                        "bg-[#eaeaea] rounded-[1rem] hover:scale-110 transition-all w-[180px]"
                      }
                      src={image_url}
                      width={1200}
                      height={100}
                      alt={image_name}
                    />
                  </div>
                );
              })}
          </div>
          <div className={"flex-1 flex flex-col gap-4"}>
            <span className={"text-sm text-[#2a2a2a]"}>
              {uniqueCategories.title}
            </span>
            <div className={"flex relative justify-between"}>
              <h1 className={"font-medium text-2xl text-[#2a2a2a]"}>
                {singleEvent.title}
              </h1>
              <span className={"font-medium text-xl"}>
                {currencyConverter(singleEvent.normal_price)}
              </span>
            </div>
            <div>
              <p className={"text-lg text-[#555555] text-justify"}>
                {singleEvent.description}
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Event;
