var emailService = require("../services/sendEmail");
const path = require("path");
const fs = require("fs");

async function sendEmail(req, res, next) {
  try {
    if (!req.body.to) {
      return res
        .status(400)
        .json({ message: "Adresse email du destinataire manquante" });
    }
    if (!req.body.subject) {
      return res.status(400).json({ message: "Sujet de l'email manquant" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(req.body.to)) {
      return res.status(400).json({ message: "Format d'email invalide" });
    }

    const maxContentLength = 9321002;
    if (req.body.text && req.body.text.length > maxContentLength) {
      return res.status(400).json({ message: "Contenu texte trop long" });
    }

    await processAndSendEmail(req.body);
    res.status(200).json({ message: "Email envoyé avec succès" });
  } catch (err) {
    console.error("Échec de l'envoi:", err);
    res.status(500).json({
      message: "Erreur lors de l'envoi de l'email",
      error: err.message,
    });
  }
}

async function sendEmailDirect(emailData) {
  try {
    if (!emailData.to) {
      throw new Error("Adresse email du destinataire manquante");
    }
    if (!emailData.subject) {
      throw new Error("Sujet de l'email manquant");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailData.to)) {
      throw new Error("Format d'email invalide");
    }

    const maxContentLength = 9321002;
    if (emailData.text && emailData.text.length > maxContentLength) {
      throw new Error("Contenu texte trop long");
    }

    return await processAndSendEmail(emailData);
  } catch (err) {
    console.error("Échec de l'envoi direct:", err);
    throw err;
  }
}

async function processAndSendEmail(emailData) {
  const imagePath = path.join(__dirname, "../../public/images/engrenages.gif");
  const imageBase64 = fs.readFileSync(imagePath, "base64");
  const imageDataUrl = `data:image/gif;base64,${imageBase64}`;

  if (!emailData.htmlContent) {
    emailData.htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333333;
          max-width: 600px;
          margin: 0 auto;
        }
        .header {
          padding: 20px 0;
          border-bottom: 1px solid #dddddd;
          text-align: center;
        }
        .content {
          padding: 20px 0;
        }
        .subject {
          font-size: 22px;
          font-weight: bold;
          color: #2c3e50;
          margin-bottom: 20px;
        }
        .footer {
          padding: 15px 0;
          border-top: 1px solid #dddddd;
          font-size: 12px;
          color: #777777;
          text-align: center;
        }
        .date {
          font-style: italic;
          color: #666666;
          margin-top: 20px;
        }
        .signature {
          margin-top: 30px;
          font-style: italic;
        }
      </style>
    </head>
    <body>
      <div class="header">
        ${
          emailData.companyLogo
            ? `<img src="${imageDataUrl}" class="logo" alt="Logo">`
            : `<h2>${emailData.companyName || "Notre Entreprise"}</h2>`
        }
      </div>
      
      <div class="content">
        <div class="subject">${emailData.subject}</div>
        
        <p>Bonjour ${emailData.recipientName || "Madame, Monsieur"},</p>
        
        <p>${
          emailData.text ||
          "Nous souhaiterions convenir d'un rendez-vous avec vous pour discuter de nos services. Merci de nous indiquer vos disponibilités."
        }</p>
        
        ${
          emailData.appointmentDetails
            ? `
        <p><strong>Détails du rendez-vous proposé :</strong><br>
           Date : ${emailData.appointmentDetails.date || "À déterminer"}<br>
           Heure : ${emailData.appointmentDetails.time || "À déterminer"}<br>
           Lieu : ${emailData.appointmentDetails.location || "À déterminer"}
        </p>

        <p>Nous restons à votre disposition pour toute information complémentaire.</p>
        `
            : ""
        }
        
        
        
        <div class="signature">
          Cordialement,<br>
          ${emailData.senderName || "L'équipe"}<br>
          ${emailData.senderTitle || ""}<br>
          ${emailData.companyName || "Notre Entreprise"}<br>
          ${emailData.contactPhone || ""}
        </div>
        
        <p class="date">Envoyé le : ${new Date().toLocaleString("fr-FR", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        })}</p>
      </div>
      
      <div class="footer">
        <p>Ce message est confidentiel et destiné uniquement au destinataire mentionné ci-dessus.</p>
        <p>${emailData.companyAddress || ""} ${
      emailData.companyPhone ? "| Tél : " + emailData.companyPhone : ""
    }</p>
        ${
          emailData.companyWebsite
            ? `<p><a href="${emailData.companyWebsite}">${emailData.companyWebsite}</a></p>`
            : ""
        }
      </div>
    </body>
    </html>
  `;
  }

  if (
    emailData.htmlContent &&
    emailData.htmlContent.length > 9321002 // maxContentLength
  ) {
    throw new Error("Contenu HTML trop long");
  }

  await emailService(emailData);
  return { success: true, message: "Email envoyé avec succès" };
}

module.exports = {
  sendEmail,
  sendEmailDirect,
};
