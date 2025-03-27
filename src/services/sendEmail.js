const nodemailer = require("nodemailer");
require("dotenv").config();

// Vérification des variables d'environnement requises
if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
  throw new Error(
    "Configuration SMTP manquante. Veuillez définir SMTP_USER et SMTP_PASS dans le fichier .env"
  );
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  // Configuration sécurisée pour TLS
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify(function (error, success) {
  if (error) {
    console.error("Erreur de configuration SMTP:", error);
  } else {
    console.log("Serveur SMTP prêt à envoyer des emails");
  }
});

const sendEmail = async (emailData) => {
  try {
    const { to, subject, text, htmlContent } = emailData;

    const mailOptions = {
      from: process.env.SMTP_USER,
      to,
      subject,
      text,
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email envoyé avec succès:", info.messageId);
    return info;
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email:", error);
    throw error;
  }
};

module.exports = sendEmail;
