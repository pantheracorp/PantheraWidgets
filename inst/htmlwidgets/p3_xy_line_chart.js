HTMLWidgets.widget({

  name: 'p3_xy_line_chart',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance
    var chart = null;

    return {

      renderValue: function(x) {

        keys = _.keys(x.dataset);
        // console.log(JSON.stringify(x.dataset));

        if(chart === null)
        {
            chart = c3.generate(
            {
              bindto: el,
              data: {
                 x: 'x',
                json: []

              },
              regions: x.axis_regions,
              point: {
                  show: x.show_points
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
                              position : Object.values(x.labels_pos)[0]
                           },
                           tick: {
                               fit: false,
                               format: d3.format('.2f')
                           }
                       },
                       y: {
                          label: {
                            text: x.axis_labels.y_axis
                          }
                       }
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
          show_points : x.show_points,
          axis_labels : x.axis_labels,
          axis_rotate : x.axis_rotate,
          unload: diff
        });

      },

    };
  }
});
