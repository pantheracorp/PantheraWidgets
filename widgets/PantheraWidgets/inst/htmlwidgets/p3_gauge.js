HTMLWidgets.widget({

  name: 'p3_gauge',

  type: 'output',

  factory: function(el, width, height) {

    // create an empty chart
    var chart = null;

    return {

      renderValue: function(x) {

        // check if the chart exists
        if(chart === null){

          // the chart did not exist and we want to create a new chart via c3.generate
          chart = c3.generate({
                bindto: el,
                data: {
                    json: x,
                    type: 'gauge',
                    onclick:  function (d, element) { Shiny.onInputChange(el.id,d)}
                },
                gauge: {
                    label:{
                        format: function(value, ratio){ return value;}
                    },
                    min: 0,
                    max: 100,
                    width: 30,
                    units: 'value'
                }
            });

          // store the chart on el so we can get it later
          el.chart = chart;
        }

        // at this stage the chart always exists
        // get the chart stored in el and update it
        el.chart.load({json: x});

      }
    };
  }
});
