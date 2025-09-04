// api/send-email.js
import brevo from '@getbrevo/brevo';

export default async function handler(req, res) {
  // Handle preflight requests (CORS)
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // Set CORS headers for the main request
  res.setHeader("Access-Control-Allow-Origin", "*");

  try {
    const { to, subject, text, html } = req.body;

    // 1. Configure the Brevo API client
    const defaultClient = brevo.ApiClient.instance;
    const apiKeyAuth = defaultClient.authentications['api-key'];
    apiKeyAuth.apiKey = process.env.BREVO_API_KEY;

    // 2. Create a new API instance
    const apiInstance = new brevo.TransactionalEmailsApi();

    // 3. Prepare the email data in Brevo's format
    const sendSmtpEmail = new brevo.SendSmtpEmail();
    sendSmtpEmail.sender = { email: "info@stepuptherave.club", name: "Step Up Crew" };
    sendSmtpEmail.to = to || [{ email: "junglesoul.c@gmail.com" }];
    sendSmtpEmail.subject = subject || "🔥 Test email from Step Up Crew";
    sendSmtpEmail.textContent = text || "Hola! Esto es un test de Brevo desde Vercel ✅";
    sendSmtpEmail.htmlContent = html || "<h1 style='color:cyan'>Step Up Crew</h1><p>Correo de prueba ✅</p>";

    // 4. Send the email using the Brevo SDK
    const data = await apiInstance.sendTransacEmail(sendSmtpEmail);

    // 5. Send success response
    res.status(200).json({ 
      message: 'Email sent successfully', 
      messageId: data.messageId 
    });

  } catch (error) {
    console.error("Brevo API error:", error);
    const errorMessage = error?.response?.body?.message || error.message;
    
    res.status(500).json({ 
      error: "Failed to send email",
      details: errorMessage 
    });
  }
}
