import React from "react";
import WebsiteNavigation from "@/components/WebsiteNavigation";
import Image from "next/image";
import hero from "@/assets/images/hero.webp";
import { Link } from "next-view-transitions";

function HeroSection({
  title,
  description,
  cta,
}: {
  title: string;
  description: string;
  cta?: boolean;
}) {
  return (
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
          <h1 className={"text-[40px] text-white font-bold"}>{title}</h1>
          <p className={"text-[18px] text-white"}>{description}</p>
          {cta && (
            <div className={"flex flex-col lg:flex-row w-full gap-8"}>
              <Link href={"/events"} className={"btn-primary"}>
                Réservations
              </Link>
              <Link className={"btn-secondary"} href={"/about"}>
                En savoir plus
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
