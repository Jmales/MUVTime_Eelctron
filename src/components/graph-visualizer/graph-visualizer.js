//const angular = require('angular');
import angular from 'angular';
import d3 from 'd3';
import csv from 'csv';
import controller from './graph-visualizer.controller.js';
import 'angular-nvd3';


/*import template   from './graph-visualizer.html';
const component = {
    template,
    controller,
    controllerAs: 'grap'
};*/

const Module = angular.module('app.components.graph-visualizer', [ 'nvd3'])
                      .directive('graphVisualizer', function(){
                          return{
                             restrict: 'E',
                              templateUrl: 'components/graph-visualizer/graph-visualizer.html',
                              controller: controller,
                              controllerAs: 'grap' 
                          }
                      });

export default Module;
