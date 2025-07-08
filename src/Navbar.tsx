"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import logo from "./app/images/logo.svg";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";

import "@/i18n";

const Navbar: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const lang = localStorage.getItem("i18nextLng") || "uz";
    i18n.changeLanguage(lang);
  }, [i18n]);

  const handleChangeLanguage = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedLang = e.target.value;
    i18n.changeLanguage(selectedLang);
  };

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="w-full bg-green-600 text-white shadow-md relative z-50">
      <div className="container mx-auto p-4 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={logo}
            alt="Book Illustration"
            width={100}
            height={100}
            className="drop-shadow-2xl"
          />
        </Link>

        {/* Desktop menyu */}
        <ul className="hidden lg:flex gap-6 items-center">
          {[
            { href: "/about", label: t("about") },
            { href: "/recent", label: t("myBooks") },
            { href: "/plans", label: t("plans") },

          ].map((item) => (
            <li key={item.href} className="relative group">
              <Link
                style={{ textDecoration: "none" }}
                href={item.href}
                className="text-white transition duration-300 hover:text-yellow-300"
              >
                {item.label}
                <span className="block h-[2px] bg-green-600 scale-x-0 group-hover:scale-x-100  transition-colors origin-left duration-300"></span>
              </Link>
            </li>
          ))}
        </ul>
        <div className="hidden lg:flex gap-2">
          <select
            value={i18n.language}
            onChange={handleChangeLanguage}
            className="bg-green-600 text-white border border-white rounded px-2 py-1 text-sm"
          >
            <option value="uz">Uzb</option>
            <option value="ru">Ru</option>
            <option value="en">Eng</option>
          </select>
          <Link
            style={{ textDecoration: "none" }}
            href="/login"
            className="px-3 py-2 border border-white rounded hover:bg-white hover:text-black transition"
          >
            {t("login")}
          </Link>
        </div>
        {/* Hamburger + select — faqat mobil uchun */}
        <div className="lg:hidden flex items-center gap-3">
          <select
            value={i18n.language}
            onChange={handleChangeLanguage}
            className="bg-green-700 text-white border border-white rounded px-2 py-1 text-sm"
          >
            <option value="uz">Uzb</option>
            <option value="ru">Ru</option>
            <option value="en">Eng</option>
          </select>
          <button onClick={toggleMenu}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobil menyu (hamburger bosilganda chiqadi) */}
      {menuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-green-600 text-white flex flex-col items-start px-4 py-4 space-y-2 z-40 shadow-lg">
          {[
            { href: "/about", label: t("about") },
            { href: "/recent", label: t("myBooks") },
            { href: "/plans", label: t("plans") },
            { href: "/login", label: t("login") },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="w-full text-left px-4 py-2 border-b border-white/30 rounded hover:bg-yellow-400 hover:text-black transition duration-200"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
