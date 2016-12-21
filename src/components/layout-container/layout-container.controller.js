const ipcRenderer = require('electron').ipcRenderer;

export default class layoutCtrl {
    constructor($scope,LayoutService) {
        
        this.videoPathFile = null;
        this._3dpanel = true;

        //Listen for event from main window when user selected a video file
        var callbackVideoFile = (function (event, arg1,arg2) {
            LayoutService.setVideoPathFile(arg1);
            LayoutService.isVideoOpened = true;
            LayoutService.setFrameRate(arg2);
            this.videoPathFile = arg1;
            $scope.$apply();
        }).bind(this);
       
        /*Connect with the main window to have the path of the selected Video file*/
        ipcRenderer.on('videoFilePath', callbackVideoFile);
    }
}