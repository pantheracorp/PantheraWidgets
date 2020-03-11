HTMLWidgets.widget({

  name: 'p3_combination_chart',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance
    var chart = null;

    return {

      renderValue: function(x) {
       // console.log("x object : " +JSON.stringify(x));
        keys = _.keys(x.dataset);

        if(chart === null)
        {
         // console.log("x.data_groups : " +JSON.stringify(x.data_groups) );
            chart = c3.generate(
            {
              bindto: el,
              data: {
                  json: [],
                  type: x.type,
                  types: x.chart_types,
                  groups: getGroupings(x.data_groups),
              },
              point: {
                  show: x.show_points
              },
              subchart: {
          			show: x.subchart
          		},
          		zoom: {
                enabled: x.zoom
              },
              regions: x.axis_regions,
              grid: {
                      y: {
                          lines: [{value:0}]
                         }
                },
                axis:{
                       rotated: x.axis_rotate,
                       x: {
                           label:
                           {
                             text: x.axis_labels.x_axis,
                             position :  x.labels_pos.xpos
                           },
                           tick: {
                               fit: false,
                               format: d3.format('.2f')
                           }
                       },
                       y: {
                          label: {
                            text: x.axis_labels.y_axis,
                            position: x.labels_pos.ypos
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
          chart_types : x.chart_types,
          colors : x.colors,
          axis_regions: x.axis_regions,
          show_points: x.show_points,
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
