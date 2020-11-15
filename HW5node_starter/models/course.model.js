const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//https://mongoosejs.com/docs/populate.html#populate_an_existing_mongoose_document

const schema = new Schema({
   /* courseNumber: { type: Number, required: true },
    courseDept: { type: String, required: true },
    courseDescription: { type: String, required: true, default:"No description set" },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    createdDate: { type: Date, default: Date.now },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, default: Date.now },
    latitude: {type: Number, default: 37.2296},
    longitude: {type: Number, default: 80.4139},
    location: {type: String, default: "Blacksburg"}*/
    pieceName :{type: String, required: true},
    // image stuff
    tags: [{type: String, remquuired: true}],
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    artistName : {type: String, required: false},
    favorited: {type: Boolean, required: false},
    medium : {type: String, required: true},
    pieceInfo: {type: String, required: true},
    dateCreated: { type: Date, default: Date.now },
    imageLink: {type: String, required: true},

});

schema.index({courseNumber:1, courseDeptCode:1}, { unique: false });

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Course', schema);
