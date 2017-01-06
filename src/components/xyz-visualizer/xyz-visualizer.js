import angular from "angular";
import controller from "./xyz-visualizer.controller.js";

const Module = angular.module("app.components.xyz-visualizer",[])
                      .directive("xyzVisualizer", function(){
                          return{
                              restrict:"E",
                              templateUrl: "components/xyz-visualizer/xyz-visualizer.html",
                              controller: controller,
                              controllerAs: "xyz"
                          };
                      });

export default Module;