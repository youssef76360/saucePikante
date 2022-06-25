const mongoose = require('mongoose'); // récupération du package mongoose pour facilité les échanges avec la Base de données
const uniqueValidator = require('mongoose-unique-validator'); // récupération du package uniqueValidator

const userSchema = mongoose.Schema({
    email: { type : String, required: [true, "Veuillez renseigner votre adresse email"], unique: true, match: [/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, "Veuillez renseigner une adresse mail correcte"] },
    password: { type : String, required: [true, "Veuillez choisir votre mot de passe"] },
});

userSchema.plugin(uniqueValidator);


module.exports = mongoose.model('User', userSchema);