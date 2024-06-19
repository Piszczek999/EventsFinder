"use client";

import { useState } from "react";

export default function FileSelector() {
  const [fileName, setFileName] = useState("Wybierz plik");
  return (
    <div className="relative">
      <input
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        type="file"
        name="image"
        id="image"
        accept="image/*"
        required
        onChange={(e) =>
          setFileName(
            "Wybrano: " + e.target.value.split("\\").pop()!.split("/").pop()!
          )
        }
      />
      <button
        className="w-full rounded-md px-4 py-2 shadow bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
        type="button"
      >
        {fileName}
      </button>
    </div>
  );
}
