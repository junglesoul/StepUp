export default async function handler(req, res) {
  // Handle preflight requests (CORS)
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { to, subject, text, html } = req.body;

    const data = {
      from: { email: "info@stepuptherave.club", name: "Step Up Crew" },
      to: to || [{ email: "junglesoul.c@gmail.com" }],
      subject: subject || "🔥 Test email from Step Up Crew",
      text: text || "Hola! Esto es un test de MailerSend desde Vercel ✅",
      html: html || "<h1 style='color:cyan'>Step Up Crew</h1><p>Correo de prueba ✅</p>"
    };

    const response = await fetch("https://api.mailersend.com/v1/email", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.MAILERSEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    res.setHeader("Access-Control-Allow-Origin", "*"); // allow frontend calls
    res.status(200).json(result);

  } catch (error) {
    console.error("MailerSend error:", error);
    res.setHeader("Access-Control-Allow-Origin", "*"); 
    res.status(500).json({ error: error.message });
  }
}
