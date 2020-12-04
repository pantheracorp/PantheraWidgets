HTMLWidgets.widget({

	name: 'p3_cptrs_bar',

	type: 'output',

	factory: function (el, width, height) {

		// create an empty chart
		var chart = null;

		return {

			renderValue: function (x) {


				console.log(el + " p3_stacked_area");
				console.log("x label : " + Object.values(x.axis_labels)[0]);
				console.log("y label : " + Object.values(x.axis_labels)[1]);

				console.log("x position : " + Object.values(x.labels_pos)[0]);
				console.log("y position : " + Object.values(x.labels_pos)[1]);

				// if the chart does not exist, create it via c3.generate
				if (chart === null) {

					let keys = _.keys(x.dataset);
					//console.log(x.plot_type);
					//console.log("subChart: " + x.subChart);
					// console.log("show_y2: " + x.show_y2);

					chart = c3.generate({

						// specify the container element we want the chart to render in
						bindto: el,
						data: {

							// intialize with an empty array
							json: [],
							keys: {
								// use Species for x-axis
								x: "Species",
								// use the remaining data for y-values
								value: keys,
							},
							type: x.plot_type,
							order: null,
							labels: x.show_values

						},
						zoom: {
							enabled: x.zoom
						},
						subchart: {
							show: x.subchart,
							onbrush: debounce(function (domain) {
								Shiny.onInputChange(el.id, domain)
							}, 250)
						},
						legend: {
							show: false
						},
						axis: {
							rotated: x.axis_rotate,

							x: {
								//  x axis as timeseries
								type: "category",
								label: {
									text: Object.values(x.axis_labels)[0],
									position: Object.values(x.labels_pos)[0]
								},
								tick: {
									multiline: false,
									centered: true
								}

							},

							y: {
								label: {
									text: Object.values(x.axis_labels)[1],
									position: Object.values(x.labels_pos)[1]
								},
							},

							/* y: {
								label: 'Number of photographic captures'
							}, */

							y2: {
								// we want a second y-axis
								show: x.show_y2
							}
						}

						// display a subchart - this will be used for brushing in a later stage
						//	subchart: {
						//		show: false,
						//    onbrush: debounce(function (domain) {Shiny.onInputChange(el.id, domain)},250)
						//	}

					});
				}

				// at this stage the chart always exists
				// get difference in keys
				var old_keys = _.keys(chart.x());
				var new_keys = _.keys(x.dataset);
				var diff = _.difference(old_keys, new_keys);

				// update the data and colors
				chart.load({
					json: x.dataset,
					colors: x.colors,
					axis_labels: x.axis_labels,
					labels_pos: x.labels_pos,
					subchart: x.subchart,

					// unload data that we don't need anymore
					unload: diff
				});
			},

			// this part will be called each time we resize the containing div element
			resize: function (el, width, height, instance) {

			},

			getChart: function () {
				return chart;
			}
		};
	}
});

function debounce(func, wait, immediate) {
	var timeout;
	return function () {
		var context = this,
			args = arguments;
		var later = function () {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}