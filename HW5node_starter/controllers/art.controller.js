const artService = require('../services/art.service')

module.exports = {
    createArt,
    createArt2,
    getArts,
    deleteArt,
    getEnrolledStudents,
    getPicture,
    getArtistPictures,
    likeArt,
    unlikeArt,
    favoriteArt,
    unfavoriteArt
};


function createArt(req, res, next) {

    artService.addArt(req)
        .then((message) => res.json(message))
        .catch(err => next(err));

}
function createArt2(req, res, next) {

    console.log("hi");
    artService.addArt(req)
        .then((message) => res.json(message))
        .catch(err => next(err));

}
function likeArt(req, res, next) {

    artService.like(req.params.id)
        .then((message) => res.json(message))
        .catch(err => next(err));

}
function unlikeArt(req, res, next) {

    artService.unlike(req.params.id)
        .then((message) => res.json(message))
        .catch(err => next(err));

}
function favoriteArt(req, res, next) {
    //console.log("HIIIIIIII");
   // console.log("We're in here, the id is "+req.body.artid);
    //req.user.sub
   artService.favorited(req)
        .then((message) => res.json(message))
        .catch(err => next(err));

}
function unfavoriteArt(req, res, next) {

    artService.unfavorited(req.params.id)
        .then((message) => res.json(message))
        .catch(err => next(err));

}
function getPicture(req,res,next){
    console.log('THe params are ',req.params);
    artService.getPicture(req.params.id).then(arts => {console.log('# of Arts sent:', arts.length);
        res.json(arts)}).catch(err => next(err));
}
function getArtistPictures(req,res,next){
    console.log('THe params are ',req.params);
    artService.getArtistPictures(req.params.artist).then(arts => {console.log('# of Arts sent:', arts.length);
        res.json(arts)}).catch(err => next(err));
}
function getArts(req,res,next){
    console.log('GetArts()',req.body);
    artService.getAllArts(req).then(arts => {console.log('# of Arts sent:', arts.length);
        res.json(arts)}).catch(err => next(err));
}


//TODO: notice this new function.
function getEnrolledStudents(req,res,next){

    artService.getEnrolledStudents(req.params.id).then(students => {console.log('# of Students sent:', students.length);
        res.json(students)}).catch(err => next(err));
}

function deleteArt(req,res,next){
    console.log('DeleteArt()',req.params);
    artService.deleteArt(req.params.id).then(arts => {console.log('# of Arts sent:', arts.length);
        res.json(arts)}).catch(err => next(err));
}
