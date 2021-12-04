const Video = require('../models/video');
const axios = require('axios').default;
const fs = require('fs');
const Youtube = require('youtube-api');


exports.getMain = (req, res, next) => {
    res.status(200).json({ location: "we are at the main admin page" });
};

exports.addChannel = async (req, res, next) => {
    const channelId = req.body.channelId;
    // axios.get(`https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&maxResults=5&key=${process.env.YOUTUBE_TOKEN}`)
    let nextPageExists = true;
    let nextPageToken = "";
    while (nextPageExists) {
        await Youtube.search.list({
            key: process.env.YOUTUBE_TOKEN,
            part: 'snippet',
            channelId: channelId,
            pageToken: nextPageToken,
            type: 'video',
            maxResults: 50,
        }).then(result => {
            console.log(nextPageToken);
            if (!(result.data.nextPageToken)) {
                nextPageExists = false;
            } else {
                nextPageToken = result.data.nextPageToken;
            }
            const snippetList = result.data.items;
            for (let video of snippetList) {
                const newVideo = new Video({
                    channelId: video.snippet.channelId,
                    channelTitle: video.snippet.channelTitle,
                    title: video.snippet.title,
                    videoId: video.id.videoId,
                    views: 0,
                    thumbnail: video.snippet.thumbnails.high.url
                });
                newVideo.save().then(doc => {
                }).catch(err => {
                    console.log(err);
                });;
            }
            // createDataFile(result);
        }).catch(err => {
            nextPageExists = false;
            console.log(err);
        });
    }
    res.json({ message: "adding channel" });
};

//used to create a file storing video information with views to be added with a separate query
// const createDataFile = (result) => {
//     const snippetList = result.data.items;
//     const videoDataList = snippetList.map((video, index) => {
//         let simplifiedObject = {
//             channelId: video.snippet.channelId,
//             channelTitle: video.snippet.channelTitle,
//             title: video.snippet.title,
//             videoId: video.id.videoId,
//             views: 0,
//             thumbnail: video.snippet.thumbnails.high.url
//         };
//         return simplifiedObject;
//     });
//     let data = JSON.stringify(videoDataList);
//     fs.appendFileSync('./data/dataFile.json', data);
// };


exports.updateVideos = async (req, res, next) => {
    let videos = await Video.find({});
    let videoIds = videos.map(video => video.videoId);
    while (videoIds.length > 0) {
        let chunk;
        if (videoIds.length > 50)
            chunk = videoIds.splice(0, 50);
        else
            chunk = videoIds.splice(0, videoIds.length);
        console.log(videoIds.length);
        await Youtube.videos.list({
            key: process.env.YOUTUBE_TOKEN,
            part: 'statistics',
            id: chunk,
            maxResults: chunk.length
        }).then(result => {
            const statsList = result.data.items;
            for (let i = 0; i < chunk.length; i++) {
                videos[i].views = statsList[i].statistics.viewCount;
                videos[i].save();
            }
            videos.splice(0, chunk.length);
        }).catch(err => {
            console.log(err);
        });
    }
    res.json(videos);
};

module.exports.getMain = (req, res, next) => {
    res.status(200).json({ location: "we are at the main user page" });
};

exports.getRandomVideo = (req, res, next) => {
    Video.countDocuments().exec((err, count) => {
        // Get a random entry
        let random = Math.floor(Math.random() * count);

        // Again query all users but only fetch one offset by our random #
        Video.findOne().skip(random).exec((err, result) => {
            // Tada! random user
            res.status(200).json(result);
        });
    });
};

module.exports.searchChannel = async (req, res, next) => {
    let channels = [];
    await axios.get(`https://youtube.googleapis.com/youtube/v3/channels?part=snippet&forUsername=${req.query.channelName}&maxResults=10&key=${process.env.YOUTUBE_TOKEN}`)
        .then(result => {
            for (let item of result.data.items) {
                channels.push(item);
            }
        }).catch(err => {
            console.log(err);
        });
    res.status(200).json(channels);
};