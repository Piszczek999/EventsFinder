"use client";

import SearchInput from "@/components/SearchInput";
import { FilterInputs } from "@/utils/types";

type Props = {
  setFilters: (filters: FilterInputs) => void;
};

export default function SearchFilters({ setFilters }: Props) {
  const handleSubmit = (formData: FormData) => {
    setFilters({
      country: (formData.get("country") as string) || "",
      city: (formData.get("city") as string) || "",
    });
  };

  return (
    <div className="flex p-2 rounded-[10px] shadow bg-white justify-center">
      <form action={handleSubmit} className="flex flex-col md:flex-row gap-4">
        <SearchInput
          name="country"
          placeholder="Kraj"
          className="shadow rounded p-2"
        />
        <SearchInput
          name="city"
          placeholder="Miasto"
          className="shadow rounded p-2"
        />
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
