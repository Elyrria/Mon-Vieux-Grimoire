const bcrypt = require("bcrypt") // Import du paquet de cryptage
const User = require("../models/User") // Import du schéma User depuis le chemin spécifié
const jwt = require("jsonwebtoken")

// Middleware pour créer un nouvel utilisateur et l'ajouter à la base de données
exports.signup = (req, res, next) => {
    bcrypt
        .hash(req.body.password, 10) // Hachage du mot de passe de la requête (10 tours de boucle)
        .then((hash) => {
            const user = new User({
                email: req.body.email,
                password: hash,
            })

            user.save()
                .then(() => {
                    res.status(201).json({ message: "Utilisateur créé !" })
                })
                .catch((error) => {
                    res.status(400).json({ error })
                })
        })
        .catch((error) => {
            res.status(500).json({ error })
        })
}

// Middleware pour gérer la connexion
exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email }) // Récupération de l'utilisateur dans la base de données
        .then((user) => {
            // Si user n'existe pas alors on renvoie une erreur
            if (!user) {
                res.status(401).json({
                    message: "Paire identifiant/mot de passe inccorrecte !",
                })
                // Sinon on compare avec la méthode compare() de bcrypt le password avec celui du user dans la base de donnée
            } else {
                bcrypt
                    .compare(req.body.password, user.password)
                    // Si pas d'erreur d'exécution on récupère la réponse
                    .then((valid) => {
                        // Si valide est faux alors on renvoie un res 401 avec le message suivant :
                        if (!valid) {
                            res.status(401).json({
                                message:
                                    "Paire identifiant/mot de passe inccorrecte !",
                            })
                            // Si valid est true alors on renvoie les informations utilisateur pour la connextion
                        } else {
                            res.status(200).json({
                                userId: user._id,
                                //Génération d'un token graçe au paquet jwt et sa méthode sign() qui prend trois arguments (1er userId, la clé de décodage, et le délai d'expiration)
                                token: jwt.sign(
                                    { userId: user._id },
                                    "RANDOM_TOKEN_SECRET",
                                    { expiresIn: "2h" }
                                ),
                            })
                        }
                    })
                    .catch((error) => {
                        res.status(500).json({ error })
                    })
            }
        })
        .catch((error) => {
            res.status(500).json({ error })
        })
}
