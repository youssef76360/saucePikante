const bcrypt = require('bcrypt');// On utilise bcrypt pour hasher le mot de passe des utilisateurs

const User = require('../models/user');// On récupère notre modele User

const jwt = require('jsonwebtoken');// On utilise jsonwebtoken pour sécuriser la connection grâce à des tokens uniques

exports.signup = (req, res, next) => {//on crée notre nouvel utilisateur
    bcrypt.hash(req.body.password, 10)//on hash le mot de passe avec bcrypt, 10 est le nombre de tour qu'on fait faire à l'algorithme
        .then(hash =>{
            const user = new User({//création de l'utilisateur grâce à notre modèle
                email: req.body.email,//on passe l'email présent dans la requête
                password: hash//et le mot de passe encodé par bcrypt
            });
            user.save()//on enregistre l'utilisateur dans la base de données
            .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
            .catch(error => res.status(400).json({ error }));
        })
        .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })//on retrouve l'utilisateur dans la base de données
      .then(user => {
        if(!user){//si on ne le trouve pas on retourne une erreur
            return res.status(401).json({ error : 'Utilisateur non trouvé ! '})
        }
        bcrypt.compare(req.body.password, user.password)//le mot de passe renseigné et celui hashé à l'inscription sont comparés
            .then(valid => {
                if(!valid){//si la comparaison n'est pas bonne on renvoi une erreur
                    return res.status(401).json({ error : 'Mot de passe invalide ! '})
                }
                return res.status(200).json({// si c'est ok on lui retourne son userId et un token
                    userId: user._id,
                    token: jwt.sign(// on encode un nouveau token
                        { userId: user._id},// on encode l'userId
                        'RANDOM_TOKEN_SECRET',// chaine secrète de developpement temporaire pour encoder notre token
                        { expiresIn: '24h' } // qui expire dans 24h
                        )
                });
            })
            .catch(error => res.status(500).json({ error }));
    })
      .catch(error => res.status(500).json({ error }));
};