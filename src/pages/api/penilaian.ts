import type { APIRoute } from "astro";
import pb from "@/lib/database";

export const POST: APIRoute = async ({ request }) => {
    const formData = await request.formData();
    try {
    const data = await pb.collection("ratings").create(formData);
    return new Response(JSON.stringify(data));
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
            status: 500,
        });
    }
};