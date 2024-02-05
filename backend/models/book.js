const mongoose = require("mongoose") // Import du paquet mongoose
const uniqueValidator = require("mongoose-unique-validator") // Import du plugin mongoose unique validator

const bookSchema = mongoose.Schema({
    title: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    imageUrl: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    // Pas de propriété "required" car ce n'est pas nécessaire dans ce schéma avec la méthode POST
    ratings: [],
    averageRating: { type: Number },
})
bookSchema.plugin(uniqueValidator) //Branchement du plugin mongoose unique validator au schema "bookSchema"

module.exports = mongoose.model("Book", bookSchema) // Export du schéma Book 
