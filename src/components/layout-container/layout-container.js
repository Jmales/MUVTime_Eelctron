import angular    from 'angular';
import 'angular-ui-layout';
import template   from './layout-container.html';
import controller from './layout-container.controller.js';


const component = {
    template,
    controller,
    controllerAs: 'lay'
};

const Module = angular.module('app.components.layout-container', ['ui.layout'])
                      .component('layoutContainer', component);

export default Module;