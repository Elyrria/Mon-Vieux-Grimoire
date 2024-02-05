const express = require("express")
const userCtrl = require("../controllers/user")
const router = express.Router()

router.post("/signup", userCtrl.createUser) // Route pour ajouter un nouvel utilisateur
router.post("/login", userCtrl.getUser) // Route pour effectuer la connexion

module.exports = router // Export du module router
