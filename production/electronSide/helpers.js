

const ffprobe = require("ffprobe"),
    ffprobeStatic = require("ffprobe-static");

module.exports = class HelperFunctions{
    

    getFramerate(videoPathFile, callback) {
        //Find frame rate of video file
        ffprobe(videoPathFile, { path: ffprobeStatic.path },
            function (err, info) {
                if (err) {
                    console.log(err);
                    return null;
                }
                var frameRate = parseInt((info.streams["0"].r_frame_rate).split("/", 1)[0]);
                callback(frameRate);
            }
        ); 
    }
    constructor() {
            /*Variable to know which panels can be opened or not.
            True if it's closed and can't be opened another instance.
            False if it's opened and can open a new panel.
            Order:
                [0]Visualizations
                [1]Time Series
                [2]Video
                [3]XYZ
            */
            this.panelEnum = {
                Vis  :0,
                Time :1,
                Vid  :2,
                XYZ  :3

            };
            this.closedPanels = [false,false,true,false];
    }
};