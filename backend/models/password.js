const passwordValidator = require('password-validator'); //

const passwordSchema = new passwordValidator();

// Modèle du mot de passe
passwordSchema
.is().min(8)                                                    // Longueur minimun : 8
.is().max(30)                                                   // Longueur maximum : 30
.has().uppercase()                                              // Doit avoir au moins une majuscule
.has().lowercase()                                              // Doit avoir au moins une minuscule
.has().digits()                                                 // Doit avoir au moins un chiffre
.has().not().spaces()                                           // Ne doit pas avoir d'espaces
.is().not().oneOf(["=", "'", "\"", "SELECT", "*", "accounts"]); // Caractères ou formules interdites, 

module.exports = passwordSchema;