import angular from 'angular';
import template   from './timeseries-visualizer.html';
import controller from './timeseries-visualizer.controller.js';

import LayoutService from 'app/services/layout.service';

const component = {
    template,
    controller,
    controllerAs: 'time'
};

const Module = angular.module('app.components.times-visualizer',[])
                      .directive('timesVisualizer',function(){
                          return{
                             restrict: 'E',
                              templateUrl: 'components/timeseries-visualizer/timeseries-visualizer.html',
                              controller: controller,
                              controllerAs: 'time' 
                          }
                      });

export default Module;