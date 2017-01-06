/*JS file to make all the needed modules available in index.html*/
//var app = angular.module('app', ['Check','app.services', 'app.components', 'layoutModule','d3Module', 'videoModule','3dModule','timeModule']);

import angular from "angular";
import "app/services";
import "app/components";

//angular.bootstrap(GoldenTestLayoutModule);
export default angular.module("app", ["app.services", "app.components"]);
