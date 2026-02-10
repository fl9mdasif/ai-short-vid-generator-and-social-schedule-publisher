import { google } from "googleapis";
import { supabaseAdmin } from "./supabase-admin";
import axios from "axios";
import { Readable } from "stream";

const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    `${process.env.NEXT_PUBLIC_APP_URL}/api/auth/callback/youtube`
);

export async function getValidYoutubeToken(userId: string) {
    // 1. Get tokens from DB
    const { data: connection, error } = await supabaseAdmin
        .from("social_connections")
        .select("*")
        .eq("user_id", userId)
        .eq("platform", "youtube")
        .single();

    if (error || !connection) {
        throw new Error("No YouTube connection found");
    }

    // 2. Check if expired (buffer of 5 mins)
    const isExpired = new Date(connection.expires_at).getTime() < Date.now() + 5 * 60 * 1000;

    if (isExpired) {
        if (!connection.refresh_token) {
            throw new Error("Token expired and no refresh token available. Re-connect account.");
        }

        console.log(`Refreshing YouTube token for user ${userId}`);

        oauth2Client.setCredentials({
            refresh_token: connection.refresh_token
        });

        const { credentials } = await oauth2Client.refreshAccessToken();

        // Update DB
        await supabaseAdmin
            .from("social_connections")
            .update({
                access_token: credentials.access_token,
                expires_at: new Date(credentials.expiry_date!).toISOString(),
                // refresh_token might be rotated, but usually stays same unless revoked
                refresh_token: credentials.refresh_token || connection.refresh_token
            })
            .eq("id", connection.id);

        return credentials.access_token!;
    }

    return connection.access_token!;
}

export async function uploadVideoToYoutube(
    accessToken: string,
    videoUrl: string,
    title: string,
    description: string,
    privacyStatus: 'private' | 'unlisted' | 'public' = 'private'
) {
    try {
        const auth = new google.auth.OAuth2();
        auth.setCredentials({ access_token: accessToken });

        const youtube = google.youtube({ version: 'v3', auth });

        // Download video stream
        const response = await axios({
            method: 'get',
            url: videoUrl,
            responseType: 'stream'
        });

        console.log(`Uploading video "${title}" to YouTube...`);

        const res = await youtube.videos.insert({
            part: ['snippet', 'status'],
            requestBody: {
                snippet: {
                    title: title.substring(0, 100), // Max 100 chars
                    description: description.substring(0, 5000), // Max 5000 chars
                    tags: ['AI Generated', 'Shorts'],
                },
                status: {
                    privacyStatus: privacyStatus,
                    selfDeclaredMadeForKids: false,
                },
            },
            media: {
                body: response.data as Readable,
            },
        });

        console.log(`Upload successful! Video ID: ${res.data.id}`);
        return res.data;

    } catch (error: any) {
        console.error("YouTube Upload Error:", error.response?.data || error.message);
        throw new Error(`YouTube Upload Failed: ${error.message}`);
    }
}
