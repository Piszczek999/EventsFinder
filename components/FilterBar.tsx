import React from "react";
import SearchBar from "./SearchBar";
import Icon from "./Icon";
import Link from "next/link";

export default function FilterBar({
  handleSearch,
}: {
  handleSearch: (searchText: string) => void;
}) {
  return (
    <div className="flex justify-center bg-[#4F6F52] p-4 gap-4 items-center shadow-lg">
      <SearchBar onSubmit={handleSearch} />
      <button className="bg-[#1A4D2E] items-center rounded-full p-2 min-w-11 min-h-11">
        <Icon icon="filter" />
      </button>
      <Link
        href={"/new-event"}
        className="bg-[#1A4D2E] items-center rounded-full p-2 min-w-11 min-h-11"
      >
        <Icon icon="plus" />
      </Link>
    </div>
  );
}
