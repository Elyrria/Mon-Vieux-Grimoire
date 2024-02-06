const http = require("http") // Import du module Node.js
const app = require("./app") // Import de l'application via le chemin spécifié en argument de require

// Fonction qui permet de vérifier si le port est bien un nombre
const normalizePort = (val) => {
    const port = parseInt(val, 10) // Convertit val en un nombre

    if (isNaN(port)) {
        return val // Si port n'est pas un nombre, retourne val (générera une erreur)
    }
    if (port >= 0) {
        return port // Si port est supérieur ou égal à 0, retourne port
    }
    return false // Si aucune condition n'est remplie, retourne une erreur
}

const port = normalizePort(process.env.PORT || "4000") // Appel de la fonction pour normaliser le port et le stocker dans la variable port
app.set("port", port) // Configuration du port dans l'application

const errorHandler = (error) => {
    if (error.syscall !== "listen") {
        throw error // Gestion d'erreur dans le haut de la pile
    }
    const address = server.address() // Récupération de l'adresse du serveur et stockage dans la constante address
    const bind =
        typeof address === "string" ? `pipe ${address}` : `port ${port}` // Création d'une chaîne d'information pour la gestion d'erreur
    switch (error.code) {
        case "EACCES":
            console.error(`${bind} requires elevated privileges`)
            process.exit(1) // Terminer le processus en indiquant une erreur (1) => (0) aurait été une réussite
            break
        case "EADDRINUSE":
            console.error(`${bind} is already in use`)
            process.exit(1)
            break
        default:
            throw error
    }
}

const server = http.createServer(app) // Création du serveur et on lui passe l'app en argument

server.on("error", errorHandler) // Au démarrage du serveur, gestion de l'erreur s'il y en a
server.on("listening", () => {
    const portEmot = {
        0: "0️⃣",
        1: "1️⃣",
        2: "2️⃣",
        3: "3️⃣",
        4: "4️⃣",
        5: "5️⃣",
        6: "6️⃣",
        7: "7️⃣",
        8: "8️⃣",
        9: "9️⃣",
    }
    // Permet de modifier le numéro du port en plusieurs émoticônes
    const portSplit = port
        .toString()
        .split("")
        .map((digit) => portEmot[digit])
        .join("  ")

    const address = server.address() // Récupération de l'adresse du serveur et stockage dans la constante address
    const bind =
        typeof address === "string" ? `pipe ${address}` : `port ${portSplit}`
    console.log("Server start 🛫")
    console.log(`Listening 👂 on ${bind}`) // À l'écoute du serveur, permet d'afficher dans la console l'adresse du serveur
})

server.listen(port) // Serveur écoute sur le port 3000 ou sur l'environnement passé par le serveur de production
