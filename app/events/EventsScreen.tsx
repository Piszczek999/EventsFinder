"use client";

import EventTile from "@/components/EventTile";
import { Event, FilterInputs } from "@/types";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import SearchHeader from "./SearchHeader";
import SearchFilters from "./SearchFilters";

export default function EventsScreen() {
  const [eventList, setEventList] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterInputs>({
    city: "",
    country: "",
    from: "",
    to: "",
  });
  const supabase = createClient();

  useEffect(() => {
    const getData = async () => await handleSearch("");
    getData();
  }, [filters]);

  const handleSearch = async (searchInput: string) => {
    setIsLoading(true);
    const { data } = await supabase
      .from("Event")
      .select()
      .ilike("title", `%${searchInput}%`)
      .ilike("country", `%${filters.country}%`)
      .ilike("city", `%${filters.city}%`)
      .gte(
        "date",
        filters.from ? filters.from : new Date().toISOString().slice(0, 10)
      )
      .lte("date", filters.to ? filters.to : "9999-12-12")
      .order("date");
    if (data) setEventList(data);
    setIsLoading(false);
  };

  return (
    <div className="animate-in flex flex-col w-full sm:max-w-5xl gap-4">
      <SearchHeader
        onSearch={handleSearch}
        onFilterClick={() => setShowFilters((prev) => !prev)}
      />

      {showFilters && <SearchFilters setFilters={setFilters} />}

      {isLoading ? (
        <p className="text-center p-2">Loading...</p>
      ) : eventList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full bg-[#F5EFE6] gap-1">
          {eventList.map((event) => (
            <EventTile key={event.id} event={event} />
          ))}
        </div>
      ) : (
        <p className="text-center p-2">No Event Found.</p>
      )}
    </div>
  );
}
