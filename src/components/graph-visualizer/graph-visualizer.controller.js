const ipcRenderer = require('electron').ipcRenderer;
const fs = require('fs');
import csv from 'csv';


var time = [];
var graph_data = [];

export default class graphCtrl {
    constructor($scope,LayoutService) {
        this.isDataReady = false;
        this.options = {
    chart: {
        type: 'discreteBarChart',
        height: 450,
        margin : {
            top: 20,
            right: 20,
            bottom: 60,
            left: 55
        },
        x: function(d){ return d.label; },
        y: function(d){ return d.value; },
        showValues: true,
        valueFormat: function(d){
            return d3.format(',.4f')(d);
        },
        transitionDuration: 500,
        xAxis: {
            axisLabel: 'X Axis'
        },
        yAxis: {
            axisLabel: 'Y Axis',
            axisLabelDistance: 30
        }
    }
};

this.data = [{
    key: "Cumulative Return",
    values: [
        { "label" : "A" , "value" : -29.765957771107 },
        { "label" : "B" , "value" : 0 },
        { "label" : "C" , "value" : 32.807804682612 },
        { "label" : "D" , "value" : 196.45946739256 },
        { "label" : "E" , "value" : 0.19434030906893 },
        { "label" : "F" , "value" : -98.079782601442 },
        { "label" : "G" , "value" : -13.925743130903 },
        { "label" : "H" , "value" : -5.1387322875705 }
    ]
}];

        /*Function to be called when the video is selected. It binds "this" fo the function*/
        var callbackDataFile = (function (event, arg) {
            this.dataPathFile = arg;

            var self = this;
            fs.readFile(arg, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                console.log(data.slice(0, 100));
                for (var i = 7; i < 12; i++) {
                    graph_data.push([]);
                }

                var self2 = self;
                csv.parse(data, { delimiter: ',' }, function (err, output) {
                    //console.log(output.slice(0, 5));
                    for (var row in output) {
                        if (output[row][0] === "S1_vs_S2") {
                            time.push(output[row][6]);
                            graph_data[0].push(output[row][7]);
                            graph_data[1].push(output[row][8]);
                            graph_data[2].push(output[row][9]);
                            graph_data[3].push(output[row][10]);
                            graph_data[4].push(output[row][11]);
                            //console.log("Time: " + output[row][6]);
                            //console.log(output[row][7]);

                        }
                    }

                    self2.isDataReady = true;

                    addCSVData();
                })
            });

        }).bind(this);

        /*Connect with the main window to have the path of the selected Video file*/
        ipcRenderer.on('dataFilePath', callbackDataFile);

        var addCSVData = (function () {
            console.log("adding");
            this.labels2 = [1,2,3,4,8];
            this.data2 = graph_data[2];
            this.datasetOverride2 = [{ yAxisID: 'y-axis-1' }];
            this.options2 = {
                maintainAspectRatio: false,
                scales: {
                    yAxes: [
                        {
                            id: 'y-axis-1',
                            type: 'linear',
                            display: true,
                            position: 'left'
                        }
                    ]
                }
            };
        }).bind(this);

        //Listen for resize in ui-layout event
        $scope.$on('ui.layout.resize', function (e, beforeContainer, afterContainer) {
            LayoutService.resizeCanvas();
        });

        this.labels = ["January", "February", "March", "April", "May", "June", "July"];
        this.series = ['Series A', 'Series B'];
      
        this.onClick = function (points, evt) {
            console.log(points, evt);
        };
        this.datasetOverride = [{ yAxisID: 'y-axis-1' }, { yAxisID: 'y-axis-2' }];
    }
}
