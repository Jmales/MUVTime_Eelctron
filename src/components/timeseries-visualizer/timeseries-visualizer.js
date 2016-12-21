import angular from 'angular';
import template   from './timeseries-visualizer.html';
import controller from './timeseries-visualizer.controller.js';


const component = {
    template,
    controller,
    controllerAs: 'time'
};

const Module = angular.module('app.components.times-visualizer',[])
                      .component('timesVisualizer', component);

export default Module;