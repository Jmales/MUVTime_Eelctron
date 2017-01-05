import $ from 'jquery';
import GoldenLayout from 'golden-layout';
const ipcRenderer = require('electron').ipcRenderer;

export default class GLComponent { 
    constructor($element,$http,$compile, $rootScope,$window,LayoutService){

        this.videoPathFile = LayoutService.videoPathFile;
        this._3dpanel = true;

        //Listen for event from main window when user selected a video file
        var callbackVideoFile = (function (event, arg1,arg2) {
            LayoutService.setVideoPathFile(arg1);
            LayoutService.isVideoOpened = true;
            LayoutService.setFrameRate(arg2);
            this.videoPathFile = arg1;
            $rootScope.$apply();
        }).bind(this);
       
        /*Connect with the main window to have the path of the selected Video file*/
        ipcRenderer.on('videoFilePath', callbackVideoFile);
        
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

        ipcRenderer.on('theme',callbackCSSStyle);
        /*---- */

        /* Layout Related */
        this.layout = null;

        var template_Video= {
                        title: 'Video',
                        id: 'vidPanel',
                        type: 'component',
                        componentName: 'myComponent',
                        componentState: {
                            module: 'app.components.video-visualizer',
                            directive: 'video-visualizer',
                            extraInputs: 'video-path-file="{{gl.videoPathFile}}"'
                            }
                        };
        var template_xyzVisualizer = {
                        title: '3D',
                        id:'3dPanel',
                        type: 'component',
                        componentName: 'myComponent',
                        componentState: {
                            module: 'app.components.xyz-visualizer',
                            directive: 'xyz-visualizer'
                            }
                        };
        this.config = {
            
            content:[{
                type: 'column',
                content: [{
                    type: 'row',
                    height: 70,
                    content:[{
                        width: 60,
                        isClosable: false,
                        title: 'Visualizations',
                        id: 'visPanel',
                        type: 'component',
                        componentName: 'myComponent',
                        componentState: {
                            module: 'app.components.graph-visualizer',
                            directive: 'graph-visualizer'
                            }
                    },
                    template_Video
                ]},{
                    type:'row',
                    content: [{
                        width: 70,
                        title: 'Time Series',
                        id: 'timePanel',
                        type: 'component',
                        componentName: 'myComponent',
                        componentState: {
                            module: 'app.components.times-visualizer',
                            directive: 'times-visualizer'
                            }
                    },
                    template_xyzVisualizer
                    ]
                    
                    }
                ]
            }]
        };

        this.$postLink = function(){
            this.layout = new GoldenLayout(this.config);
        
            this.layout.registerComponent('myComponent', function( container, state ){
                if(state.extraInputs != null){
                    var html = $compile('<'+ state.directive + ' ' 
                                + state.extraInputs + '></'+state.directive + '>')($rootScope);
                
                }
                else{
                    var html = $compile('<div><'+ state.directive 
                                +'></'+state.directive +'></div>')($rootScope);
                }
                 
                container.on('open',() => {
                    //Here
                    
                }) 
                
                container.on('resize', () => {
                    $(window).trigger( 'resize' );
                })

                container.getElement().html(html);
                });
                

            this.layout.init();

             $(window).resize( () => {
                    //console.log(this.layout.root.contentItems[0]);
                    //console.log(this.layout.root.contentItems[0].getItemsById('timePanel')[0].container.height);

                    LayoutService.resizeCanvas(this.layout.root.contentItems[0].getItemsByType('component'));
                    

             })
        }

        this.addMenuItem = function( title, text ) {
            
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

        this.addMenuItem( 'Add me!', 'You\'ve added me!' );

       
    }
    
   
}
