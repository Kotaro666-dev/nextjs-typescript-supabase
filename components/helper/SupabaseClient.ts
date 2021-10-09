import { createClient } from "@supabase/supabase-js";

const supabaseApiUrl = process.env.API_URL as string;
const supabaseApiKey = process.env.API_KEY as string;

export const supabase = createClient(supabaseApiUrl, supabaseApiKey);
