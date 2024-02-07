const mongoose = require("mongoose") // Import du paquet mongoose
const uniqueValidator = require("mongoose-unique-validator") // Import du plugin mongoose unique validator

const bookSchema = mongoose.Schema({
    userId: {type:String, required: true},
    title: { type: String, required: true, unique: true }, // Nom du livre doit être unique sinon erreur
    author: { type: String, required: true },
    imageUrl: { type: String, required: true },
    year: { type: Number, required: true },
    genre: { type: String, required: true },
    ratings: [
        {
            userId: { type: String, required: true },
            grade: { type: Number, required: true },
        },
    ],
    averageRating: { type: Number },
})
bookSchema.plugin(uniqueValidator) //Branchement du plugin mongoose unique validator au schema "bookSchema"

module.exports = mongoose.model("Book", bookSchema) // Export du schéma Book
