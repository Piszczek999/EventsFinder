"use client";

import EventTile from "@/components/EventTile";
import { Event, FilterInputs } from "@/types";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import SearchFilters from "./SearchFilters";
import SearchHeader from "./SearchHeader";

export default function EventsScreen() {
  const [eventList, setEventList] = useState<Event[]>([]);
  const [enteredEvents, setEnteredEvents] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLogged, setIsLogged] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<FilterInputs>({
    city: "",
    country: "",
    from: "",
    to: "",
  });
  const supabase = createClient();

  useEffect(() => {
    const checkUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) setIsLogged(true);
    };
    checkUser();
  }, [supabase]);

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

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { data: enters } = await supabase
        .from("Enters")
        .select("event_id")
        .eq("user_id", user.id);
      if (enters) setEnteredEvents(enters.map((enter) => enter.event_id));
    }

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
        <div className="flex flex-col w-full flex-1 justify-center items-center h-screen">
          <div className="loader"></div>
        </div>
      ) : eventList.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full bg-white gap-1 shadow rounded-[10px]">
          {eventList.map((event) => (
            <EventTile
              key={event.id}
              event={event}
              isEntered={enteredEvents.includes(event.id)}
              isLogged={isLogged}
            />
          ))}
        </div>
      ) : (
        <p className="text-center p-2">No Event Found.</p>
      )}
    </div>
  );
}
