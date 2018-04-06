HTMLWidgets.widget({

  name: 'p3_actvty_pttrns',

  type: 'output',

  factory: function(el, width, height) {

    return {

      renderValue: function(x) {

          var keys = _.keys(x.dataset);

            chart = c3.generate({
                bindto: el,
                data: {
                    json: [],
                    keys: {
                        x: 'Time'
                    },
                    //rows: [],
                    //columns: [
                    //    ['data1', 30, 200, 100, 400, 150, 250, 50, 100, 250]
                    //],
                    //columns: [
                        //[]
                    //],
                    type: 'area-spline'
                },
                zoom: {
                  enabled: true
                },
                axis: {
                    x: {
                        type: "category",
                        categories: ["0:00", "", "06:00", "", "12:00", "", "18:00", "", "24:00"],
                        label: 'Time'
                    },
                    y: {
                      label: 'Kernel Density'
                    }
                },
                point: {
                  show: false
                }
            });
      }

    };

}});


