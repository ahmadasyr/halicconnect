import { createClient } from "@supabase/supabase-js";
import {supabaseConfig } from "./supabaseConfig.js"

export const supabase = createClient(supabaseConfig.url, supabaseConfig.key);
