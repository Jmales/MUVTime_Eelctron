//const angular = require('angular');
import angular from 'angular';
import d3 from 'd3';
import csv from 'csv';
import template   from './graph-visualizer.html';
import controller from './graph-visualizer.controller.js';
import 'angular-nvd3';


const component = {
    template,
    controller,
    controllerAs: 'grap'
};

const Module = angular.module('app.components.graph-visualizer', [ 'nvd3'])
                      .component('graphVisualizer', component);

export default Module;
