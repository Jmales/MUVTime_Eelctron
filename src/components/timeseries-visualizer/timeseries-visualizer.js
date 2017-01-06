import angular from "angular";
import controller from "./timeseries-visualizer.controller.js";



const Module = angular.module("app.components.times-visualizer",[])
                      .directive("timesVisualizer",function(){
                          return{
                             restrict: "E",
                              templateUrl: "components/timeseries-visualizer/timeseries-visualizer.html",
                              controller: controller,
                              controllerAs: "time" 
                          };
                      });

export default Module;