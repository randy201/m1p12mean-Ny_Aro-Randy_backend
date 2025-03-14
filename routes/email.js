var express = require("express");
var emailService = require("../src/services/sendEmail");

var router = express.Router();

router.post("/", async function (req, res, next) {
  try {
    // Vérifier si les données nécessaires sont présentes
    if (!req.body.to) {
      return res.status(400).send("Adresse email du destinataire manquante");
    }

    // Créer le contenu HTML si non fourni
    if (!req.body.htmlContent) {
      req.body.htmlContent = `
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
        .logo {
          max-height: 60px;
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
          req.body.companyLogo
            ? `<img src="${req.body.companyLogo}" class="logo" alt="Logo">`
            : `<h2>${req.body.companyName || "Notre Entreprise"}</h2>`
        }
      </div>
      
      <div class="content">
        <div class="subject">${
          req.body.subject || "Demande de rendez-vous"
        }</div>
        
        <p>Bonjour ${req.body.recipientName || "Madame, Monsieur"},</p>
        
        <p>${
          req.body.text ||
          "Nous souhaiterions convenir d'un rendez-vous avec vous pour discuter de nos services. Merci de nous indiquer vos disponibilités."
        }</p>
        
        ${
          req.body.appointmentDetails
            ? `
        <p><strong>Détails du rendez-vous proposé :</strong><br>
           Date : ${req.body.appointmentDetails.date || "À déterminer"}<br>
           Heure : ${req.body.appointmentDetails.time || "À déterminer"}<br>
           Lieu : ${req.body.appointmentDetails.location || "À déterminer"}
        </p>
        `
            : ""
        }
        
        <p>Nous restons à votre disposition pour toute information complémentaire.</p>
        
        <div class="signature">
          Cordialement,<br>
          ${req.body.senderName || "L'équipe"}<br>
          ${req.body.senderTitle || ""}<br>
          ${req.body.companyName || "Notre Entreprise"}<br>
          ${req.body.contactPhone || ""}
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
        <p>${req.body.companyAddress || ""} ${
        req.body.companyPhone ? "| Tél : " + req.body.companyPhone : ""
      }</p>
        ${
          req.body.companyWebsite
            ? `<p><a href="${req.body.companyWebsite}">${req.body.companyWebsite}</a></p>`
            : ""
        }
      </div>
    </body>
    </html>
  `;
    }
    await emailService(req.body);
    return res.status(200).send("Email envoyé avec succès");
  } catch (err) {
    console.error("Échec de l'envoi:", err);
    return res.status(500).send("Erreur lors de l'envoi de l'email");
  }
});

module.exports = router;
