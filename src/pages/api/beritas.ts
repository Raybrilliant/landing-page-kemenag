import type { APIRoute } from "astro";
import pb from "@/lib/database";

export const GET: APIRoute = async ({ request }) => {
    const {searchParams} = new URL(request.url);
    const limit = searchParams.get("limit");
    const category = searchParams.get("category");
    try {
    const data = await pb.collection("news").getList(1,limit ? Number(limit) : 4,{
        sort: "-date",
        fields: "id, collectionId, title, slug, date, document",
        filter: category ? `category.name = '${category}'` : undefined,
    });
    return new Response(JSON.stringify(data));
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
            status: 500,
        });
    }
};