//const angular = require('angular');
import angular from "angular";
import controller from "./root-component.controller.js";


const Module = angular.module("app.components.root-component", [ ])
                      .controller("damn",controller)
                      .directive("rootComponent", function(){
                            
                          return{
                              restrict: "E",
                              templateUrl: "components/root-component/root-component.html",
                              controller: "damn",
                              controllerAs: "gl"

                          };

                      });

export default Module;
