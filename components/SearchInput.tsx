"use client";

import { ComponentProps, useState } from "react";
import "./SearchInput.css";

type Props = ComponentProps<"input">;

export default function SearchInput({ className, ...props }: Props) {
  const [value, setValue] = useState("");

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const clearSearch = () => {
    setValue("");
  };

  return (
    <div className="search-container">
      <input
        {...props}
        type="search"
        className={"pr-6 " + className}
        value={value}
        onChange={handleChange}
      />
      {value && (
        <button className="clear-button" onClick={clearSearch}>
          ✖
        </button>
      )}
    </div>
  );
}
