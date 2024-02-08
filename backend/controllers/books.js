const Book = require("../models/Book") // Import du schéma Book depuis le chemin spécifié
const fs = require("fs")
// Middleware pour la création d'un livre
exports.createBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book)
    delete bookObject._id
    delete bookObject.userId
    const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
            req.file.filename
        }`,
    })

    book.save()
        .then(() => {
            res.status(201).json({ message: "Objet créé !", objet: req.body })
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
}

// Middleware pour modifier un livre avec son :id passé en paramètre de la requête
exports.modifyOneBook = (req, res, next) => {
    const bookObject = req.file
        ? {
              // Requête avec fichier
              ...JSON.parse(req.body.book),
              imageUrl: `${req.protocol}://${req.get("host")}/images/${
                  req.file.filename
              }`,
          }
        : { ...req.body } // requête dans fichier

    delete bookObject.userId // Suppression du userId pour des raisons de sécurité

    Book.findOne({ _id: req.params.id })
        .then((book) => {
            // Vérification que l'utilisateur qui essaye de modifier correspond bien à l'utilisateur authentifié
            if (book.userId !== req.auth.userId) {
                return res.status(401).json({
                    message: "Accès refusé",
                })
            } else {
                // Si fichier existant
                if (req.file) {
                    const filepath = // Chemin du fichier à supprimer
                        __dirname +
                        `/../images/${book.imageUrl.split("/images/")[1]}`
                    // On le suppirme avec la méthode unlink de fs
                    fs.unlink(filepath, (error) => {
                        if (error) {
                            console.error(
                                "Erreur lors de la suppression du fichier précédent",
                                error
                            )
                        }
                    })
                }
                // Mise à jour avec les données récupérées de la requête
                Book.updateOne(
                    { _id: req.params.id }, // Le livre à modifier
                    { ...bookObject, _id: req.params.id } // Les données de modification
                )
                    .then(() => {
                        res.status(200).json({ message: "Livre modifié !" })
                    })
                    .catch((error) => {
                        res.status(400).json({ error })
                    })
            }
        })
        .catch((error) => {
            res.status(500).json({ error })
        })
}

// Middleware pour supprimer un livre avec son :id passé en paramètre de la requête
exports.deleteOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (book.userId !== req.auth.userId) {
                return res.status(401).json({
                    message: "Accès refusé",
                })
            } else {
                const fileName = book.imageUrl.split("/images/")[1] // Nom du fichier à supprimer
                // On le suppirme avec la méthode unlink de fs
                fs.unlink(`images/${fileName}`, (error) => {
                    if (error) {
                        console.error(
                            "Erreur lors de la suppression du fichier",
                            error
                        )
                    } else {
                        Book.deleteOne({ _id: req.params.id })
                            .then(() => {
                                res.status(200).json({
                                    message: "Livre supprimé !",
                                })
                            })
                            .catch((error) => {
                                res.status(400).json({ error })
                            })
                    }
                })
            }
        })
        .catch((error) => {
            res.status(500).json({ error })
        })
}

// Middleware pour l'attribution d'une note
exports.createRating = (req, res, next) => {
    delete req.body.userId // Suppression du userId de la requête
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            if (!book) {
                return res.status(404).json({ message: "Livre non trouvé" })
            }
            const alreadyRating = book.ratings.some((rating) => {
                return rating.userId === req.auth.userId
            })
            // Vérification si l'utilisateur a déjà attribué une note
            if (alreadyRating) {
                return res.status(401).json({
                    message: "Une note a déjà été attribuée",
                })
            }

            // On met à jour le livre avec le userId et la note de l'utilisateur
            book.ratings.push({
                userId: req.auth.userId,
                grade: req.body.rating,
            })
            const numberOfRating = book.ratings.length
            const totalOfNotes = book.ratings.reduce(
                (acc, rating) => acc + rating.grade,
                0
            )
            const newAverageRating = (totalOfNotes / numberOfRating).toFixed(2)

            book.averageRating = newAverageRating

            book.save()
                .then((book) => {
                    res.status(201).json(book)
                })
                .catch((error) => {
                    res.status(500).json({ error })
                })
        })
        .catch((error) => {
            res.status(500).json({ error })
        })
}

// Middleware pour la récupération de tous les livres
exports.getAllBooks = (req, res, next) => {
    Book.find()
        .then((books) => {
            res.status(200).json(books)
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
}

// Middleware pour la récupération d'un livre avec son :id passé en paramètre de la requête
exports.getOneBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            res.status(200).json(book)
        })
        .catch((error) => {
            res.status(404).json({ error })
        })
}

// Middleware pour la récupération des trois livres qui ont la meilleure note
exports.getBestRating = (req, res, next) => {
    //! Implémenter la logique de récupération des meilleurs livres ici
}
