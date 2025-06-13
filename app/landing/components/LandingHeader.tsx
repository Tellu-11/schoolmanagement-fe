"use client";

import Image from "next/image";

export default function LandingHeader() {
  const handleGotoLogin = () => {
    window.location.href = "/login";
  };

  return (
    <div className="max-w-full mx-auto px-4 flex items-center justify-between border-b-1 border-red-400 py-4">
      <Image
        src={"/image/graduate-hat.webp"}
        alt="Logo"
        width={50}
        height={50}
      />
      <p className="text-2xl font-semibold flex-1/2">
        School Management System
      </p>
      <div className="flex items-center space-x-4">
        <button className="flex text-gray-600 hover:text-gray-900">
          <Image
            className="m-2"
            src="/image/us-flag.png"
            alt="ID"
            width={24}
            height={24}
          />
          <p className="m-2">Eng (US)</p>
        </button>
        <div className="text-gray-400 h-8 w-[2px] bg-gray-300 mr-6"></div>
        <button
          className="text-white hover:bg-red-500 bg-red-400 px-4 py-2 rounded-lg transition-colors cursor-pointer"
          onClick={handleGotoLogin}
        >
          Sign in
        </button>
      </div>
    </div>
  );
}
