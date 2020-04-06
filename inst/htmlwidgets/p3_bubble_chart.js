HTMLWidgets.widget({

  name: 'p3_bubble_chart',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance

    return {

      renderValue: function(xinput) {
        // set the dimensions and margins of the graph
        var margin = {top: 40, right: 150, bottom: 60, left: 30},
            width = 800 - margin.left - margin.right,
            height = 420 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var svg = d3.select("#"+el.id)
          .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .style("padding-left", "3%")
            .style("padding-right","5%")
          .append("g")
            .attr("transform",
                  "translate(" + margin.left + "," + margin.top + ")");


        var data = xinput.dataset;

            xValues = [];
            yValues =[];
            var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
                .key(function(d) { return d.group;})
                .rollup(function(d) {
                    return(d.map(function(d) {
                        xValues.push(d.xvalues); // push(d.xvalues);
                        yValues.push(d.yvalues); //
                          return d.xvalues;
                    }))
            })
            .entries(data);

            var xMaximum =  Math.max(...xValues);
            var xMinimum =  Math.min(...xValues);
            var yMaximum =  Math.max(...yValues);
            var yMinimum =  Math.min(...yValues);

         // axis defination

          // Add X axis
          var x = d3.scaleLinear()
            .domain([0, parseInt(xMaximum)+100])
            .range([ 0, width ]);
          svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x).ticks(10));

          // Add X axis label:

          svg.append("text")
              .attr("text-anchor", "end")
              .attr("x", width)
              .attr("y", height+50 )
              .text(xinput.axis_labels.x_axis);

          // Add Y axis
          var y = d3.scaleLinear()
            .domain([yMinimum - 5, yMaximum + 5])
            .range([ height, 0]);
          svg.append("g")
            .call(d3.axisLeft(y));

          // Add Y axis label:

          svg.append("text")
              .attr("text-anchor", "end")
              .attr("x", 0)
              .attr("y", -20 )
              .text(xinput.axis_labels.y_axis)
              .attr("text-anchor", "start");

          // Add a scale for bubble size
          var z = d3.scaleSqrt()
            .domain([200000, 1310000000])
            .range([ 2, 30]);

          var myColor = d3.scaleOrdinal()
            .domain(function (d) { return myColor(d.group); })//["Asia", "Europe", "Americas", "Africa", "Oceania"]
            .range(d3.schemeSet1); //  ["yellow", "green", "blue", "red", "orange"]

           var tip = d3.tip().attr('class', 'd3-tip').direction('e').offset([0,5])
                .html(function(d) {
                        var content = `
                        <table style="; background: rgba(0, 0, 0, 0.7);color: #fff;
                        font-size: 14px;">
                                <tr><td>`+ xinput.data_names.group +`: </td><td style="text-align: right">`
                                + d.group+ `</td></tr>
                                <tr><td>`+ xinput.data_names.scaled_values +`: </td><td style="text-align: right">`
                                + d.scaled_values+ `</td></tr>
                                <tr><td>`+ xinput.data_names.yvalues +`: </td><td style="text-align: right">`
                                + d.yvalues+ `</td></tr>
                                <tr><td>`+ xinput.data_names.xvalues +`: </td><td style="text-align: right">`
                                + d.xvalues+ `</td></tr>

                        </table>
                        `;
                    return content;
                });
            svg.call(tip);


          // highlight

          // What to do when one group is hovered
          var highlight = function(d){

            if($("."+d).css('opacity') < 1){
                  d3.selectAll("."+d).style("opacity", 1);
            }
            else{
               d3.selectAll("."+d).style("opacity", 0.05);
            }

          };

          // And when it is not hovered anymore
          var noHighlight = function(d){
            d3.selectAll(".bubbles").style("opacity", 1);
          };

         // circles

          // Add dots
          svg.append('g')
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
              .attr("class", function(d) { return "bubbles " + d.group })
              .attr("cx", function (d) { /*console.log("d.xvalues : " + d.xvalues);*/return x(d.xvalues); } )
              .attr("cy", function (d) { return y(d.yvalues); } )
              .attr("r", function (d) { return z(d.scaled_values); } )
              .style("fill", function (d) { return myColor(d.group); } )
              .style("visibility", 'visible')
            .on("mouseover", tip.show )
            .on("mouseleave", tip.hide );



            // Legend

            // Add legend: circles
            var xAddition = 30,
                valuesToShow = [10000000, 100000000, 1000000000],
                xCircle = 390,
                xLabel = 440;



            svg
              .selectAll("legend")
              .data(valuesToShow)
              .enter()
              .append("circle")
                .attr("cx", x(xMaximum)+xAddition)
                .attr("cy", function(d){ return height - 100 - z(d) } )//function(d,i){ return i * (size + 5) + (size/2)}
                .attr("r", function(d){ return z(d) })
                .style("fill", "none")
                .attr("stroke", "black");

            // Add legend: segments
              svg
                .selectAll("legend")
                .data(valuesToShow)
                .enter()
                .append("line")
                  .attr('x1', x(xMaximum)+xAddition)
                  .attr('x2', x(xMaximum)+(3*xAddition))
                  .attr('y1', function(d){ return height - 100 - z(d) } )
                  .attr('y2', function(d){ return height - 100 - z(d) } )
                  .attr('stroke', 'black')
                  .style('stroke-dasharray', ('2,2'));

              // Add legend: labels
              svg
                .selectAll("legend")
                .data(valuesToShow)
                .enter()
                .append("text")
                  .attr('x', x(xMaximum)+(3*xAddition))
                  .attr('y', function(d){ return height - 100 - z(d) } )
                  .text( function(d){ return d/1000000 } )
                  .style("font-size", 10)
                  .attr('alignment-baseline', 'middle');


              // Legend title
              svg.append("text")
                .attr('x', x(xMaximum)+xAddition)
                .attr("y", height - 100 +30)
                .text(xinput.axis_labels.scaled)
                .attr("text-anchor", "middle");

            // Add one dot in the legend for each name.
            var size = 20,
                count = 0;
                allgroups = xinput.groups.slice(0, 6);

            svg.selectAll("myrect")
              .data(allgroups)
              .enter()
              .append("circle")
                .attr("id", function(d) { count++ ;return "legendcircles" + count })
                .attr("cx", x(xMaximum)+xAddition)
                .attr("cy", function(d,i){ return 10 + i*(size+5)}) // 100 is where the first dot appears. 25 is the distance between dots
                .attr("r", 6)
                .style("fill", function(d){ return myColor(d)})
                .style("opacity",1)
                .on("click", highlight);


            // Add labels beside legend dots
            svg.selectAll("mylabels")
              .data(allgroups)
              .enter()
              .append("text")
                .attr("x", (x(xMaximum)+xAddition) + size*0.8)
                .attr("y", function(d,i){ return i * (size + 5) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
                .style("fill", 'black')//function(d){ return myColor(d)}
                .text(function(d){ return d})
                .attr("text-anchor", "left")
                .style("alignment-baseline", "middle")
                .on("click", highlight);



      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});
