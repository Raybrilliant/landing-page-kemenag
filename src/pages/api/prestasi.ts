import type { APIRoute } from "astro";
import pb from "@/lib/database";

export const GET: APIRoute = async ({ request }) => {
    const {searchParams} = new URL(request.url);
    const limit = searchParams.get("limit");
    const name = searchParams.get("name");
    const page = searchParams.get("page");
    try {
    const data = await pb.collection("achievements").getList(page ? Number(page) : 1, limit ? Number(limit) : 3, {
        sort: "-created",
        filter: name ? `name~"${name.toLowerCase()}"` : undefined,
    });
    return new Response(JSON.stringify(data));
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
            status: 500,
        });
    }
};