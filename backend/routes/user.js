const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user'); // on répurère la logique métier pour la rattacher à nos routes
const passwordValidator = require('../middleware/password-validator'); // on récupère notre password validator pour la création de mot de passe à l'inscription


router.post('/signup', passwordValidator, userCtrl.signup);
router.post('/login', userCtrl.login);

module.exports = router;