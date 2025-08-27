export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const data = {
    from: { email: "junglistcl@gmail.com", name: "Step Up Crew" },
    to: [
      { email: "junglesoul.c@gmail.com" },
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
        "Authorization": `Bearer ${process.env.mlsn.2cd2938ae2f66f405d4163f3c17cb97485f3f1cf7c972dffabbc223ef60ad132}`,
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
