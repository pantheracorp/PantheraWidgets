HTMLWidgets.widget({

  name: 'p3_dshbrd_line_bar_chart',

  type: 'output',

   // initialization
  initialize: function(el, width, height) {
      return{replace: false, width: width, height: height};
  },

    renderValue: function(el, x, instance) {
     console.log('Target ID v2 : ' + el.id );
       var Data = x;

    if(typeof(instance.chart) != 'undefined'){
      instance.chart.destroy();
    }
      instance.Data = Data;

      var chart = c3.generate({

        bindto: '#' + el.id,
        title: {
          text: Data.title
        },
        data: {
          x : Data.data.x,
          columns:
            Data.data.columns,
          axes:
            Data.data.axes
          ,
          types:
            Data.types
        },
        axis:
          Data.axis,
        color:
          Data.color,
        subchart:{
          show: Data.subchart.show
         /* ,
          // Only trigger oninputchange when component is run from shiny
          onbrush : debounce(function (domain) {if(typeof Shiny !== 'undefined' && typeof(Shiny.onInputChange) == 'function')
                            {Shiny.onInputChange(el.id, domain)}},Data.debounce)*/
        },
        zoom: {
        enabled: true
       },
        transition: {
          duration: Data.transition
        },
        size: {
          height: Data.height

        },
        onrendered: function () {
          console.log('Testing');
          let prnt = document.getElementById("dshbrd_line_bar");
          prnt.style.textAlign = "center";
          let elChild =  document.createElement("h4");
          elChild.innerText = "PantheraIDS Active Logins Line Bar Chart.";
          prnt.insertBefore(elChild, prnt.firstChild);
          console.log('Target ID v1 : ' + el.id );

        },
      });

      instance.chart = chart;

    //}

    // Store chart instance in the div for later manipulation
    if(!$(el).data("instance"))
      $(el).data("instance",{chart: instance.chart});

  },


  // this part will be called each time we resize the containing div element
  resize: function(el, width, height, instance) {

  }



});

/*alert('Testing');
let prnt = document.getElementById("usg_dshbrd-lineBarChart");
prnt.style.textAlign = "center";
let elChild =  document.createElement("h4");                 // Create a <p> element
elChild.innerText = "PantheraIDS Active Logins Line Bar Chart.";
prnt.insertBefore(elChild, prnt.firstChild);*/
// Insert text


