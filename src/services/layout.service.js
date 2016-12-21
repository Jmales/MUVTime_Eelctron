import angular from 'angular';



class LayoutService {
    constructor() {
        this.videoPathFile = "what";
        this._3dpanel = false;
        this.frameRate = 0;
        this.isVideoOpened = false;
    }

    setVideoPathFile(pathFile) {
        this.videoPathFile = pathFile;
        this.isVideoOpened = true;

    }

    set_3dpanel(value) {
        this._3dpanel = value;
    }

    setFrameRate(value) {
        this.frameRate = value;
    }

    //Resize canvas and video to obey the parent panel height and width
    resizeCanvas() {
        var parentHeight = document.getElementById("visPanel").clientHeight;
        var parentWidth = document.getElementById("visPanel").clientWidth;

        var canvases = document.getElementsByClassName("chart");
        var lengthArrayCanvas = canvases.length;
        for (var i = 0; i < lengthArrayCanvas; i++) {

            canvases[i].style.maxHeight = parentHeight / lengthArrayCanvas + 'px';
            canvases[i].style.maxWidth = parentWidth + 'px';
            canvases[i].style.height = canvases[i].style.maxHeight;
        }
        if (this.isVideoOpened) {
            parentHeight = document.getElementById("videoPanel").clientHeight;
            parentWidth = document.getElementById("videoPanel").clientWidth;

            var video = document.getElementById("video1");
            video.height = parentHeight - 90;
            video.width = parentWidth;
        }
}

};

export default angular.module('app.services.layout-service', [])
                      .service('LayoutService', LayoutService);
