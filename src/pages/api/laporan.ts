import type { APIRoute } from "astro";
import pb from "@/lib/database";

export const GET: APIRoute = async ({ request }) => {
    const {searchParams} = new URL(request.url);
    const limit = searchParams.get("limit");
    const page = searchParams.get("page");
    try {
    const data = await pb.collection("announcements").getList(page ? Number(page) : 1,limit ? Number(limit) : 3,{
        sort: "-created",
    });
    return new Response(JSON.stringify(data));
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
            status: 500,
        });
    }
};