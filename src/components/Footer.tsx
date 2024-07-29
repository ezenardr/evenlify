import React from "react";
import logo from "@/assets/images/logo.svg";
import Image from "next/image";
import { Link } from "next-view-transitions";
import { Facebook, Instagram } from "iconsax-react";

function Footer() {
  return (
    <footer
      className={
        "p-10 bg-[#0A075F] flex flex-col lg:flex-row justify-between gap-8 mt-24 lg:gap-4"
      }
    >
      <div className={"flex flex-1 items-center lg:items-start flex-col gap-4"}>
        <Link href={"/"} className={"flex gap-2 items-center"}>
          <Image src={logo} alt={"logo"} />
          <span className={"text-white font-bold text-2xl"}>Evenlify</span>
        </Link>
        <p className={"text-[#f3f3f3] text-[14px]"}>
          Evenlify est une plateforme Haitienne de billetterie en libre-service
          pour les expériences en direct qui permet à chacun de créer, partager,
          découvrir et assister à des événements qui nourrissent leurs passions
          et enrichissent leur vie.
        </p>
        <div className={"flex gap-4"}>
          <Facebook size="32" color="#ffffff" variant="TwoTone" />
          <Instagram size="32" color="#ffffff" variant="TwoTone" />
        </div>
      </div>
      <ul
        className={
          "text-[14px] text-center flex-1 text-[#f3f3f3] font-medium flex flex-col gap-2"
        }
      >
        <span className={"text-white text-[18px] font-bold pb-2"}>
          Evénements
        </span>
        <li className={"hover:text-[#55ACEE] transition-all"}>
          <Link href={"/"}>Créer un événement</Link>
        </li>
        <li className={"hover:text-[#55ACEE] transition-all"}>
          <Link href={"/"}>Vendre des tickets</Link>
        </li>
        <li className={"hover:text-[#55ACEE] transition-all"}>
          <Link href={"/"}>Réservation En ligne</Link>
        </li>
        <li className={"hover:text-[#55ACEE] transition-all"}>
          <Link href={"/"}>Evénements En ligne</Link>
        </li>
      </ul>
      <ul
        className={
          "text-[14px] flex-1 text-center text-[#f3f3f3] font-medium flex flex-col gap-2"
        }
      >
        <span className={"text-white text-[18px] font-bold pb-2"}>
          Evenlify
        </span>
        <li className={"hover:text-[#55ACEE] transition-all"}>
          <Link href={"/"}>Politique de Confidentialité</Link>
        </li>
        <li className={"hover:text-[#55ACEE] transition-all"}>
          <Link href={"/"}>Condition d&apos;Utilisation</Link>
        </li>
        <li className={"hover:text-[#55ACEE] transition-all"}>
          <Link href={"/"}>Nous Contacter</Link>
        </li>
        <li className={"hover:text-[#55ACEE] transition-all"}>
          <Link href={"/"}>Centre d&apos;Aide</Link>
        </li>
        <li className={"hover:text-[#55ACEE] transition-all"}>
          <Link href={"/"}>A Propos d&apos;Evenlify</Link>
        </li>
        <li className={"hover:text-[#55ACEE] transition-all"}>
          <Link href={"/"}>FAQ</Link>
        </li>
      </ul>
      <div
        className={
          "text-[14px] flex-1 text-[#f3f3f3] font-medium flex items-center lg:items-start text-center lg:text-start flex-col gap-4"
        }
      >
        <span className={"text-white text-[18px] font-bold "}>
          Restez au courant !
        </span>
        <p className={""}>
          Rejoignez notre liste de diffusion pour rester informé de nos
          nouveautés en matière d&apos;événements et de concerts.
        </p>
        <div className={"p-3 lg:p-4 flex bg-white rounded-[50px]"}>
          <input
            className={"flex-1 focus:outline-none text-black"}
            type={"email"}
            placeholder={"Entrez votre adresse mail"}
          />
          <button
            className={
              "btn-primary flex-1 hover:text-[#0A075F] hover:border-[#0A075F]"
            }
            type={"button"}
          >
            S&apos;abonner
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
