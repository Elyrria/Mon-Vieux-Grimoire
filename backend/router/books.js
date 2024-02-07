const express = require("express") // Import du framework Express
const bookCtrl = require("../controllers/books") // Import des contrôleurs depuis le path spécifié
const auth = require("../middlewares/auth") // Import du module auth depuis le path spécifié
const multer = require("../middlewares/multer-config") // Import du module multer depuis le path spécifié

const router = express.Router()

//! Authentification requise
router.post(
    "/",
    auth,
    multer.upload.single("image"),
    multer.processImage,
    bookCtrl.createBook
) // Route pour créer un livre
//! Authentification requise
router.put(
    "/:id",
    auth,
    multer.upload.single("image"),
    multer.processImage,
    bookCtrl.modifyOneBook
) // Route qui permet de modifier un livre
//! Authentification requise
router.delete("/:id", auth, bookCtrl.deleteOneBook) // Route qui permet de supprimer un livre
//! Authentification requise
router.post("/api/books/:id/rating", auth, bookCtrl.createRating) // Route qui permet d'ajouter une note à un livre
router.get("/", bookCtrl.getAllBooks) // Route pour récupérer tous les livres
router.get("/:id", bookCtrl.getOneBook) // Route pour récupérer un seul livre grâce à son id
router.get("/bestrating", bookCtrl.getBestRating) // Route qui permet de récupérer les 3 livres ayant la meilleure moyenne

module.exports = router

