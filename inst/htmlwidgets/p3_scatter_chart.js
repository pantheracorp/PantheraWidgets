
HTMLWidgets.widget({

  name: 'p3_scatter_chart',

  type: 'output',

   factory: function(el, width, height) {

    var chart = null;

    return {

      renderValue: function(x) {

        if(chart===null){

            keys = _.keys(x.dataset);

            chart = c3.generate({

                bindto: el,
                data: {

                    json: [],
                    type: "scatter",
                },
                regions: x.axis_regions,
                subchart: {
          			  show: x.subchart
          		  },
            		zoom: {
                  enabled: x.zoom
                },
                 axis:{

                        x: {
                            label: {
                              text: x.axis_labels.x_axis,// x.axis_labels.x_axis,
                              position :  x.labels_pos.xpos,//x.axis_labels_pos.xs
                            },

                            tick: {
                                fit: false
                            }
                        },
                        y: {
                            label: {
                              text: x.axis_labels.y_axis,//x.axis_labels.y_axis,
                              position: x.labels_pos.ypos,//x.axis_labels_pos.ys

                            }
                        }
                     }
            });
        }

      // get difference in keys
       var old_keys = _.keys(chart.x());
       var new_keys = _.keys(x.dataset);
       var diff     = _.difference(old_keys,new_keys);

        // update the data, colors and axis_labels
        chart.load({
          json  : x.dataset,
          colors: x.colors,
          labels_pos : x.labels_pos,
          axis_labels : x.axis_labels,
          axis_regions: x.axis_regions,
          subchart: x.subchart,
          zoom: x.zoom,
          elementId: x.elementId,
          // unload data that we don't need anymore
          unload: diff
        });
      }
    };
  }
});
