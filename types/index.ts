import { Database } from "./supabase";

export type Event = Database["public"]["Tables"]["Event"]["Row"];

export type FilterInputs = {
  country: string;
  city: string;
  from: string;
  to: string;
};
