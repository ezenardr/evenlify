"use client";
import React from "react";
import Image from "next/image";
import Logo from "@/assets/images/logo.svg";
import { Link } from "next-view-transitions";
import { useSession } from "next-auth/react";
import { Menu, X } from "lucide-react";

function WebsiteNavigation() {
  const { data: session } = useSession();
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <header
      className={
        "flex py-8 absolute top-0 justify-between items-center w-screen px-8 lg:px-0 lg:w-[1100px] mx-auto"
      }
    >
      <div className={"flex gap-2 items-center"}>
        <Image src={Logo} alt={"logo"} />
        <span className={"text-white font-bold text-2xl"}>Evenlify</span>
      </div>
      <Menu
        color={"#fff"}
        className={"lg:hidden cursor-pointer"}
        size={32}
        onClick={() => setIsOpen(true)}
      />
      <nav
        className={`lg:hidden hero fixed top-0 ${!isOpen ? "translate-x-full" : "translate-x-0"} transition-all left-0 flex items-center justify-center w-full h-full`}
      >
        <X
          color={"#fff"}
          size={32}
          className={"absolute top-10 right-10 cursor-pointer"}
          onClick={() => setIsOpen(false)}
        />
        <ul className={"flex flex-col items-center text-white gap-12"}>
          <li>
            <Link href={"/"}>Evénements</Link>
          </li>
          <li>
            <Link href={"/"}>Contacts</Link>
          </li>
          <li>
            <Link href={"/"}>FAQ</Link>
          </li>
          {!session && (
            <li className={"flex flex-col gap-3 items-center"}>
              <Link href={"/auth/login"} className={""}>
                Se connecter
              </Link>
              <Link href={"/auth/register"} className={"btn-primary"}>
                S&apos;inscrire
              </Link>
            </li>
          )}
          {session && (
            <li>
              <Link
                href={`${session.user.role}/dashboard`}
                className={"btn-primary"}
              >
                Dashboard
              </Link>
            </li>
          )}
        </ul>
      </nav>
      <nav className={"hidden lg:block"}>
        <ul className={"lg:flex items-center text-white gap-12"}>
          <li>
            <Link href={"/"}>Evénements</Link>
          </li>
          <li>
            <Link href={"/"}>Contacts</Link>
          </li>
          <li>
            <Link href={"/"}>FAQ</Link>
          </li>
          {!session && (
            <li className={"flex gap-3 items-center"}>
              <Link href={"/auth/login"} className={""}>
                Se connecter
              </Link>
              <Link href={"/auth/register"} className={"btn-primary"}>
                S&apos;inscrire
              </Link>
            </li>
          )}
          {session && (
            <li>
              <Link
                href={`${session.user.role}/dashboard`}
                className={"btn-primary"}
              >
                Dashboard
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}

export default WebsiteNavigation;
