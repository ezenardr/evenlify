import React from "react";
import Image from "next/image";
import { database } from "@/database/databaseConnection";
import { images } from "@/database/schema";
import { eq } from "drizzle-orm";
import { Link } from "next-view-transitions";
import truncateWords from "@/lib/TruncateWord";
import login from "@/assets/images/login.webp";

async function EventSimpleCard({
  title,
  description,
  event_id,
  date,
}: {
  event_id: string;
  title: string;
  description: string;
  date: Date;
}) {
  const imagesList = await database
    .select()
    .from(images)
    .where(eq(images.field_id, event_id));
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const month = months[date.getMonth()];
  const day = date.getDate();
  return (
    <div
      className={
        "bg-white rounded-[12px] overflow-hidden w-full lg:w-[343px] shadow-lg"
      }
    >
      <div className={"h-[229px]"}>
        {imagesList.length > 0 ? (
          <Image
            src={imagesList[0].image_url}
            alt={title}
            className={"w-full h-full"}
            width={150}
            height={150}
          />
        ) : (
          <Image
            src={login}
            alt={title}
            className={"w-full h-full"}
            width={150}
            height={150}
          />
        )}
      </div>
      <div className={"flex gap-4 px-6 pt-4 pb-6"}>
        <div className={"flex flex-col items-center"}>
          <span className={"text-[#3D37F1] text-[12px] font-bold"}>
            {month}
          </span>
          <span className={"text-black text-[29px] font-bold"}>{day}</span>
        </div>
        <Link href={`/events/${event_id}`} className={"flex flex-col gap-2"}>
          <h4 className={"text-[16px] font-bold text-black"}>
            {truncateWords(title, 25)}
          </h4>
          <p className={"text-[#6a6a6a] text-[14px]"}>
            {truncateWords(description)}
          </p>
        </Link>
      </div>
    </div>
  );
}

export default EventSimpleCard;
