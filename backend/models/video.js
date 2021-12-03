const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const videoSchema = new Schema({
    channelId: { type: String, required: true },
    channelTitle: { type: String, required: true },
    title: { type: String, required: true },
    videoId: { type: String, required: true },
    views: { type: Number, required: true },
    thumbnail: { type: String, required: true },
});


module.exports = mongoose.model('Video', videoSchema);