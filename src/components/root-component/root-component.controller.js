import $ from "jquery";
import GoldenLayout from "golden-layout";
const ipcRenderer = require("electron").ipcRenderer;

export default class GLComponent { 
    constructor($element,$http,$compile, $rootScope,$window,LayoutService){

        this.videoPathFile = LayoutService.videoPathFile;
        this._3dpanel = true;

        /*Variable to know which panels are opened or closed
        Order:
            [0]Visualizations
            [1]Time Series
            [2]Video
            [3]XYZ
        */
        var panelEnum = {
            Vis  :0,
            Time :1,
            Vid  :2,
            XYZ  :3
        };

        //Listen for event from main window when user selected a video file
        var callbackVideoFile = (function (event, arg1,arg2) {
            LayoutService.setVideoPathFile(arg1);
            LayoutService.isVideoOpened = true;
            LayoutService.setFrameRate(arg2);
            this.videoPathFile = arg1;
            $rootScope.$apply();
        }).bind(this);
       
        /*Connect with the main window to have the path of the selected Video file*/
        ipcRenderer.on("videoFilePath", callbackVideoFile);
        
        var basePath="../node_modules/golden-layout/src/css/goldenlayout-";
        var lightTheme = "light-theme.css";
        var darkTheme = "dark-theme.css";
        
        this.stylePath = basePath + darkTheme;
        

        /*Listen for event from main window when user selected a video file*/
        var callbackCSSStyle = (function (event, arg) {
            if(arg){ //Equals 1 === Dark
                this.stylePath = basePath + darkTheme;
            }
            else{
                this.stylePath = basePath + lightTheme;
            }
            $rootScope.$apply();
        }).bind(this);

        ipcRenderer.on("theme",callbackCSSStyle);
        /*---- */

        /* Layout Related */
        this.layout = null;

        var templateVisualizations = {
                        width: 60,
                        //isClosable: false,
                        title: "Visualizations",
                        id: panelEnum.Vis,
                        type: "component",
                        componentName: "myComponent",
                        componentState: {
                            module: "app.components.graph-visualizer",
                            directive: "graph-visualizer"
                            }
                    };

        var templateVideo= {
                        title: "Video",
                        id: panelEnum.Vid,
                        type: "component",
                        componentName: "myComponent",
                        componentState: {
                            module: "app.components.video-visualizer",
                            directive: "video-visualizer",
                            extraInputs: "video-path-file=\"{{gl.videoPathFile}}\""
                            }
                        };
        var templateTime= {
                        width: 70,
                        title: "Time Series",
                        id: panelEnum.Time,
                        type: "component",
                        componentName: "myComponent",
                        componentState: {
                            module: "app.components.times-visualizer",
                            directive: "times-visualizer"
                            }
                    };

        var templateXyzVisualizer = {
                        title: "3D",
                        id:panelEnum.XYZ,
                        type: "component",
                        componentName: "myComponent",
                        componentState: {
                            module: "app.components.xyz-visualizer",
                            directive: "xyz-visualizer"
                            }
                        };
        this.config = {
            
            content:[{
                type: "column",
                isClosable: false,
                content: [{
                    type: "row",
                    height: 70,
                    content:[
                        templateVisualizations
                    ]
                },{
                    type:"row",
                    content: [
                        templateTime,
                        templateXyzVisualizer
                    ]
                    
                    }
                ]
            }]
        };

        this.$postLink = function(){
            this.layout = new GoldenLayout(this.config);
        
            this.layout.registerComponent("myComponent", function( container, state ){
                var html;
                if(state.extraInputs != null){
                    html = $compile("<"+ state.directive + " " 
                                + state.extraInputs + "></"+state.directive + ">")($rootScope);
                
                }
                else{
                    html = $compile("<div><"+ state.directive 
                                +"></"+state.directive +"></div>")($rootScope);
                }
                 
                container.on("open",() => {
                    //Here
                    
                }); 
                
                container.on("resize", () => {
                    $(window).trigger( "resize" );
                });

                container.getElement().html(html);
                

                container.on("destroy",() => {
                    ipcRenderer.send("closedPanel",container._config.id);
                });
            });  

            this.layout.init();

             $(window).resize( () => {
                    //console.log(this.layout.root.contentItems[0]);
                    //console.log(this.layout.root.contentItems[0].getItemsById('timePanel')[0].container.height);

                    LayoutService.resizeCanvas(this.layout.root.contentItems[0].getItemsByType("component"));
                    

             });
        };

        /*this.addMenuItem = function( title, text ) {
            
            var element = $( '<li>' + text + '</li>' );
            $( '#menuContainer' ).append( element );

            var newItemConfig = {
                    title: title,
                    type: 'component',
                    componentName: 'myComponent',
                    componentState: {
                            module: 'app.components.video-visualizer',
                            templateId: 'videoTemplate'
                            }
                };
            
            element.click( () => { //Arrow function to handle 'this'
                this.layout.root.contentItems[ 0 ].addChild( newItemConfig );
            });

        };

        this.addMenuItem( 'Add me!', 'You\'ve added me!' );*/

        //Listen for event from main window when user adds a new panel
        var callbackNewPanel = (function (event, arg1) {
            var newItemConfig;
            switch(arg1){
                case(panelEnum.Vis):
                    newItemConfig = templateVisualizations;
                    break;
                case(panelEnum.Time):
                    newItemConfig = templateTime;
                    break;
                case(panelEnum.Vid):
                    newItemConfig = templateVideo;
                    break;
                case(panelEnum.XYZ):
                    newItemConfig = templateXyzVisualizer;
                    break;
                default:
                    console.log("No such option",arg1);
                    break;
            }
            try{
                this.layout.root.contentItems[ 0 ].addChild( newItemConfig );
            }catch(err){
                console.log(err);
            }
    }).bind(this);
        ipcRenderer.on("newPanel",callbackNewPanel);

       
    }
    
   
}
