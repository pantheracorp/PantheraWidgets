HTMLWidgets.widget({

  name: 'p3_time_series_chart',

  type: 'output',

    factory: function(el, width, height) {

    // create an empty chart
    var chart = null;

    return {

      renderValue: function(x) {

        // if the chart does not exist, create it via c3.generate
        if(chart===null){

            keys = _.keys(x.dataset);
            console.log(JSON.stringify(x.zoom));

            chart = c3.generate({
              // specify the container element we want the chart to render in
                bindto: el,
                padding: {
                  right: 10
                },
                data: {
                  // intialize with an empty array
                    json: [],
                    keys: {
                          // use Time for x-axis
                          x: "Time",
                          // use the remaining data for y-values
                          value: keys,
                    },
                },
                regions: Object.values(x.axis_regions),
                point: {
                  show: x.show_points
                },
                axis: {
                    x: {
                        //  x axis as timeseries
                        type: "timeseries",
                        label: {
                          text: Object.values(x.axis_labels)[0],
                          position: Object.values(x.labels_pos)[0],
                        },
                        tick: {
                            format: x.time_format
                        }
                    },
                    y:{
                         label: {
                           text: Object.values(x.axis_labels)[1],
                           position: Object.values(x.labels_pos)[1],
                         }
                    },
                    y2: {
                      // we want a second y-axis
                        show: x.show_y2
                    }
                },
                zoom:{
                  enabled: x.zoom
                },
                // display a subchart - this will be used for brushing in a later stage
                subchart: {
                    show: x.subchart
                }
            });
        }

        // at this stage the chart always exists
        // get difference in keys
       var old_keys = _.keys(chart.x());
       var new_keys = _.keys(x.dataset);
       var diff     = _.difference(old_keys,new_keys);

        // update the data and colors
        chart.load({
          json  : x.dataset,
          axis_regions : x.axis_regions,
          show_points : x.show_points,
          time_format: x.time_format,
          axis_labels: x.axis_labels,
          labels_pos: x.labels_pos,
          show_y2: x.show_y2,
          zoom: x.zoom,
          subchart: x.subchart,
          // unload data that we don't need anymore
          unload: diff
        });
      }
    };
  }
});
