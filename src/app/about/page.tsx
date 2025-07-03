export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 text-gray-800 dark:text-white py-12 px-6 lg:px-24">
      <h1 className="text-4xl font-bold mb-6 text-center text-black">
        📚 Ilova haqida
      </h1>

      <p className="mb-6 text-lg leading-relaxed text-black">
        Bu ilova siz o‘qigan, o‘qiyotgan va o‘qimoqchi bo‘lgan kitoblaringizni
        boshqarishga yordam beradi. Siz kitoblaringizga baho qo‘shishingiz,
        oylik tahlilni ko‘rishingiz, va har bir kitob haqida eslatma yozishingiz
        mumkin.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-green-800">
        <div className=" dark:bg-green-800/20 p-6 rounded-xl shadow-sm bg-green-800">
          <h2 className="text-2xl font-semibold mb-2">
            🔍 Asosiy xususiyatlar
          </h2>
          <ul className="list-disc list-inside space-y-1 bg-green-800 ">
            <li>📖 Kitob qo‘shish, tahrirlash, o‘chirish</li>
            <li>⭐ Baholash va sharh yozish</li>
            <li>📅 Oylik kitob statistikasi</li>
            <li>🌗 Light va dark rejim</li>
            <li>🌐 3 ta til: uz, ru, en</li>
          </ul>
        </div>

        <div className=" dark:bg-green-800/20 p-6 rounded-xl shadow-sm bg-green-800">
          <h2 className="text-2xl font-semibold mb-2">
            🛠 Ishlatilgan texnologiyalar
          </h2>
          <ul className="list-disc list-inside space-y-1 bg-green-800 ">
            <li>⚛️ React + Next.js</li>
            <li>🎨 Tailwind CSS</li>
            <li>🔐 Supabase Auth (Login/Signup)</li>
            <li>📦 localStorage va kelajakda database</li>
            <li>📊 Statistik diagrammalar (chart.js)</li>
          </ul>
        </div>
      </div>

      <div className="mt-12 text-center">
        <p className="text-md italic text-black">
          "Bu ilova – bilimga chanqoq, o‘qishni sevuvchi har bir kishi uchun
          yaratilgan."
        </p>
      </div>
    </div>
  );
}
