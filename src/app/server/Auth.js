"use server"

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";


export async function SignIn(prevstate, formdata) {

    const email = formdata.get("email");
    const password = formdata.get("password");

    // console.log("Data recieved at server : ", email, password);

    const supabase_response = await createClient();

    const { error, data } = await supabase_response.auth.signInWithPassword({
        email,
        password
    })

    if (error) {
        return { success: false, message: "Can't log in !" }
    }

    redirect('/admin/rsvps')
    return { success: true, message: "Sucessfully logged in" }
}


export async function SignOut() {
    const supabase = await createClient();

    await supabase.auth.signOut();
    redirect("/");

}