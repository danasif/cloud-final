var express = require('express');
var router = express.Router();
const attendanceController = require('../controllers/attendance.controller');
const Role = require('../_helpers/role');
const authorize = require('../_helpers/authorize');

//TODO: creator creates 'attendance' object for a course.

router.post('/add', authorize(Role.creator), attendanceController.createAttendance);

//TODO: Student uses accessCode to 'attend' course. If on time, the student id is added to the attendance object.
router.post('/track', authorize(Role.user), attendanceController.attend);

// TODO (optional/bonus):creator deletes attendance object for a given course.
//router.delete('/:id',);

// TODO: creator checks attendance objects for a given course.
router.get('/prof:id', authorize(Role.creator), attendanceController.getAttendances);


// TODO: Students check their attendance for a given course. Here 'id' is the course id.
//router.get('/student', );
router.get('/student:id', attendanceController.studentGetAttendances);


module.exports = router;
