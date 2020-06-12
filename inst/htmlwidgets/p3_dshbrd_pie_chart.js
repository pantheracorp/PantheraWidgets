HTMLWidgets.widget({

    name: 'p3_dshbrd_pie_chart',

    type: 'output',

    // initialization
    initialize: function(el, width, height) {
        return{replace: false, width: width, height: height};
    },

    // this part will be called each time we send an update
    renderValue: function(el, x, instance) {

      console.log("new Installed");

      if(typeof(instance.chart) == 'undefined'){

        instance.inFilter = JSON.parse(JSON.stringify(x.fullNames));

        // Return initial selection such that the inputs are all filled
         if(typeof(Shiny)!==undefined){
           Shiny.onInputChange(el.id, instance.inFilter);
         }

        var chart = c3.generate({

            bindto: "#" + el.id,

            data: {
                json:
                  x.value
                ,
                type : x.type,
                onclick: function (d, element) {

                }

            },

            size:
            {height: x.height},

            legend: {
              position: x.legendPosition,



            },

            tooltip: {
                format: {
                    value: function (value, ratio, id) {
                      return value;

                    }
                }
            },
            transition: {
              duration: x.transition
            },
            pie: {
              label: {
                format: function (value, ratio, id) {
                if(x.displayValues)
                  return (value);
                else
                  return((ratio*100).toFixed(2)) + "%";
              }
            }
          }
        });

        instance.chart = chart;

      }else{

      // Get names of current and new series to put in the chart
      var curKeys = _.keys(instance.chart.x());
      var newKeys = _.keys(x.value);

      // Determine the keys that are in the current chart but not in the new data
      // This difference should be unloaded
      diff = _.difference(curKeys,newKeys);

      instance.chart.load({
        json:
          x.value
        ,
          unload: diff,
      });

      instance.chart.hide(x.dataHidden);

      }
  },

  // this part will be called each time we resize the containing div element
  resize: function(el, width, height, instance) {
      el.style.paddingLeft = 0.028*screen.width + "px";
  }


});
