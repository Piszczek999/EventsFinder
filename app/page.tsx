"use client";

import EventTile from "@/components/EventTile";
import FilterBar from "@/components/FilterBar";
import { Event } from "@/types";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";

export default function Home() {
  const [eventList, setEventList] = useState<Event[]>([]);
  const supabase = createClient();

  useEffect(() => {
    const getData = async () => await handleSearch("");
    getData();
  }, []);

  const handleSearch = async (searchInput: string) => {
    const { data } = await supabase
      .from("Event")
      .select()
      .ilike("title", `%${searchInput}%`);
    if (data) setEventList(data);
    console.log(data);
  };

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="animate-in flex-1 flex flex-col opacity-0 w-full sm:max-w-5xl px-3">
        <FilterBar handleSearch={handleSearch} />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full bg-[#F5EFE6]">
          {eventList.length > 0 ? (
            eventList.map((event, i) => <EventTile key={i} event={event} />)
          ) : (
            <p className="text-center p-2">No Event Found.</p>
          )}
        </div>
      </div>
    </div>
  );
}
