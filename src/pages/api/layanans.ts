import type { APIRoute } from "astro";
import pb from "@/lib/database";

export const GET: APIRoute = async ({ request }) => {
    const {searchParams} = new URL(request.url);
    const categoryid = searchParams.get("categoryId");
    try {
    const data = await pb.collection("services").getFullList({
        expand: "category",
        filter: categoryid ? `category = '${categoryid}'` : undefined,
    });
    return new Response(JSON.stringify(data));
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
            status: 500,
        });
    }
};