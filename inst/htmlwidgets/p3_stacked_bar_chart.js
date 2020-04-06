HTMLWidgets.widget({

  name: 'p3_stacked_bar_chart',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance
    var chart = null;

    return {

      renderValue: function(x) {
        console.log(x.x_categories);
        keys = _.keys(x.dataset);

        if(chart === null)
        {
            chart = c3.generate(
            {
              bindto: el,
              data: {
                  json: [],
                  type: 'bar',
                  labels: false,
                 groups: getGroupings(x.data_groups)
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
                           type: 'category',
                           categories: x.x_categories,
                           label: {
                             text: x.axis_labels.x_axis,
                             position : Object.values(x.labels_pos)[0]
                           }
                           /*,tick: {
                               fit: false,
                               format: d3.format('.2f')
                           }*/
                       },
                       y: {
                          label: {
                           text:  x.axis_labels.y_axis,
                           position: Object.values(x.labels_pos)[1]

                          }
                       }
                    },
              bar: {
                  width: {
                      ratio: 0.5 // this makes bar width 50% of length between ticks
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
          data_groups : x.data_groups,
          colors : x.colors,
          axis_labels : x.axis_labels,
          labels_pos : x.labels_pos,
          axis_rotate : x.axis_rotate,
          // unload data that we don't need anymore
          unload: diff
        });

      },

    };
  }
});
