// const GraphsVisualizerModule  = require('./components/graph-visualizer/graph-visualizer.js');
// const TimeVisualizerModule = require('./components/timeseries-visualizer/timeseries-visualizer');
// const VideoVisualizerModule = require('./components/video-visualizer/video-visualizer');
// const XyzVisualizerModule     = require('./components/xyz-visualizer/xyz-visualizer');
// const MainCommunicationModule = require('./components/main-communication/main-communication.js');

import angular from "angular";

import XyzVisualizerModule     from "app/components/xyz-visualizer/xyz-visualizer";
import VideoVisualizerModule   from "app/components/video-visualizer/video-visualizer";
import GraphsVisualizerModule  from "app/components/graph-visualizer/graph-visualizer";
import TimeVisualizerModule    from "app/components/timeseries-visualizer/timeseries-visualizer";
import RootComponentModule     from "app/components/root-component/root-component";



export default angular.module("app.components",
        [
        RootComponentModule.name,
        VideoVisualizerModule.name,
        GraphsVisualizerModule.name,
        TimeVisualizerModule.name,
        XyzVisualizerModule.name
        ]);
