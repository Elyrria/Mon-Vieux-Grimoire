const mongoose = require("mongoose")

const bookSchema = mongoose.Schema({
    title: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    imageUrl: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    // Pas de propriété required car ce n'est pas nécessaire avec la méthode POST
    ratings: [],
    averageRating: { type: Number },
})

module.exports = mongoose.model("Book", bookSchema)
