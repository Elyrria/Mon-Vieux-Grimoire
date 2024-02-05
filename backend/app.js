const express = require("express")
const mongoose = require("mongoose")
const Book = require("./models/book")

const app = express()

mongoose
    .connect(
        "mongodb+srv://Henri:PdYfyDDy4wYLLtbq@cluster0.ilitkr1.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => {
        console.log("Connexion à la base de données MongoDB réussie ✅💪")
    })
    .catch(() => {
        console.log("Connexion à la base de données MongoDB échouée 😩")
    })
// Permet de récupérer dans la réquète (req) le body au format JSON et de l'envoyer comme réponse (res)
app.use(express.json())

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*") // Permet d'accèder à l'API depuis n'importe quelle origine
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    ) // Permet d'ajouter tous les headers mentionnés aux requêtes vers l'API
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    ) // Permet d'envoyer des rêquetes avec les méthodes mentionnées
    next()
})

app.post("/api/books", (req, res, next) => {
    const book = new Book({ ...req.body })
    book.save()
        .then(() => {
            res.status(201).json({ message: "Objet créé !", objet: req.body })
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
})

app.get("/api/books", (req, res, next) => {
    Book.find()
        .then((book) => {
            res.status(200).json(book)
        })
        .catch((error) => {
            res.status(400).json({ error })
        })
})

app.get("/api/books/:id", (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then((book) => {
            res.status(200).json(book)
        })
        .catch((error) => {
            res.status(404).json({ error })
        })
})

module.exports = app
