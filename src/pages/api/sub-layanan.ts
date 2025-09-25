import type { APIRoute } from "astro";
import { sendWhatsapp } from "@/lib/sendWhatsapp";
import pb from "@/lib/database";
import { sendTelegram } from "@/lib/sendTelegram";

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
    const formData = await request.formData();
    const file = formData.get("file") as File;
    if (file) {
      formData.append("requester_document", file);
    }
    formData.append("status", "diterima");
  
    try {
      const data = await pb.collection("requests").create(formData);
      const phone = formData.get("requester_phone") as string;

      await sendWhatsapp({ phone: phone, nomor: data.id, perihal: data.mail_about, status: data.status });
      await sendTelegram({ id: data.id, mail_about: data.mail_about, institution: data.requester_institution });

      return new Response(JSON.stringify(data),{status: 200});
    } catch (error) {
      console.log(error);
      return new Response(JSON.stringify({ error: "Failed to create data" }), {status: 500});
    }
  }