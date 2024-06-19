"use client";

import { useState } from "react";

export default function FileSelector() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [fileName, setFileName] = useState("Wybierz plik");

  return (
    <div className="relative">
      <input
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer shadow"
        type="file"
        name="image"
        id="image"
        accept="image/*"
        required
        onChange={(e) => {
          const selectedFile = e.target.files?.[0];
          if (selectedFile) {
            setFile(selectedFile);
            setFileName(
              "Wybrano: " + e.target.value.split("\\").pop()!.split("/").pop()!
            );
            const reader = new FileReader();
            reader.onloadend = () => {
              setPreview(reader.result as string);
            };
            reader.readAsDataURL(selectedFile);
          }
        }}
      />
      <button
        className="w-full rounded-md px-4 py-2 shadow bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out"
        type="button"
      >
        {fileName}
      </button>
      {preview && (
        <img
          src={preview}
          alt="Preview"
          className="width-full height-full mt-2 rounded-[10px] shadow"
          style={{ maxWidth: "100%", marginTop: "10px" }}
        />
      )}
    </div>
  );
}
