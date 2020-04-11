HTMLWidgets.widget({

  name: 'p3_heatmap_chart',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance

    return {

      renderValue: function(xinput) {

        if($( "#"+el.id ).height() < 1){

              xinput.height = $( "#"+el.id ).width() ;
        }

        // set the dimensions and margins of the graph
      var margin = {top: 20, right: 25, bottom: 65, left: 65},
        width = $( "#"+el.id ).width() - margin.left - margin.right,
        height = xinput.height - margin.top - margin.bottom;

      // append the svg object to the body of the page
      var svg = d3.select("#"+el.id)
      .append("svg")
        .call(d3.zoom().on("zoom", function () {
                svg.attr("transform", d3.event.transform);
         }))
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");

      //Read the data
        var data = xinput.dataset;

        // Labels of row and columns -> unique identifier of the column called 'groups' and 'variables'
        //console.log("Data :  " + JSON.stringify( data) );
        var myGroups = d3.map(data, function(d){return d.groups;}).keys()
        //console.log("myGroups :  " + JSON.stringify( myGroups) );
        var myVars = d3.map(data, function(d){return d.variables;}).keys()
       // console.log("myVars :  " + JSON.stringify( myVars) );*/

        // Build X scales and axis:
        var x = d3.scaleBand()
          .range([ 0, width ])
          .domain(myGroups)
          .padding(0.05);
        svg.append("g")
        .attr("class", "xaxis")
          .style("font-size", 10)
          .attr("transform", "translate(0," + height + ")")
          .call(d3.axisBottom(x).tickSize(0))
          .selectAll(".tick text")
          .call(wrap, x.bandwidth());
          //.select(".domain").remove()


        // Build Y scales and axis:
        var y = d3.scaleBand()
          .range([ height, 0 ])
          .domain(myVars)
          .padding(0.05);
        svg.append("g")
          .attr("class", "yaxis")
          .style("font-size", 10)
          .call(d3.axisLeft(y).tickSize(0))
          .selectAll(".tick text")
          .call(wrap, y.bandwidth());
          //.select(".domain").remove()
          d3.select(".domain").style("stroke","#fff");

      // white out axis lines
      $('.xaxis path').css("stroke","#fff");
      $('.yaxis path').css("stroke","#fff");
        // Build color scale
        var myColor = d3.scaleSequential()
          .interpolator(d3.interpolateInferno)
          .domain([1,100]);

          var tip = d3.tip().attr('class', 'd3-tip').direction('e').offset([0,5])
                .html(function(d) {
                        content =`
                        <table style="background: rgba(0, 0, 0, 0.7);color: #fff;
                        font-size: 14px;">
                                <tr><td>`+xinput.data_names.groups+`: </td><td style="text-align: right">`
                                + d.groups + `</td></tr>
                                <tr><td>`+xinput.data_names.variables+`: </td><td style="text-align: right">`
                                + d.variables + `</td></tr>
                                <tr><td>`+xinput.data_names.values+`: </td><td style="text-align: right">`
                                + d.values + `</td></tr>
                        </table>
                        `;
                    return content;
                });
            svg.call(tip);


        // append the squares
        svg.selectAll()
          .data(data, function(d) {return d.groups+':'+d.variables;})
          .enter()
          .append("rect")
            .attr("x", function(d) { return x(d.groups) })
            .attr("y", function(d) { return y(d.variables) })
            .attr("rx", 4)
            .attr("ry", 4)
            .attr("width", x.bandwidth() )
            .attr("height", y.bandwidth() )
            .style("fill", function(d) { return myColor(d.values/100)} )
            .style("stroke-width", 4)
            .style("stroke", "none")
            .style("opacity", 0.8)
          .on("mouseover", tip.show)//mouseover
          //.on("mousemove", mousemove)
          .on("mouseleave", tip.hide)



      // function to wrap axis labels to avoid overlaping
      function wrap(text, width) {
        text.each(function() {
          var text = d3.select(this),
          // split on each character
          words = text.text().split('').reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1,
          y = text.attr("y"),
          dy = parseFloat(text.attr("dy")),
          tspan = text.text(null).append("tspan").attr("x", 0).attr("y", y).attr("dy", dy + "em");

          while (word = words.pop()) {
            line.push(word);
            //console.log("word : " + word);
            // join with empty string
            tspan.text(line.join(""));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                // join with empty string
                tspan.text(line.join(""));
                line = [word];
                tspan = text.append("tspan").attr("x", 0).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
          }
        });
      }

      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});
