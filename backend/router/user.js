const express = require("express") // Import du framework express
const userCtrl = require("../controllers/user") // Import des controllers depuis le path spécifié

const router = express.Router() // Router est un composant router graçe à la méthode Router()

router.post("/signup", userCtrl.signup) // Route pour ajouter un nouvel utilisateur
router.post("/login", userCtrl.login) // Route pour effectuer la connexion

module.exports = router // Export du module router
