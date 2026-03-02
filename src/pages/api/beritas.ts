import type { APIRoute } from "astro";
import pb from "@/lib/database";

export const GET: APIRoute = async ({ request }) => {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get("limit");
    const category = searchParams.get("category");

    try {
        // Buat array untuk menampung kondisi filter
        let filterConditions = ["published = true"];
        
        // Hanya tambahkan filter category jika parameternya ada
        if (category) {
            // Gunakan tanda kutip tunggal untuk nilai string di PocketBase
            filterConditions.push(`category.name = "${category}"`);
        }

        // Gabungkan dengan '&&'
        const finalFilter = filterConditions.join(" && ");

        const data = await pb.collection("news").getList(1, limit ? Number(limit) : 4, {
            sort: "-date",
            fields: "id, collectionId, title, slug, date, document",
            filter: finalFilter,
        });

        return new Response(JSON.stringify(data), {
            headers: { "Content-Type": "application/json" }
        });

    } catch (error) {
        console.error("PocketBase Error:", error);
        return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
            status: 500,
        });
    }
};