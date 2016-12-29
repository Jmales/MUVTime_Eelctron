//const angular = require('angular');
import angular from 'angular';
import template   from './root-component.html';
import controller from './root-component.controller.js';


const directive = {
    controller,
    templateUrl: template,
    controllerAs: 'gl'
};

const Module = angular.module('app.components.root-component', [ ])
                      .controller('damn',controller)
                      .directive('rootComponent', function($compile){
                            
                          return{
                              restrict: 'E',
                              templateUrl: 'components/root-component/root-component.html',
                              controller: 'damn',
                              controllerAs: 'gl'

                          }

                      });

export default Module;
