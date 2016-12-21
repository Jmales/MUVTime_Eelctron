import angular from 'angular';
import template from './video-visualizer.html';
import controller from './video-visualizer.controller.js';


const component = {
    template,
    controller,
    controllerAs: 'vid',
    bindings: {
        videoPathFile: '<'
    }
};

const Module = angular.module('app.components.video-visualizer', [])
                      .component('videoVisualizer',component);

export default Module;
