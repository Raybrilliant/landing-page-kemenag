export async function sendWhatsapp({
    phone,
    nomor,
    perihal,
    status,
  }: {
    phone: string;
    nomor: string;
    perihal: string;
    status: string;
  }) {
    const apiUrl = import.meta.env.WA_API || process.env.WA_API;
    const username = import.meta.env.WA_USERNAME || process.env.WA_USERNAME;
    const password = import.meta.env.WA_PASSWORD || process.env.WA_PASSWORD;
    const siteUrl = import.meta.env.SITE_URL || process.env.SITE_URL;
  
    // format nomor
    let waNumber = phone.replace(/\s+/g, "").replace(/^\+/, "");
    if (waNumber.startsWith("0")) waNumber = "62" + waNumber.slice(1);
    if (!waNumber.endsWith("@s.whatsapp.net")) waNumber += "@s.whatsapp.net";
  
    // pesan WA
    const message = `
  *📢 Layanan PTSP Kemenag Kota Probolinggo*
  
  *Surat anda* 
  ✉️ Nomor : ${nomor}
  ✉️ Perihal : ${perihal}
  ✉️ Status : ${status}
  
  _Untuk memantau progress layanan, bisa mengunjungi tautan dibawah ini:_
  ${siteUrl}/progres
    `;
  
    // basic auth
    const auth = Buffer.from(`${username}:${password}`).toString("base64");
  
    const res = await fetch(`${apiUrl}/send/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${auth}`,
      },
      body: JSON.stringify({ phone: waNumber, message:message }),
    });

    const data = await res.json();
    if (!res.ok) throw new Error(`WA API error: ${JSON.stringify(data)}`);
    
    return data;
  }  