import Image from "next/image";
import bookImg from "../app/images/download.svg";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-green-800 dark:bg-green-600 flex items-center justify-center relative overflow-hidden">
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
          Kitoblaringiz dunyosi
        </h1>
        <p className="text-white mt-3 text-lg">
          O‘qigan, o‘qiyotgan va o‘qimoqchi bo‘lgan kitoblaringizni boshqaring.
        </p>
      </div>
    </div>
  );
}
