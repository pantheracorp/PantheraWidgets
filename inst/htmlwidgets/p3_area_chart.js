HTMLWidgets.widget({

  name: 'p3_area_chart',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance
    var chart = null;

    return {

      renderValue: function(x) {

        keys = _.keys(x.dataset);

        if(chart === null)
        {
            chart = c3.generate(
            {
              bindto: el,
              padding: {
                  right: 5
                },
              data: {
                  json: [],
                  type: x.chart_type,
              },
              subchart: {
          			show: x.subchart
          		},
          		zoom: {
                enabled: x.zoom
              },
              grid: {
                      y: {
                          lines: [{value:0}]
                         }
                },
                axis:{
                      rotated: x.axis_rotate,
                      x: {
                        label: {
                          text: x.axis_labels.x_axis,
                          position: x.labels_pos.xpos
                        }
                      },
                      y: {
                           label: {
                             text: x.axis_labels.y_axis,
                             position: x.labels_pos.ypos
                            }
                      }
                },
                 regions: x.axis_regions,
                point: {
                  show: x.show_points
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
          colors : x.colors,

          unload: diff
        });

      },

    };
  }
});
