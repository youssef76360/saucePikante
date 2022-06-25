const express = require('express');
const router = express.Router();

const saucesCtrl = require('../controllers/sauces'); // on répurère la logique métier pour la rattacher à nos routes
const auth = require('../middleware/auth'); // on récupère la configuration pour l'authentification
const multer = require('../middleware/multer-config'); // on récupère notre configuration pour la gestion des images

// on rajoute le middleware auth sur les routes qu'on veux protéger par l'authentification

router.post('/', auth, multer, saucesCtrl.createSauce); 
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, saucesCtrl.deleteSauce);
router.get('/', auth, saucesCtrl.getAllSauces);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.post('/:id/like', auth, saucesCtrl.likeSauce);

module.exports = router;