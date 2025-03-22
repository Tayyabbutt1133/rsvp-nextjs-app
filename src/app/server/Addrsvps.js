"use server"
import { createClient } from "@/utils/supabase/server"
import { Resend } from "resend";

export async function submitRSVP(formData) {

    console.log("Data recieve at server : ", formData);

    const Supabase = await createClient();
    const resend = new Resend(process.env.RESEND_API_KEY);

    const name = formData.get("name");
    const email = formData.get("email");
    const accompany = formData.get("accompany");
    const attendance = formData.get("attendance");

    const { data, error } = await Supabase.from("Rsvps").insert([{
        name,
        email,
        accompany,
        attendance
    }])
    // console.log("Submitted RSVPS : ", data);

    if (error) {
        console.log(error);
        return { success: false, message: "Error Adding Rsvps failed !" }
    }

    try {
        await resend.emails.send({
            from: 'RSVP <onboarding@resend.dev>',
            to: [email],
            subject: 'New RSVP Submission',
            html: `
             <h1>New RSVP Submission</h1>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Number of Guests:</strong> ${accompany}</p>
        <p><strong>Attendance:</strong> ${attendance}</p>
            `
        })
    } catch (error) {
        console.error("Error Sending emails", error);
    }


    return { success: true, message: "Rsvp Added Successfully !" }

}