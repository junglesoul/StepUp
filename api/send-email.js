export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const data = {
    from: { email: "you@stepuptherave.club", name: "Step Up Crew" },
    to: [
      { email: "friend1@email.com" },
      { email: "friend2@email.com" }
    ],
    subject: "🔥 Test email from Step Up Crew",
    text: "Hola! Esto es un test de MailerSend desde Vercel ✅",
    html: "<h1 style='color:cyan'>Step Up Crew</h1><p>Correo de prueba ✅</p>"
  };

  try {
    const response = await fetch("https://api.mailersend.com/v1/email", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.MAILERSEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
