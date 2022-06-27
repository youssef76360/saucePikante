const multer = require('multer'); // on récupère le package multer qui permet de gérer les fichiers entrant dans les requêtes http

const MIME_TYPES = { // dictionnaire pour définir la bonne extension de fichier
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
}

const storage = multer.diskStorage({
    destination: (req, file, callback) => { // on indique qu'il faut enregistrer les fichiers dans le dossier images
        callback(null, 'images')
    },
    filename: (req, file, callback) => {
        const name = file.originalname.split(' ').join('_');// on remplace les espaces par des underscores
        const extension = MIME_TYPES[file.mimetype];// on utilise le dictionnaire qu'on vient de créer pour resoudre l'extension de fichier approprié
        callback(null, name + Date.now() + '.' + extension);
    }
});

module.exports = multer({ storage }).single('image'); // on exporte multer en lui indiquant qu'on gère uniquement les images