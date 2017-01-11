//const angular = require('angular');
import angular from "angular";
import controller from "./root-component.controller.js";
import template from "./root-component.html";

const Module = angular.module("app.components.root-component", [ ])
                      .controller("damn",controller)
                      .directive("rootComponent", function(){
                            
                          return{
                              restrict: "E",
                              //templateUrl: "rootComponentHtml.html",
                              template: template,
                              controller: "damn",
                              controllerAs: "gl"

                          };

                      });

export default Module;
