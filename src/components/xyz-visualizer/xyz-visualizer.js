import angular from "angular";
import controller from "./xyz-visualizer.controller.js";
import template from "./xyz-visualizer.html";

const Module = angular.module("app.components.xyz-visualizer",[])
                      .directive("xyzVisualizer", function(){
                          return{
                              restrict:"E",
                              //templateUrl: "components/xyz-visualizer/xyz-visualizer.html",
                              template: template,
                              controller: controller,
                              controllerAs: "xyz"
                          };
                      });

export default Module;