import type { APIRoute } from "astro";
import pb from "@/lib/database";

export const GET: APIRoute = async ({ request }) => {
    const {searchParams} = new URL(request.url);
    const limit = searchParams.get("limit");
    try {
    const data = await pb.collection("news").getFullList({
        sort: "-created",
        limit: limit ? Number(limit) : undefined,
    });
    return new Response(JSON.stringify(data));
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
            status: 500,
        });
    }
};