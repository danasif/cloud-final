const db = require('../_helpers/database');
const mongoose = require("mongoose");
const Course = db.Course;
const User = db.User;


module.exports = {
    getAllCourses,
    addCourse,
    deleteCourse,
    getEnrolledStudents,
    getPicture,
    getArtistPictures
}


async function getAllCourses() {

    return await Course.find().populate({path:'createdBy',select:'username'});
}

async function deleteCourse(id) {
     return await Course.deleteOne({"_id":id});
}
async function getPicture(id) {
    console.log("We're in here, the id is "+ id);
    const test = await Course.find({"_id":id});
    console.log("The response is " + test);
    return test;


}
async function getArtistPictures(artist) {
    console.log("We're in here, the artist name is "+ artist);
    const test = await Course.find({'artistName':mongoose.Types.ObjectId(artist)});
    console.log("The response is " + test);
    return test;


}

//TODO: notice this new function.
async function getEnrolledStudents(id) {
    const hi =  await User.find({'courses': mongoose.Types.ObjectId(id), role:'Student'}).select('-hash -courses');
   // console.log(hi);
    return hi;
}

async function addCourse(req) {

    let course = req.body;
    console.log(course);
    // validate
    
     if(!req.user.sub){
        throw 'Error with the user submitting request. User information missing. Malformed request.';
    }
    //populate missing fields in the course object
    course.createdBy = req.user.sub;
    course.createdDate =  Date.now();

    course = new Course(course);


    // save user
    await course.save();
}
