import angular from 'angular';
import controller from './video-visualizer.controller.js';

/*import template from './video-visualizer.html';
const component = {
    template,
    controller,
    controllerAs: 'vid',
    bindings: {
        videoPathFile: '<'
    }
};*/

const Module = angular.module('app.components.video-visualizer', [])
                      .directive('videoVisualizer',function(){
                          return{
                             restrict: 'E',
                             templateUrl: 'components/video-visualizer/video-visualizer.html',
                             controller: controller,
                             controllerAs: 'vid',
                             scope:{
                                  videoPathFile: '@'
                            },
                          }
                      });

export default Module;
