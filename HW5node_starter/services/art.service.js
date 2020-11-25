const db = require('../_helpers/database');
const mongoose = require("mongoose");
const Art = db.Art;
const User = db.User;


module.exports = {
    getAllArts,
    addArt,
    deleteArt,
    getEnrolledStudents,
    getPicture,
    getArtistPictures,
    like,
    unlike,
    favorited,
    unfavorited
}


async function getAllArts() {

    return await Art.find().populate({path:'createdBy',select:'username'});
}

async function deleteArt(id) {
     return await Art.deleteOne({"_id":id});
}
async function getPicture(id) {
    console.log("We're in here, the id is "+ id);
    const test = await Art.find({"_id":id});
    console.log("The response is " + test);
    return test;


}


    //const test = await Art.find({"_id":id});
  //  return await Art.updateOne({_id:id}, {$push: {likeTotal: likeTotal +1}}, {$push: {liked: true}});


async function favorited(req) {
    //const test = await Art.find({"_id":id});
    
    return await Art.updateOne({_id:req.body.artID}, {favorited: true});

   


}
async function unfavorited(req) {
    //const test = await Art.find({"_id":id});
    
    return await Art.updateOne({_id:req.body.artID}, {favorited: false});

   


}

async function getArtistPictures(artist) {
    console.log("We're in here, the artist name is "+ artist);
    const test = await Art.find({'artistName':artist});
    console.log("The response is " + test);
    return test;


}

//TODO: notice this new function.
async function getEnrolledStudents(id) {
    const hi =  await User.find({'arts': mongoose.Types.ObjectId(id), role:'Student'}).select('-hash -arts');
   // console.log(hi);
    return hi;
}

async function addArt(req) {

    let art = req.body;
    console.log(art);
    // validate
    
     if(!req.user.sub){
        throw 'Error with the user submitting request. User information missing. Malformed request.';
    }
    //populate missing fields in the art object
    art.createdBy = req.user.sub;
    art.createdDate =  Date.now();

    art = new Art(art);


    // save user
    await art.save();
}
