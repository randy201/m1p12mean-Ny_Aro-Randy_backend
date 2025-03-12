var express = require("express");
var emailService = require("../src/services/sendEmail");

var router = express.Router();

router.post("/", async function(req, res, next) {
    try {
        // Vérifier si les données nécessaires sont présentes
        if (!req.body.to) {
            return res.status(400).send("Adresse email du destinataire manquante");
        }
        
        // Créer le contenu HTML si non fourni
        if (!req.body.htmlContent) {
            req.body.htmlContent = `
                <h1>${req.body.subject || "Notification"}</h1>
                <p>${req.body.text || "Message sans contenu"}</p>
                <p>Envoyé le: ${new Date().toLocaleString()}</p>
            `;
        }
        
        await emailService(req.body);
        return res.status(200).send("Email envoyé avec succès");
    } catch (err) {
        console.error('Échec de l\'envoi:', err);
        return res.status(500).send("Erreur lors de l'envoi de l'email");
    }
});

module.exports = router;