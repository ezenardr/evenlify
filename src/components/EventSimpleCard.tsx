import React from "react";
import Image, { type StaticImageData } from "next/image";

function EventSimpleCard({
  image,
  title,
  month,
  day,
  description,
}: {
  image: StaticImageData;
  title: string;
  month: string;
  day: string;
  description: string;
}) {
  return (
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
          <span className={"text-black text-[29px] font-bold"}>{day}</span>
        </div>
        <div className={"flex flex-col gap-2"}>
          <h4 className={"text-[16px] font-bold text-black"}>{title}</h4>
          <p className={"text-[#6a6a6a] text-[14px]"}>{description}</p>
        </div>
      </div>
    </div>
  );
}

export default EventSimpleCard;
