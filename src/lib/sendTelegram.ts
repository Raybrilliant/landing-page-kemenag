export async function sendTelegram(mail: {id: string, mail_about: string, institution: string}) {
    const token = import.meta.env.TELEGRAM_BOT_TOKEN || process.env.TELEGRAM_BOT_TOKEN!;
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const message = `
    *📢 Layanan PTSP Kemenag Kota Probolinggo*

    *Surat Masuk* 
    ✉️ Nomor : ${mail.id}
    ✉️ Lembaga : ${mail.institution}
    ✉️ Perihal : ${mail.mail_about}
    `;
  
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: '-1003154739817',
        text: message,
        parse_mode: "Markdown" // optional: Markdown or HTML
      }),
    });
  
    const data = await res.json();
    if (!res.ok) throw new Error(`Telegram error: ${JSON.stringify(data)}`);
    return data;
  }
  