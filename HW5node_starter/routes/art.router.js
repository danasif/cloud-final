var express = require('express');
var router = express.Router();
const artController = require('../controllers/art.controller');
const Role = require('../_helpers/role');
const authorize = require('../_helpers/authorize');


router.post('/addart', artController.createArt);
router.post('/edit', artController.editArt);

router.post('/like', artController.likeArt);
router.post('/unlike', artController.unlikeArt);
router.post('/favorite', artController.favoriteArt);
router.post('/unfavorite', artController.unfavoriteArt);

router.get('/getarts', artController.getArts);
router.delete('/:id',authorize(Role.creator), artController.deleteArt);
router.get('/getPicture:id', artController.getPicture);
router.get('/getArtistPictures:artist', artController.getArtistPictures);
router.get('/getSearch:word', artController.getSearch);

//TODO: notice this new route.It retrieves all students enrolled in a given art.
router.get('/getstudents:id',authorize(Role.creator), artController.getEnrolledStudents);


module.exports = router;
