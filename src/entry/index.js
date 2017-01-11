/*JS file to make all the needed modules available in index.html*/
import angular from "angular";
import "app/services";
import "app/components";

export default angular.module("app", ["app.services", "app.components"]);
