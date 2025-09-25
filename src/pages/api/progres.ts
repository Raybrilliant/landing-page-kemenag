import type { APIRoute } from "astro";
import pb from "@/lib/database";

export const POST: APIRoute = async ({ request }) => {
    const formData = await request.formData();
    const id = formData.get("id");
    try {
    const data = await pb.collection("requests").getOne(id as string);
    return new Response(JSON.stringify(data));
    } catch (error) {
        return new Response(JSON.stringify({ error: String(error) }), {
            status: 500,
        });
    }
};