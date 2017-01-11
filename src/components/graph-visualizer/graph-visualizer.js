//const angular = require('angular');
import angular from "angular";
import controller from "./graph-visualizer.controller.js";
import template from "./graph-visualizer.html";
import "angular-nvd3";


const Module = angular.module("app.components.graph-visualizer", [ "nvd3"])
                      .directive("graphVisualizer", function(){
                          return{
                             restrict: "E",
                              //templateUrl: "components/graph-visualizer/graph-visualizer.html",
                              template: template,
                              controller: controller,
                              controllerAs: "grap" 
                          };
                      });

export default Module;
