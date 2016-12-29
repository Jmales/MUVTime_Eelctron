export default class videoCtrl {
    constructor($scope, LayoutService) { 
        this.stepValue = 100;
        this.selection = "ms";
        this.max = 10000;
        this.min = 1;

        var video = document.getElementById("video1");
        var videoplayRate = 1.0;

        console.log(LayoutService.videoPathFile);
        //this.videoPathFile = LayoutService.videoPathFile;

        /*Routine related with the initial values*/
        video.onloadstart = function () {
            var parentHeight = document.getElementById("videoPanel").clientHeight;
            var parentWidth = document.getElementById("videoPanel").clientWidth;
            video.height = parentHeight - 90;
            video.width = parentWidth;
           
        };

        /*Listen for selectUnits change and modify the default value accordingly*/
        this.update_select = function() {
            if (this.selection === "ms") {
                this.stepValue = 100;
            }
            else if (this.selection === "frame") {
                this.stepValue = 1;
            }
            else {//seconds
                this.stepValue = 1;
            }
            changeMaxMinValues(this);
        };

        /*Change max and min values according to the Units selected*/
        function changeMaxMinValues(ctrl) {
            if (LayoutService.videoPathFile != null) { //if Video is loaded
                var duration = video.duration;
                if (ctrl.selection === "ms") {
                    ctrl.min = 1;
                    ctrl.max = duration * 1000 / 2;
                }
                else if (ctrl.selection === "frame") {
                    ctrl.min = 1;
                    ctrl.max = duration * LayoutService.frameRate / 2;
                }
                else {//seconds
                    ctrl.min = 0.001;
                    ctrl.max = duration / 2;
                }
            }
        };

        /**
         * Functions to control video
         */

       function isValid(selectedStep) {
            if (!selectedStep)//if is invalid the value is undefined
                return 0;
            return 1;
        }

        this.playVideo = function () {
            video.playbackRate = 1.0;
            video.play();
        }

        this.pauseVideo = function () {
            video.pause();
        }

        this.stopVideo = function () {
            video.pause();
            video.currentTime = 0;
        }

        this.forwardVideo = function () {
            videoplayRate += 0.5;
            video.playbackRate = videoplayRate;
            
        }

        this.backwardVideo = function () {
            videoplayRate -= 0.5;
            video.playbackRate = videoplayRate;
            /*UNDONE: 
                -queremos que o o botão vá até quanto?;
                -backwards é ir para trás ou atrasar?*/
        }

        this.stepBackwardVideo = function () {
            if (isValid(this.stepValue)) { //If the selected Step is valid
                var subTime;
                if (this.selection === "ms") {
                    subTime = this.stepValue / 1000;
                }
                else if (this.selection === "frame") {

                    subTime = this.stepValue / LayoutService.frameRate;
                }
                else { //seconds
                    subTime = this.stepValue;
                }
                video.currentTime -= subTime;
            }
            else {
                console.log("Problem with stepBackwardVideo");
            }
        }

        this.stepForwardVideo = function () {
            if (isValid(this.stepValue)) { //If the selected Step is valid
                var addedTime;
                if (this.selection === "ms") {
                    addedTime = this.stepValue / 1000;
                }
                else if (this.selection === "frame") {
                    addedTime = this.stepValue / LayoutService.frameRate;
                }
                else { //seconds
                    addedTime = this.stepValue;
                }
                video.currentTime += addedTime;
            }
            else {
                console.log("Problem with stepForwardVideo");
            }
        }

    }

}

