const jwt = require('jsonwebtoken'); // récupération du Package JsonWebToken

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(' ')[1]; // récupération du token dans le header Authorization ou on retourne le 2ème élément.
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET'); // on décode le token
        const userId = decodedToken.userId;// on extrait l'id utilisateur de notre token
        if (req.body.userId && req.body.userId !== userId) { // on compare l'userId de la requête à celui extrait du token s'ils sont différents nous générons une erreur
            throw 'User ID non valable !'
        }else {
            next(); // si notre utilisateur est authentifié nous pouvons passer l'execution
        }
    } catch (error) {
        res.status(401).json({ error: error | 'Requête non authentifiée ! '});
    }
}