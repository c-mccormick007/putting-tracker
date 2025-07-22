import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
    import.meta.env.VITE_SUPERBASE_URL!,
    import.meta.env.VITE_SUPERBASE_ANON_KEY!
)