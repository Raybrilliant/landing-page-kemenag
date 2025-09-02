import type { APIRoute } from "astro";
import pb from "@/lib/database";

export const GET: APIRoute = async ({ request }) => {
    const {searchParams} = new URL(request.url);
    const id = searchParams.get("id");
    try {
    const data = await pb.collection("services").getOne(id as string);
    return new Response(JSON.stringify(data));
    } catch (error) {
        return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
            status: 500,
        });
    }
};

export const POST: APIRoute = async ({ request }) => {
    const waAPI = import.meta.env.WA_API || process.env.WA_API;
    const waUsername = import.meta.env.WA_USERNAME || process.env.WA_USERNAME;
    const waPassword = import.meta.env.WA_PASSWORD || process.env.WA_PASSWORD;
    const formData = await request.formData();
    const file = formData.get("file") as File;
    if (file) {
      formData.append("requester_document", file);
    }
    formData.append("status", "pending");
  
    try {
      const data = await pb.collection("requests").create(formData);
      const rawPhone = formData.get("requester_phone") as string;
      let waNumber = rawPhone.replace(/\s+/g, "").replace(/^\+/, "");
      if (waNumber.startsWith("0")) {
        waNumber = "62" + waNumber.slice(1);
      }
      if (!waNumber.endsWith("@s.whatsapp.net")) {
        waNumber = waNumber + "@s.whatsapp.net";
      }
      const auth = Buffer.from(`${waUsername}:${waPassword}`).toString("base64");
  
  
      const waResponse = await fetch(`${waAPI}/send/message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Basic ${auth}`,
        },
        body: JSON.stringify({
          phone: waNumber,
          message: `Permohonan sudah diterima dengan nomor ${data.id} , kami akan segera memproses permohonan anda.`,
        }),
      });
      await waResponse.json();
  
      return new Response(
        JSON.stringify(data),
        { status: 200 }
      );
    } catch (error) {
      return new Response(JSON.stringify({ error: "Failed to fetch data" }), {
        status: 500,
      });
    }
  };  