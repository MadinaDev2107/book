"use client";
import { useCallback, useEffect, useState } from "react";
import { supabase } from "../SupabaseClient";
import "@/i18n";
import { useTranslation } from "react-i18next";
interface Book {
  id: number;
  title: string;
  author: string;
  status: "O‘qilmoqda" | "O‘qilgan" | "Rejada";
  rating: number;
  date: string;
  user_id: string;
}
interface NewBook {
  title: string;
  author: string;
  status: "O‘qilmoqda" | "O‘qilgan" | "Rejada";
  rating: number;
  date: string;
}
export default function MyBooksPage() {
  const [userId, setUserId] = useState<string>("");
  const [books, setBooks] = useState<Book[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editBookId, setEditBookId] = useState<number | null>(null);
  const [newBook, setNewBook] = useState<NewBook>({
    title: "",
    author: "",
    status: "Rejada",
    rating: 1,
    date: new Date().toISOString().split("T")[0],
  });
  const [filters, setFilters] = useState({
    title: "",
    author: "",
    status: "",
    rating: "",
    date: new Date().toISOString().split("T")[0],
  });
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const lang = localStorage.getItem("i18nextLng") || "uz";
    i18n.changeLanguage(lang);
  }, [i18n]);

  useEffect(() => {
    const userid = localStorage.getItem("userId");
    if (userid) {
      setUserId(userid);
    }
  }, []);
  const fetchBooks = useCallback(async () => {
    const { data, error } = await supabase
      .from("books")
      .select("*")
      .eq("userId", userId);

    if (!error && data) setBooks(data as Book[]);
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchBooks();
    }
  }, [userId, fetchBooks]);

  const deleteBook = async (id: number) => {
    await supabase.from("books").delete().eq("id", id);
    fetchBooks();
  };

  const handleSaveBook = async () => {
    if (!userId) return;

    if (editBookId !== null) {
      await supabase
        .from("books")
        .update({ ...newBook })
        .eq("id", editBookId);
    } else {
      const {} = await supabase.from("books").insert({
        ...newBook,
        userId: userId,
      });
    }
    fetchBooks();
    setNewBook({
      title: "",
      author: "",
      status: "Rejada",
      rating: 1,
      date: "",
    });
    setEditBookId(null);
    setShowModal(false);
  };

  const filteredBooks = books.filter((book) => {
    const matchTitle = book.title
      .toLowerCase()
      .includes(filters.title.toLowerCase());
    const matchAuthor = book.author
      .toLowerCase()
      .includes(filters.author.toLowerCase());
    const matchStatus = filters.status ? book.status === filters.status : true;
    const matchRating = filters.rating
      ? book.rating === Number(filters.rating)
      : true;
    return matchTitle && matchAuthor && matchStatus && matchRating;
  });

  return (
    <div className="min-h-screen bg-green-600 text-white px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-3xl font-bold">📚 {t("myBook_title")}</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-white text-green-700 hover:bg-gray-100 font-semibold px-4 py-2 rounded"
        >
          + {t("myBook_button")}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <input
          type="text"
          placeholder="Nomi bo‘yicha"
          className="px-3 py-2 rounded text-white border focus: outline-none"
          value={filters.title}
          onChange={(e) => setFilters({ ...filters, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Muallif bo‘yicha"
          className="px-3 py-2 rounded text-white border focus: outline-none"
          value={filters.author}
          onChange={(e) => setFilters({ ...filters, author: e.target.value })}
        />

        <input
          type="number"
          placeholder="Bahosi"
          className="px-3 py-2 rounded text-white border focus: outline-none"
          value={filters.rating}
          onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <div
            key={book.id}
            className="bg-white text-green-900 rounded-xl shadow p-4 hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold mb-1">{book.title}</h2>
            <p className="text-sm text-gray-700 mb-1">{book.author}</p>
            <p className="text-xs text-gray-600 mb-2">{book.date}</p>

            <span
              className={`inline-block text-xs px-2 py-1 rounded-full mb-3 ${
                book.status === "O‘qilgan"
                  ? "bg-green-200 text-green-800"
                  : book.status === "O‘qilmoqda"
                  ? "bg-yellow-200 text-yellow-800"
                  : "bg-blue-200 text-blue-800"
              }`}
            >
              {book.status}
            </span>

            <div className="flex justify-between items-center mt-2 flex-wrap mb-2">
              <div className="text-yellow-500 text-lg mb-2">
                {"⭐".repeat(book.rating)}
              </div>
              <div className="flex gap-2 text-sm">
                <button
                  onClick={() => {
                    setNewBook({
                      title: book.title,
                      author: book.author,
                      status: book.status,
                      rating: book.rating,
                      date: new Date().toISOString().split("T")[0],
                    });
                    setEditBookId(book.id);
                    setShowModal(true);
                  }}
                  className="text-white bg-blue-500 rounded px-3 py-2"
                >
                  ✏️ Tahrirlash
                </button>
                <button
                  onClick={() => deleteBook(book.id)}
                  className="text-white bg-red-500 rounded px-3 py-2"
                >
                  🗑 O‘chirish
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white text-green-900 p-6 rounded-lg w-96 space-y-4">
            <h2 className="text-xl font-bold">
              {editBookId !== null
                ? "✏️ Kitobni tahrirlash"
                : "📘 Yangi kitob qo‘shish"}
            </h2>
            <input
              type="text"
              placeholder="Kitob nomi"
              className="w-full border rounded px-3 py-2 mb-2 focus:outline-none"
              value={newBook.title}
              onChange={(e) =>
                setNewBook({ ...newBook, title: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Muallif"
              className="w-full border rounded px-3 py-2 mb-2 focus:outline-none"
              value={newBook.author}
              onChange={(e) =>
                setNewBook({ ...newBook, author: e.target.value })
              }
            />
            <select
              className="w-full border rounded px-3 py-2 mb-2 focus:outline-none"
              value={newBook.status}
              onChange={(e) =>
                setNewBook({
                  ...newBook,
                  status: e.target.value as Book["status"],
                })
              }
            >
              <option value="Rejada">Rejada</option>
              <option value="O‘qilmoqda">O‘qilmoqda</option>
              <option value="O‘qilgan">O‘qilgan</option>
            </select>

            <input
              type="number"
              placeholder="Bahosi (0-5)"
              className="w-full border rounded px-3 py-2 mb-2 focus:outline-none"
              value={newBook.rating}
              min={0}
              max={5}
              onChange={(e) =>
                setNewBook({ ...newBook, rating: parseInt(e.target.value) })
              }
            />
            <div className="flex justify-end gap-2 mb-2">
              <button
                onClick={() => {
                  setShowModal(false);
                  setEditBookId(null);
                }}
                className="bg-red-600 rounded text-white px-2 py-2"
              >
                Bekor qilish
              </button>
              <button
                onClick={handleSaveBook}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                {editBookId !== null ? "Saqlash" : "Qo‘shish"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
