"use client";
import Image from "next/image";
import bookImg from "../app/images/download.svg";
import "../i18n";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function HomePage() {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    const lang = localStorage.getItem("i18nextLng") || "uz";
    i18n.changeLanguage(lang);
  }, [i18n]);
  return (
    <div className="min-h-screen bg-green-600 dark:bg-dark-600 flex items-center justify-center relative overflow-hidden">
      <div className="absolute w-[300px] h-[300px] bg-yellow-300 opacity-30 rounded-full blur-3xl animate-ping z-0"></div>

      <div className="z-10 text-center">
        <Image
          src={bookImg}
          alt="Book Illustration"
          width={250}
          height={250}
          className="mx-auto drop-shadow-2xl"
        />
        <h1 className="text-4xl md:text-5xl font-bold text-white mt-6">
          {t("main_title")}
        </h1>
        <p className="text-white mt-3 text-lg p-2">{t("main_description")}</p>
      </div>
    </div>
  );
}
