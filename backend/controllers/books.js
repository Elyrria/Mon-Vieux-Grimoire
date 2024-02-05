const Book = require("../models/Book") // Import du schéma Book depuis le chemin spécifié

// Middleware pour la création d'un livre
exports.createBook = (req, res, next) => {
    const book = new Book({ ...req.body })
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
    //! Implémenter la logique de modification ici
    // Méthode updateOne()
}

// Middleware pour supprimer un livre avec son :id passé en paramètre de la requête
exports.deleteOneBook = (req, res, next) => {
    //! Implémenter la logique de suppression ici
    // Méthode deleteOne()
}

// Middleware pour l'attribution d'une note
exports.createRating = (req, res, next) => {
    //! Implémenter la logique d'attribution de note ici
    // Méthode save()
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
