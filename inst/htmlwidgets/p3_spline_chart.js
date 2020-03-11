HTMLWidgets.widget({

  name: 'p3_spline_chart',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance
    var chart = null;

    return {

      renderValue: function(x) {
       // console.log("x object : " +JSON.stringify(x));
        keys = _.keys(x.dataset);
        // console.log("x.show_points : " + x.show_points);
       // console.log(Object.values(x.axis_regions));

        if(chart === null)
        {
            chart = c3.generate(
            {
              bindto: el,
              data: {
                  json: [],
                  type: 'area-spline',
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
                     x: {
                         label: {
                           text:   x.axis_labels.x_axis,   // x.axis_labels.x_axis,
                           position :  x.labels_pos.xpos,//x.axis_labels_pos.xs
                           },
                           tick: {
                              fit: false,
                              format: d3.format('.2f')
                          }
                     },
                     y: {
                         label: {
                           text: x.axis_labels.y_axis,//x.axis_labels.y_axis,
                           position: x.labels_pos.ypos
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
          show_points: x.show_points,
          axis_regions : x.axis_regions,
          axis_labels : x.axis_labels,
          labels_pos : x.labels_pos,
          axis_rotate : x.axis_rotate,
          unload: diff
        });

      },

    };
  }
});
