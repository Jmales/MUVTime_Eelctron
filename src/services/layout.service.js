import angular from "angular";



class LayoutService {
    constructor() {
        this.videoPathFile = null;
        this._3dpanel = false;
        this.frameRate = 0;
        this.isVideoOpened = false;

        this.visPanelHeight = null;
        this.visPanelWidth = null;

        this.vidPanelHeight = null;
        this.vidPanelWidth  = null;


    }

    setCharts(charts){
        this.charts = charts;
        console.log(this.charts);
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
    resizeCanvas(containers) {
        for(var i in containers){
           var component=containers[i];
           
           switch(component.config.id){
               case 0: //visPanel
                    var parentHeight = component.container.height;
                    var parentWidth = component.container.width;

                    this.visPanelHeight = parentHeight;
                    this.visPanelWidth  = parentWidth;
                    break;
               case 1: //Time Series Panel
                    break;
               case 2: //Video Panel 
                    this.vidPanelHeight = component.container.height;
                    this.vidPanelWidth  = component.container.width;

                    var video = document.getElementById("video1");
                    video.height = this.vidPanelHeight - 90;
                    video.width  = this.vidPanelWidth;
                    break;
                case 3: //XYZ (3D) Panel
                    break;
                default:
                    console.log("No resize behaviour for this id");
           }
        }

        /*var parentHeight = document.parent;
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
        }*/
}

}

export default angular.module("app.services.layout-service", [])
                      .service("LayoutService", LayoutService);
