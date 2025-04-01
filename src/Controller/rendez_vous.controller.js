const Rendez_vousRepository = require("../Repository/rendez_vous.repository");
const { sendEmailDirect } = require("./email.controller");

async function getAllRendez_vous(req, res, next) {
  try {
    const data = await Rendez_vousRepository.getAllRendez_vous();
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

async function addRendez_vous(req, res, next) {
  try {
    const data = await Rendez_vousRepository.saveRendez_vous(req.body);
    if (data) {
      await sendEmailDirect({
        companyLogo: true,
        companyName: "Mecanet",
        to: "nyarodina@gmail.com",
        subject: "Demande de rendez-vous",
        recipientName: "Ny Aro Dina",
        senderName: data.info.fullname,
        senderTitle: "Client",
        text: `Demande de rendez-vous du ${data.date.toLocaleString("fr-FR", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })}  à Andoharanofotsy Madagascar`,
        companyAddress: "Andoharanofotsy Antananarivo",
        companyWebsite: "https://m1p12mean-ny-aro-randy.vercel.app/",
      });
    }
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

async function getAllRendez_vousByStatus(req, res, next) {
  try {
    const data = await Rendez_vousRepository.getAllRendez_vousByStatus(
      req.params.status
    );
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

async function getRendez_vous(req, res, next) {
  try {
    const data = await Rendez_vousRepository.getRendez_vous(req.params.id);
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

async function updateRendez_vous(req, res, next) {
  try {
    const data = await Rendez_vousRepository.updateRendez_vous(
      req.params.id,
      req.body
    );

    if (!data) {
      return res.status(404).send("Rendez-vous non trouvé");
    }
    if (data.status === "confirmed") {
      await sendEmailDirect({
        companyLogo: true,
        companyName: "Mecanet",
        to: data.info.email,
        subject: "Confirmation de votre rendez-vous",
        recipientName: data.info.fullname,
        senderName: data.manager.lastname + " " + data.manager.firstname,
        senderTitle: "Manager",
        contactPhone: data.manager.email,
        appointmentDetails: {
          date: data.date.toLocaleString(),
          time: data.date.toLocaleTimeString(),
          location: "Andoharanofotsy Madagascar",
        },
        text: `Je vous confirme par ce présent mail votre rendez vous du ${data.date.toLocaleString(
          "fr-FR",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          }
        )}  à Andoharanofotsy Madagascar`,
        companyAddress: "Andoharanofotsy Antananarivo",
        companyWebsite: "https://m1p12mean-ny-aro-randy.vercel.app/",
      });
    } else if (data.status === "cancelled") {
      await sendEmailDirect({
        //companyLogo: true,
        companyName: "Mecanet",
        to: data.info.email,
        subject: "Annulation de votre rendez-vous",
        recipientName: data.info.fullname,
        senderName: data.manager.lastname + " " + data.manager.firstname,
        senderTitle: "Manager",
        contactPhone: data.manager.email,
        text: `Nous vous prions de nous excuser, mais nous regrettons de vous informer que nous ne sommes pas en mesure de valider votre demande de rendez-vous.`,
        companyAddress: "Andoharanofotsy Antananarivo",
        companyWebsite: "https://m1p12mean-ny-aro-randy.vercel.app/",
      });
    }
    res.status(200).send(data);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
}

module.exports = {
  getAllRendez_vous,
  addRendez_vous,
  getAllRendez_vousByStatus,
  updateRendez_vous,
  getRendez_vous,
};
