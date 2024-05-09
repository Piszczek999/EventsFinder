"use client";

import React, { useEffect, useState } from "react";
import EventTile from "./EventTile";
import { createClient } from "@/utils/supabase/client";
import SearchBar from "./SearchBar";
import { Event } from "@/types";
import Link from "next/link";

export default function EventsList() {
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
    <div className="flex flex-col w-full">
      <div className="flex justify-center bg-[#4F6F52] p-4 gap-4 items-center shadow-lg">
        <SearchBar onSubmit={handleSearch} />
        <button className="bg-[#1A4D2E] items-center rounded-full p-2 min-w-11 min-h-11">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g id="Interface / Filter">
              <path
                id="Vector"
                d="M20 5.6001C20 5.04005 19.9996 4.75981 19.8906 4.5459C19.7948 4.35774 19.6423 4.20487 19.4542 4.10899C19.2403 4 18.9597 4 18.3996 4H5.59961C5.03956 4 4.75981 4 4.5459 4.10899C4.35774 4.20487 4.20487 4.35774 4.10899 4.5459C4 4.75981 4 5.04005 4 5.6001V6.33736C4 6.58195 4 6.70433 4.02763 6.81942C4.05213 6.92146 4.09263 7.01893 4.14746 7.1084C4.20928 7.20928 4.29591 7.29591 4.46875 7.46875L9.53149 12.5315C9.70443 12.7044 9.79044 12.7904 9.85228 12.8914C9.90711 12.9808 9.94816 13.0786 9.97266 13.1807C10 13.2946 10 13.4155 10 13.6552V18.411C10 19.2682 10 19.6971 10.1805 19.9552C10.3382 20.1806 10.5814 20.331 10.8535 20.3712C11.1651 20.4172 11.5487 20.2257 12.3154 19.8424L13.1154 19.4424C13.4365 19.2819 13.5966 19.2013 13.7139 19.0815C13.8176 18.9756 13.897 18.8485 13.9453 18.7084C14 18.5499 14 18.37 14 18.011V13.6626C14 13.418 14 13.2958 14.0276 13.1807C14.0521 13.0786 14.0926 12.9808 14.1475 12.8914C14.2089 12.7911 14.2947 12.7053 14.4653 12.5347L14.4688 12.5315L19.5315 7.46875C19.7044 7.2958 19.7904 7.20932 19.8523 7.1084C19.9071 7.01893 19.9482 6.92146 19.9727 6.81942C20 6.70551 20 6.58444 20 6.3448V5.6001Z"
                stroke="#F5EFE6"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
          </svg>
        </button>
        <Link
          href={"/new-event"}
          className="bg-[#1A4D2E] items-center rounded-full p-2 min-w-11 min-h-11"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              fill-rule="evenodd"
              d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z"
              stroke="#F5EFE6"
              stroke-linejoin="round"
              stroke-width="1"
              fill="#F5EFE6"
            />
          </svg>
        </Link>
      </div>
      <div className="flex flex-col">
        {eventList.length > 0 ? (
          eventList.map((event, i) => <EventTile key={i} event={event} />)
        ) : (
          <p className="text-center p-2">No Event Found.</p>
        )}
      </div>
    </div>
  );
}
