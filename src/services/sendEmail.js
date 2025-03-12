const nodemailer = require('nodemailer');
require('dotenv').config(); // Correction: appel de la méthode config()

// Configuration du transporteur
const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
        user: process.env.SMTP_USER || "randy.rajaonson@gmail.com", 
        pass: process.env.SMTP_PASS 
    },
    // Option pour ignorer la vérification du certificat
    tls: {
        rejectUnauthorized: false
    }
});

// Fonction d'envoi d'email
const sendEmail = async (emailData) => {
  try {
    // Extraire les données du corps de la requête
    const { to, subject, text, htmlContent } = emailData;
    
    const mailOptions = {
      from: process.env.SMTP_USER || "randy.rajaonson@gmail.com",
      to,
      subject,
      text,
      html: htmlContent
    };
    
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Email envoyé avec succès:', info);
    return info;
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
    throw error;
  }
};

module.exports = sendEmail;