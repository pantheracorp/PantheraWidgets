HTMLWidgets.widget({

  name: 'p3_radar_chart',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance

    return {

      renderValue: function(xinput) {
	  /* Radar chart design created by Nadieh Bremer - VisualCinnamon.com */


	  var data = xinput.dataset,
	      axisLabels = xinput.axis_categories,
	      dataNames = xinput.data_names;

		function formatData(data,axisLabels){
			let res = [];
			Object.keys(data).forEach(function(k){
				temp = [];
				for(let i = 0 ; i < data[k].length;i++){
					obj ={'group': k ,'axis':axisLabels[i],'value':data[k][i]};
					temp.push(obj);
				}
				res.push(temp);
			});
			return res;
		}

			// Set-Up

			var margin = {top: 100, right: 100, bottom: 100, left: 100},
				width = $( "#"+el.id ).width() - margin.left - margin.right,
				height = Math.min(width, window.innerHeight - margin.top - margin.bottom - 20);


			// Draw the Chart

			var color = d3.scale.ordinal()
				.range(xinput.colors);

			var radarChartOptions = {
			  w: width,
			  h: height,
			  margin: margin,
			  maxValue: 0.5,
			  levels: 5,
			  roundStrokes: true,
			  color: color
			};
			//Call function to draw the Radar chart
			RadarChart("#"+el.id, formatData(data,axisLabels), axisLabels,dataNames, radarChartOptions);

      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});
