"use client";

import "../../i18n";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
export default function AboutPage() {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    const lang = localStorage.getItem("i18nextLng") || "uz";
    i18n.changeLanguage(lang);
  }, [i18n]);
  return (
    <div className=" container min-h-screen bg-white dark:bg-slate-900 text-gray-800 dark:text-white py-12 px-6 lg:px-24">
      <h1 className="text-4xl font-bold mb-6 text-center text-black">
        📚 {t("about_title")}
      </h1>

      <p className="mb-6 text-lg leading-relaxed text-black text-center w-1/2 mx-auto">
        {t("about_desc")}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-green-600">
        <div className=" dark:bg-green-600/20 p-6 rounded-xl shadow-sm bg-green-600">
          <h2 className="text-2xl font-semibold mb-2 ">
            🔍 {t("about_variable")}
          </h2>
          <ul className="list-disc list-inside space-y-1 bg-green-600 ">
            <li>📖 {t("about_var1")}</li>
            <li>⭐ {t("about_var2")}</li>
            <li>📅 {t("about_var3")}</li>
            <li>🌐 {t("about_var4")}</li>
          </ul>
        </div>

        <div className=" dark:bg-green-600/20 p-6 rounded-xl shadow-sm bg-green-600">
          <h2 className="text-2xl font-semibold mb-2">
            🛠 {t("about_tech_title")}
          </h2>
          <ul className="list-disc list-inside space-y-1 bg-green-600 ">
            <li>⚛️ {t("about_tech1")}</li>
            <li>🔐 {t("about_tech2")}</li>
            <li>📊 {t("about_tech3")}</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-md italic text-black">{t("about_footer")} </p>
      </div>
    </div>
  );
}
