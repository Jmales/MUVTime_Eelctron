import angular from "angular";
import controller from "./timeseries-visualizer.controller.js";
import template from "./timeseries-visualizer.html";


const Module = angular.module("app.components.times-visualizer",[])
                      .directive("timesVisualizer",function(){
                          return{
                             restrict: "E",
                              //templateUrl: "components/timeseries-visualizer/timeseries-visualizer.html",
                              template:template,
                              controller: controller,
                              controllerAs: "time" 
                          };
                      });

export default Module;