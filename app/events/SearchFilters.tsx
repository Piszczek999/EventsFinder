"use client";

import Icon from "@/components/Icon";
import SearchInput from "@/components/SearchInput";
import { FilterInputs } from "@/types";

type Props = {
  setFilters: (filters: FilterInputs) => void;
};

export default function SearchFilters({ setFilters }: Props) {
  const handleSubmit = (formData: FormData) => {
    setFilters({
      country: (formData.get("country") as string) || "",
      city: (formData.get("city") as string) || "",
      from: (formData.get("from") as string) || "",
      to: (formData.get("to") as string) || "",
    });
  };

  return (
    <div className="flex p-2 rounded-[10px] shadow bg-white justify-center">
      <form action={handleSubmit} className="flex flex-col md:flex-row gap-4">
        <SearchInput
          name="country"
          placeholder="Kraj"
          className="shadow rounded p-2 max-w-[200px] w-full"
        />
        <SearchInput
          name="city"
          placeholder="Miasto"
          className="shadow rounded p-2 max-w-[200px] w-full"
        />
        <div className="flex max-h-10 items-center gap-2">
          <p className="text-[#333333] text-lg">od:</p>
          <input
            type="date"
            name="from"
            defaultValue={new Date().toISOString().slice(0, 10)}
            className="max-w-[140px] shadow rounded p-2"
          />
          <p>do:</p>
          <input
            type="date"
            name="to"
            className="max-w-[140px] shadow rounded p-2"
          />
        </div>
        <button
          type="submit"
          className="tile text-white p-2 font-medium shadow"
        >
          Filtruj
        </button>
      </form>
    </div>
  );
}
