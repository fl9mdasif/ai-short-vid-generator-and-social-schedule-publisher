"use server";

import { currentUser } from "@clerk/nextjs/server";
import { supabase } from "@/lib/supabase";

export async function syncUser() {
    try {
        const user = await currentUser();

        if (!user) {
            console.log("No Clerk user found in syncUser");
            return { success: false, message: "No user found" };
        }

        console.log("Syncing user:", user.emailAddresses[0].emailAddress);

        const { data: existingUser, error: fetchError } = await supabase
            .from("users")
            .select("*")
            .eq("email", user.emailAddresses[0].emailAddress)
            .single();

        if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is "No rows found"
            console.error("Error fetching existing user:", fetchError);
        }

        if (!existingUser) {
            const name = `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || user.username || "Anonymous";
            const { error } = await supabase.from("users").insert({
                name,
                email: user.emailAddresses[0].emailAddress,
                clerk_id: user.id
            });

            if (error) {
                console.error("Supabase Insert Error:", error.message, error.details, error.hint);
                return { success: false, error };
            }
            console.log("User synced successfully to Supabase:", name);
        }

        return { success: true };
    } catch (err) {
        console.error("Unexpected error syncing user:", err);
        return { success: false, error: err };
    }
}
