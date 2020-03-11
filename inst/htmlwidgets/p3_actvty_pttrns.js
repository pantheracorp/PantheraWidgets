HTMLWidgets.widget({

  name: 'p3_actvty_pttrns',

  type: 'output',

  factory: function(el, width, height) {

    // create an empty chart
    var chart = null;

    return {

      renderValue: function(x) {

        // if the chart does not exist, create it via c3.generate
        if(chart===null){

          var keys = _.keys(x.dataset);

            chart = c3.generate({
                bindto: el,
                padding: {
                  right: 5
                },
                data: {
                    json: [],
                    type: 'area-spline'
                },
                subchart: {
          			show: x.subchart
          		},
          		zoom: {
                enabled: x.zoom
              },
                axis: {
                    x: {
                        type: "category",
                        categories: x.categories,
                        label: {
                          text: x.axis_labels.x_axis,
                          position:  x.labels_pos.xpos
                        }
                    },
                    y: {
                        label: {
                          text: x.axis_labels.y_axis,
                          position :  x.labels_pos.ypos
                        }
                    }
                },
                regions: x.axis_regions,
                //regions: [x.axis_regions],
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

      //chart.groups([x.groups]);

      // update the data
      chart.load({
        json  : x.dataset,
        colors: x.colors,
        show_points : x.show_points,
        categories : x.categories,
        axis_regions: x.axis_regions,
        axis_labels : x.axis_labels,
        labels_pos : x.labels_pos,
        axis_rotate: x.axis_rotate,
        subchart : x.subchart,
        zoom : x.zoom,
        // remove data we no longer need (if any)
        unload: diff,
        // set types
        types : x.types
      });
    },

    // this part will be called each time we resize the containing div element
    resize: function(el, width, height, instance) {

    },

    getChart: function(){
        return chart;
      }
   };

}});


