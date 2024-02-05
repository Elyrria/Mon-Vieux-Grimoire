const express = require("express") // Import du framework express
const mongoose = require("mongoose") // Import du paquet mongoose
const Book = require("./models/Book") // Import du schéma Book depuis le chemin spécifié
const bookRoutes = require("./router/books")
const userRoutes = require("./router/books")
const app = express() // Conversion du module app en une application express

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

app.use(express.json()) // Permet de récupérer le corps de la requête (req) au format JSON et de l'envoyer comme réponse (res)

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*") // Permet d'accéder à l'API depuis n'importe quelle origine
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    ) // Permet d'ajouter tous les en-têtes mentionnés aux requêtes vers l'API
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    ) // Permet d'envoyer des requêtes avec les méthodes mentionnées
    next()
})

app.use("/api/auth", userRoutes) //! => Routes utilisateur
app.use("/api/books", bookRoutes)//! => Routes books

module.exports = app // Export du module app
