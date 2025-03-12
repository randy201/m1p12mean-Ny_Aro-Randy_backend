const nodemailer = require('nodemailer');
require('dotenv').config(); // Nécessite le package dotenv pour charger les variables d'environnement

// Configuration du transporteur
const transporter = nodemailer.createTransport({
    service:"gmail",
    secure:true,
    auth: {
        user: "randy.rajaonson@gmail.com",     // Utilise la variable d'environnement pour l'utilisateur
        pass: "mznv fkue ayjz ubyu"      // Utilise la variable d'environnement pour le mot de passe
    },
    // Ajouter cette option pour ignorer la vérification du certificat
    tls: {
        rejectUnauthorized: false
    }
});

// Fonction d'envoi d'email
const sendEmail = async (to, subject, text, htmlContent) => {
  try {
    const mailOptions = {
      from: "randy.rajaonson@gmail.com", // Utilise une variable d'environnement pour l'email de l'expéditeur
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

// Utilisation
const main = async () => {
  try {
    const htmlContent = `
      <h1>Email de test de SMTP</h1>
      <p>Ceci est un test de configuration SMTP2GO</p>
      <p>Envoyé le: ${new Date().toLocaleString()}</p>
    `;
    
    await sendEmail(
      'nyarodina@gmail.com', // Remplace par l'adresse de ton choix
      'Email de test de SMTP',
      'Ceci est un essaie de SMTP',
      htmlContent
    );
  } catch (err) {
    console.error('Échec de l\'envoi:', err);
  }
};

main();
