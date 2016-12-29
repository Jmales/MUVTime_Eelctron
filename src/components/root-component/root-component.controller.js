
import $ from 'jquery';
import GoldenLayout from 'golden-layout';

class test2{
    constructor(){
        this.test = 0.001;
        		
		this.users = [
			{ name: 'Jackson Turner', street: '217 Tawny End', img: 'men_1.jpg' },
			{ name: 'Megan Perry', street: '77 Burning Ramp', img: 'women_1.jpg' },
			{ name: 'Ryan Harris', street: '12 Hazy Apple Route', img: 'men_2.jpg' },
			{ name: 'Jennifer Edwards', street: '33 Maple Drive', img: 'women_2.jpg' },
			{ name: 'Noah Jenkins', street: '423 Indian Pond Cape', img: 'men_3.jpg' }
		];
    }
}

angular.module('userlist', [] )
	.controller('userlistController', test2);

export default class GLComponent { 
    constructor($element,LayoutService,$http,$compile, $rootScope){
        console.log(LayoutService.videoPathFile);
        this.test = 1000;
        this.testvid="whhhhaaaatttsup";
        this.layout = null;
        var template_Video= {
                        title: 'Video',
                        type: 'component',
                        componentName: 'timeT',
                        componentState: {
                            module: 'app.components.video-visualizer',
                            directive: 'video-visualizer',
                            extraInputs: 'video-path-file="{{gl.testvid}}"'
                            }
                        };
        var template_xyzVisualizer = {
                        title: '3D',
                        type: 'component',
                        componentName: 'timeT',
                        componentState: {
                            module: 'app.components.xy<-visualizer',
                            directive: 'xyz-visualizer'
                            }
                        };
        this.config = {
            settings:{
                showPopoutIcon: false //To avoid PopUp option
            },
            content:[{
                type: 'column',
                content: [{
                    type: 'row',
                    height: 70,
                    content:[{
                        width: 60,
                        title: 'Visualizations',
                        type: 'component',
                        componentName: 'timeT',
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
                        type: 'component',
                        title: 'Time Series',
                        componentName: 'timeT',
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
        var AngularModuleComponent = function( container, state ) {
            var html = $( '#' + state.templateId ).html(),
                element = container.getElement();
            element.html(html);

        angular
            .module( state.module )

            angular.bootstrap( element[ 0 ], [ state.module ] );
        }

        //TODO:Talvez consiga fazer bootstrap da app toda logo. Ver isso
        //angular.bootstrap(document, ['myApp']);
        this.$postLink = function(){
            this.layout = new GoldenLayout(this.config);
        
            // this.layout.registerComponent('timeT', AngularModuleComponent); 
            this.layout.registerComponent('timeT', function( container, state ){
                if(state.extraInputs != null){
                    var html = $compile('<'+ state.directive + ' ' 
                                + state.extraInputs + '></'+state.directive + '>')($rootScope);
                
                }
                else{
                    var html = $compile('<div><'+ state.directive 
                                +'></'+state.directive +'></div>')($rootScope);
                }
                 
                container.getElement().html(html);
                });
                

            this.layout.init();
        }

        this.addMenuItem = function( title, text ) {
            
            var element = $( '<li>' + text + '</li>' );
            $( '#menuContainer' ).append( element );
            console.log(this);

            var newItemConfig = {
                    title: title,
                    type: 'component',
                    componentName: 'timeT',
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

        this.what = function(){
            console.log("here");
        }

    }
    
   
}
