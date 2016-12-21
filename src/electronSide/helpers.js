const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

const path = require('path');

const ffprobe = require('ffprobe'),
    ffprobeStatic = require('ffprobe-static');

module.exports = class HelperFunctions{

    getFramerate(videoPathFile, callback) {
        //Find frame rate of video file
        ffprobe(videoPathFile, { path: ffprobeStatic.path },
            function (err, info) {
                if (err) {
                    console.log(err);
                    return null;
                }
                var frameRate = parseInt((info.streams["0"].r_frame_rate).split('/', 1)[0]);
                callback(frameRate);
            }
        ); 
    }
    constructor() {
        
    }
}