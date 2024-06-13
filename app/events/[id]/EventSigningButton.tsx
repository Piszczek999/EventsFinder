"use client";

import { createClient } from "@/utils/supabase/client";
import { ComponentProps, MouseEvent, useEffect, useState } from "react";

type Props = ComponentProps<"button"> & { eventId: string };

export default function EventSigningButton({
  eventId,
  className,
  ...props
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [isEntered, setIsEntered] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    const load = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { data } = await supabase
          .from("Enters")
          .select()
          .eq("user_id", user.id)
          .eq("event_id", eventId);
        if (data && data.length > 0) setIsEntered(true);
      }
    };
    load();
  }, [eventId, supabase]);

  const handleEventSignUp = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPending(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase
        .from("Enters")
        .insert({ user_id: user.id, event_id: eventId });

      if (error) {
        console.error("Error signing up:", error.message);
      } else {
        setIsEntered(true);
      }
    }
    setIsPending(false);
  };

  const handleEventSignOut = async (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPending(true);

    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase
        .from("Enters")
        .delete()
        .eq("user_id", user.id)
        .eq("event_id", eventId);

      if (error) {
        console.error("Error signing out:", error.message);
      } else {
        setIsEntered(false);
      }
    }
    setIsPending(false);
  };

  if (isEntered)
    return (
      <button
        {...props}
        className={"bg-white text-[#333] " + className}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleEventSignOut}
        disabled={isPending}
      >
        {isPending
          ? "Wypisywanie..."
          : isHovered
          ? "Wypisać się?"
          : "Jesteś zapisany"}
      </button>
    );
  else
    return (
      <button
        {...props}
        className={"bg-gradient text-white " + className}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={handleEventSignUp}
        disabled={isPending}
      >
        {isPending ? "Zapisywanie..." : "Zapisz się"}
      </button>
    );
}
