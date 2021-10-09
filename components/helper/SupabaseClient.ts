import { createClient } from "@supabase/supabase-js";

const supabaseApiUrl = process.env.SUPABASE_URL as string;
const supabaseApiKey = process.env.SUPABASE_KEY as string;

export const supabase = createClient(supabaseApiUrl, supabaseApiKey);
