HTMLWidgets.widget({

  name: 'p3_stacked_area',

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
                data: {
                    json: [],
                    keys: {
                        x: "Time",
                          value: keys,
                    },
                    type: 'area-spline'
                },
                axis: {
                    x: {
                        label :{
                          text: Object.values(x.axis_labels)[0],
                          position: Object.values(x.labels_pos)[0]
                        },
                        type: "timeseries",
                        tick: {
                            format: "%Y-%m-%d"
                        }
                    },
                    y: {
                      label:{
                          text: Object.values(x.axis_labels)[1],
                          position: Object.values(x.labels_pos)[1]
                      }
                    }
                },
              // display a subchart - this will be used for brushing in a later stage
          		subchart: {
          			show: x.subchart,
                onbrush: debounce(function (domain) {Shiny.onInputChange(el.id, domain)},250)
          		},
          		zoom:{
          		   enabled: x.zoom
          		},
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
    getChart: function(){
        return chart;
      }
   };

}});

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}
