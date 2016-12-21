import angular from 'angular';
import  template  from './xyz-visualizer.html';
import controller from './xyz-visualizer.controller.js';

const component = {
    template,
    controller,
    controllerAs: 'xyz'
};

const Module = angular.module('app.components.xyz-visualizer',[])
                      .component('xyzVisualizer', component);

export default Module;