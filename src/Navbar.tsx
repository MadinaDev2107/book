"use client";

import Link from "next/link";
import React from "react";
import Image from "next/image";
import logo from "./app/images/logo.svg";
import { useTranslation } from "react-i18next";

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();

  const handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;
    i18n.changeLanguage(selectedLang);
  };

  return (
    <div className="bg-success w-100">
      <div className="container p-3 bg-success text-white d-flex justify-content-between align-items-center">
        {/* Logo */}
        <div className="d-flex align-items-center">
          <Image
            src={logo}
            alt="Book Illustration"
            width={100}
            height={100}
            className="mx-auto drop-shadow-2xl"
          />
        </div>


        <ul className="list-unstyled d-flex gap-5 mb-0 custom-nav">
          <li>
            <Link href="/about" className="text-white text-decoration-none">
              {t("about")}
            </Link>
          </li>
          <li>
            <Link href="/recent" className="text-white text-decoration-none">
              {t("myBooks")}
            </Link>
          </li>
          <li>
            <Link href="/plans" className="text-white text-decoration-none">
              {t("plans")}
            </Link>
          </li>
          <li>
            <Link href="/dashboard" className="text-white text-decoration-none">
              {t("dashboard")}
            </Link>
          </li>
        </ul>

        {/* Language Selector & Login */}
        <div className="d-flex align-items-center gap-3">
          <select
            className="form-select custom-select bg-success text-white border-white"
            style={{ width: "80px" }}
            value={i18n.language}
            onChange={handleChangeLanguage}
          >
            <option value="uz">Uzb</option>
            <option value="ru">Ru</option>
            <option value="en">Eng</option>
          </select>

          <Link
            href="/login"
            className="btn text-white border-white"
            style={{ backgroundColor: "transparent" }}
          >
            {t("login")}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
