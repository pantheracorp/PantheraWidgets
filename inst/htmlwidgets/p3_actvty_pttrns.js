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
                    //keys: {
                    //    x: "Time",
                    //      value: keys,
                    //},
                    type: 'area-spline'
                },
                zoom: {
                  enabled: true
                },
                axis: {
                    x: {
                        type: "category",
                        categories: ["0:00","01:00","02:00","03:00","04:00","05:00","06:00","07:00","08:00","09:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00","24:00"],
                        label: 'Time'
                    },
                    y: {
                      label: 'Kernel Density'
                    }
                },
                regions: [
                  {axis: 'x', start: 0, end: 6, class: 'regionX'},
                  {axis: 'x', start: 18, end: 24, class: 'regionX'}
                ],
                point: {
                  show: false
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
        // new data
        json  : x.dataset,

        // new colors
        colors: x.colors,

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


