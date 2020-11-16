var express = require('express');
var router = express.Router();
const courseController = require('../controllers/course.controller');
const Role = require('../_helpers/role');
const authorize = require('../_helpers/authorize');


router.post('/addcourse', authorize(Role.creator), courseController.createCourse);
router.get('/getcourses', courseController.getCourses);
router.delete('/:id',authorize(Role.creator), courseController.deleteCourse);
router.get('/getPicture:id', courseController.getPicture);
router.get('/getArtistPictures:artist', courseController.getArtistPictures);

//TODO: notice this new route.It retrieves all students enrolled in a given course.
router.get('/getstudents:id',authorize(Role.creator), courseController.getEnrolledStudents);


module.exports = router;
