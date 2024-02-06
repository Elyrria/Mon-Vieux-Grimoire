const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1] // Récupération du token en splitant le header pour récupérer la deuxième string contenu dans le tableau nouvellement créé créé ["Bearer", "Token"]
        const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET) // Décodage du token avec la fonction verify() de json-web-token
        const userId = decodedToken.userId
        // Ajout à la requète dans l'objet auth une propriété avec le userId récupéré dans le token décodé
        req.auth = {
            userId: userId,
        }
        next() // Evite l'expiration de la requête
    } catch (error) {
        res.status(401).json({ error })
    }
}
