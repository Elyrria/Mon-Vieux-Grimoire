const express = require("express")

const app = express()

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*")
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    )
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, PATCH, OPTIONS"
    )
    next()
})

app.get((req, res, next) => {
    const books = [
        {
            userId: "ocsrivgtvhdy",
            title: "Super livre de la mort qui tue",
            author: "Quentin DUMON",
            imageUrl:
                "https://cdn.pixabay.com/photo/2016/04/09/18/21/photo-book-1318702_1280.png",
            year: 2024,
            genre: "Policier",
            ratings: [
                {
                    userId: "vdthyj1184",
                    grade: 5,
                },
            ],
            averageRating: 5,
        },
        {
            userId: "vhdyfgv",
            title: "Super livre de la mort qui tue",
            author: "Quentin DUMON",
            imageUrl:
                "https://cdn.pixabay.com/photo/2016/04/09/18/21/photo-book-1318702_1280.png",
            year: 2024,
            genre: "Thriller",
            ratings: [
                {
                    userId: "vdthyj1184",
                    grade: 4,
                },
            ],
            averageRating: 4,
        },
    ]
    res.status(200).json(books)
})

module.exports = app
