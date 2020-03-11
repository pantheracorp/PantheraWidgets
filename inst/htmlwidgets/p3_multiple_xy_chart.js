HTMLWidgets.widget({

  name: 'p3_multiple_xy_chart',

  type: 'output',

  factory: function(el, width, height) {
    // TODO: define shared variables for this instance
    var chart = null;

    function setXS(dataset){
      let object = {};
      let objkys = Object.keys(dataset);
      let start = (objkys.length/2 );
      let count = 0;
      for(let i= start ; i < objkys.length ; i++)
      {
        object[objkys[i]] = objkys[count];
        count++;
      }
      return object;
    }

    return {

      renderValue: function(x) {

        if(chart === null)
        {
            chart = c3.generate(
            {
              bindto: el,
              data: {
                xs: setXS(x.dataset),
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
                            text:   x.axis_labels.x_axis,
                            position : x.labels_pos.xpos
                           } ,
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
          xvalues: x.xvalues,
          colors : x.colors,
          axis_labels : x.axis_labels,
          axis_rotate : x.axis_rotate,
          unload: diff
        });

      },

    };
  }
});
