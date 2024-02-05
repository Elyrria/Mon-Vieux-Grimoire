const mongoose = require("mongoose") // Import du paquet mongoose

const uniqueValidator = require("mongoose-unique-validator") // Import du plugin mongoose unique validator

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
})
userSchema.plugin(uniqueValidator) //Branchement du plugin mongoose unique validator au schema "userSchema"

module.exports = mongoose.model("User", userSchema) // Export du schéma User
