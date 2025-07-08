"use client";

import { useCallback, useEffect, useState } from "react";

import { Dialog } from "@headlessui/react";
import { format } from "date-fns";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { supabase } from "../SupabaseClient";
import "@/i18n";
import { useTranslation } from "react-i18next";
interface PlanItem {
  id: number;
  title: string;
  done: boolean;
  deadline: string;
  type: "weekly" | "monthly" | "yearly";
  userId?: string;
}

export default function PlansPage() {
  const [plans, setPlans] = useState<PlanItem[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [type, setType] = useState<"weekly" | "monthly" | "yearly">("weekly");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [activeType, setActiveType] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const { t, i18n } = useTranslation();
  useEffect(() => {
    const uid = localStorage.getItem("userId");
    if (uid) {
      setUserId(uid);
    }
  }, []);
  useEffect(() => {
    const lang = localStorage.getItem("i18nextLng") || "uz";
    i18n.changeLanguage(lang);
  }, [i18n]);
  const fetchPlans = useCallback(async () => {
    if (!userId) return;
    const { data } = await supabase
      .from("plans")
      .select("*")
      .eq("userId", userId);
    if (data) setPlans(data);
  }, [userId]);

  useEffect(() => {
    fetchPlans();
  }, [fetchPlans]);

  const createPlan = async () => {
    if (!title || !selectedDate || !userId) return;
    const { data } = await supabase
      .from("plans")
      .insert({
        title,
        type,
        deadline: selectedDate.toISOString(),
        done: false,
        userId,
      })
      .select();
    if (data) setPlans([...plans, ...data]);
    setTitle("");
    setSelectedDate(null);
    setType("weekly");
    setShowModal(false);
  };

  const toggleDone = async (id: number) => {
    const plan = plans.find((p) => p.id === id);
    if (!plan) return;
    const { data } = await supabase
      .from("plans")
      .update({ done: !plan.done })
      .eq("id", id)
      .select();
    if (data)
      setPlans(plans.map((p) => (p.id === id ? { ...p, done: !p.done } : p)));
  };

  const deletePlan = async (id: number) => {
    await supabase.from("plans").delete().eq("id", id);
    setPlans(plans.filter((p) => p.id !== id));
  };

  const groupedPlans = plans.reduce(
    (acc, plan) => {
      acc[plan.type].push(plan);
      return acc;
    },
    { weekly: [], monthly: [], yearly: [] } as Record<string, PlanItem[]>
  );

  const PlanSection = ({ type }: { type: string }) => (
    <div className="w-full lg:w-1/3 px-2">
      <button
        onClick={() => setActiveType(activeType === type ? null : type)}
        className="text-2xl font-bold text-white bg-green-700 px-4 py-2 rounded mb-4 w-full"
      >
        {type === "weekly"
          ? "📅 Haftalik"
          : type === "monthly"
          ? "📆 Oylik"
          : "📈 Yillik"}{" "}
        Rejalar
      </button>

      {activeType === type && (
        <ul className="space-y-3 max-h-[400px] overflow-auto pr-2">
          {groupedPlans[type].map((item) => (
            <li
              key={item.id}
              className="bg-white dark:bg-slate-700 p-3 rounded shadow flex justify-between items-center"
            >
              <div>
                <h3
                  className={`font-medium text-black ${
                    item.done ? "line-through text-gray-400" : ""
                  }`}
                >
                  {item.title}
                  <br />
                  <span className="text-sm text-gray-500">
                    {format(new Date(item.deadline), "yyyy-MM-dd")}
                  </span>
                </h3>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleDone(item.id)}
                  className={`px-3 py-1 text-sm rounded ${
                    item.done
                      ? "bg-red-500 text-white"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  {item.done ? "Bekor qilish" : "Tugallandi"}
                </button>
                <button
                  onClick={() => deletePlan(item.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded"
                >
                  🗑
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-green-600 text-white px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8">
        📚 {t("plans_title")}
      </h1>
      <div className="text-center mb-6">
        <button
          onClick={() => setShowModal(true)}
          className="bg-white text-green-700 px-4 py-2 rounded font-semibold"
        >
          ➕ {t("plans_button")}
        </button>
      </div>

      {/* Rejalar yonma yon */}
      <div className="flex flex-col lg:flex-row gap-4">
        <PlanSection type="weekly" />
        <PlanSection type="monthly" />
        <PlanSection type="yearly" />
      </div>

      {/* Modal */}
      <Dialog open={showModal} onClose={() => setShowModal(false)}>
        <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center">
          <div className="bg-white text-black rounded-xl p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">📖 Yangi Reja</h2>
            <input
              type="text"
              placeholder="Kitob nomi"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-3 focus:outline-none"
            />
            <select
              value={type}
              onChange={(e) =>
                setType(e.target.value as "weekly" | "monthly" | "yearly")
              }
              className="w-full border px-3 py-2 rounded mb-3 focus:outline-none"
            >
              <option value="weekly">Haftalik</option>
              <option value="monthly">Oylik</option>
              <option value="yearly">Yillik</option>
            </select>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              {type === "weekly"
                ? "Hafta kuni tanlang"
                : type === "monthly"
                ? "Oy kuni tanlang"
                : "Yilni tanlang"}
            </label>
            <DatePicker
              selected={selectedDate ?? undefined}
              onChange={(date: Date | null) => setSelectedDate(date)}
              dateFormat={"yyyy-MM-dd"}
              showMonthYearPicker={type === "monthly"}
              showYearPicker={type === "yearly"}
              className="w-full border px-3 m-2  py-2 rounded mb-4 focus:outline-none"
              placeholderText="Sanani tanlang"
            />
            <div className="flex justify-between">
              <button
                onClick={createPlan}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Saqlash
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-600"
              >
                Bekor qilish
              </button>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
