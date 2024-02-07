const multer = require("multer")
const sharp = require("sharp")

const storage = multer.memoryStorage()

const upload = multer({
    storage: storage,
    fileFilter: (req, file, callback) => {
        // Vérifier si le fichier est une image
        if (file.mimetype.startsWith("image/")) {
            callback(null, true)
        } else {
            callback(new Error("Le fichier téléchargé n'est pas une image."))
        }
    },
})

// Middleware pour traiter l'image téléchargée et la convertir en .webp
async function processImage(req, res, next) {
    if (!req.file) {
        return res.status(400).json({ message: "Aucune image sélectionnée." })
    }

    const { buffer, originalname } = req.file // Destructuration pour récupérer deux variables : buffer et originalname récupéraient depuis l'objet req.file

    const name = originalname
        .split(" ")
        .join("_")
        .replace(/\.(png|jpg|jpeg)/g, "") // Utilisation d'une expression régulière qui supprimera les occurrences spécifiées
    const timestamp = new Date().toISOString()
    const ref = `${name}_${timestamp}.webp`

    try {
        const webpImage = await sharp(buffer).webp().toBuffer() // Convertir l'image en format WebP
        await sharp(webpImage).toFile(__dirname + `/../images/${ref}`) // Enregistrer l'image convertie sur le disque local

        req.file.buffer = webpImage // Remplacer les données de l'image avec celles converties en .webp
        req.file.filename = ref // Modification du nom de fichier avec celui créé et enregistré dans ref

        next()
    } catch (error) {
        console.error(
            "Erreur lors de la conversion de l'image en .webp :",
            error
        )
        res.status(500).json({ error })
    }
}

module.exports = { upload, processImage }
