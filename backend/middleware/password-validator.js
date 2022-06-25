const passwordSchema = require('../models/password'); // on récupère le modèle de mot de passe 

module.exports = (req, res, next) => {
    if (!passwordSchema.validate(req.body.password)) { // si le mot de passe de la demande ne correspond pas au schéma demandé
        res.writeHead(400, '{"message": "Votre mot de passe doit comporter au minimum 8 caractères comprenant au moins 1 majuscule, 1 minuscule et un chiffre sans espaces "}', {
            'content-type': 'application/json'
        });
        res.end('Format de mot de passe incorrect');
    } else {
        next(); 
    }
};