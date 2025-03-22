"use server"

import { createClient } from "@/utils/supabase/server"

export async function GETRSVPS() {

    const supabase = await createClient();

    const { data, error } = await supabase.from("Rsvps").select('*');

    if (error) {
        console.error("Error fetching RSVPs :", error);
        return { success: true, message: "Failed to fetch RsVPs" }
    } else {
        console.log("Data : ", data);
        return { success: true, data };
    }

}