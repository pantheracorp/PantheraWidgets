HTMLWidgets.widget({

  name: 'p3_boxplot_chart',

  type: 'output',

  factory: function(el, width, height) {

    // TODO: define shared variables for this instance

    return {

      renderValue: function(xinput) {

        if($( "#"+el.id ).height() < 1){

              xinput.height = 400;
        }


        var margin = {top: 40, right: 150, bottom: 60, left: 30},
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

            var tip = d3.tip().attr('class', 'd3-tip').direction('e').offset([0,5])
                .html(function(d) {
                //console.log("d.key : " +  d.key);
                var content = "<span style='margin-left: 2.5px;'><b>" + d.key + "</b></span><br>";
                content =`
                    <table style="; background: rgba(0, 0, 0, 0.7);color: #fff;
                        font-size: 13px;">
                            <tr><td>`+ d.key +`</td></tr>
                            <tr><td>Max: </td><td style="text-align: right">` + d3.format(".2f")(d.value.max) + `</td></tr>
                            <tr><td>Q3: </td><td style="text-align: right">` + d3.format(".2f")(d.value.q3) + `</td></tr>
                            <tr><td>Median: </td><td style="text-align: right">` + d3.format(".2f")(d.value.median) + `</td></tr>
                            <tr><td>Q1: </td><td style="text-align: right">` + d3.format(".2f")(d.value.q1) + `</td></tr>
                            <tr><td>Min: </td><td style="text-align: right">` + d3.format(".2f")(d.value.min) + `</td></tr>
                    </table>
                    `;
                return content;
            });


            var data = formatData(xinput.dataset);
            var groups =[];
            var minMax = [];
            // Compute quartiles, median, inter quantile range min and max --> these info are then used to draw the box.
            var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
                .key(function(d) { groups.push(d.Group);return d.Group;})
                .rollup(function(d) {
                q1 = d3.quantile(d.map(function(g) { return g.Value;}).sort(d3.ascending),.25)
                median = d3.quantile(d.map(function(g) { return g.Value;}).sort(d3.ascending),.5)
                q3 = d3.quantile(d.map(function(g) { return g.Value;}).sort(d3.ascending),.75)
                interQuantileRange = q3 - q1
                min = q1 - 1.5 * interQuantileRange
                max = q3 + 1.5 * interQuantileRange
                minMax.push(min);
                minMax.push(max);
                return({q1: q1, median: median, q3: q3, interQuantileRange: interQuantileRange, min: min, max: max})
                })
                .entries(data)


            svg.call(tip);

            var jitterWidth = 50
            var yMaximum =  Math.max(...minMax);
            var yMinimum =  Math.min(...minMax);

            var colorMap = d3.scaleOrdinal()
                .domain(groups)
                .range(d3.schemeCategory20c);
            const xScale = d3.scaleBand()
              .domain([...new Set(groups)])
              .range([ 0, width ]);
            //console.log("yx.bandwidth()/2 : " + xScale.bandwidth()/2);

            var boxWidth = xScale.bandwidth()/2;

            if(xinput.axis_rotate === false){
                //var boxWidth = 40;
                // Show the X scale
            var x = d3.scaleBand()
                .range([ 0, width ])
                .domain(groups)
                .paddingInner(1)
                .paddingOuter(1)
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x))
                //.select(".domain").remove()
                .selectAll(".tick text")
                .call(wrap, boxWidth);

            //console.log("x.bandwidth() : " + parseInt(x.bandwidth()));
         // Add X axis label:

          svg.append("text")
              .attr("text-anchor", "end")
              .style("font-size", "13px")
              .attr("x", width)
              .attr("y", height+50 )
              .text(xinput.axis_labels.x_axis);

            // Show the Y scale
            var y = d3.scaleLinear()
                .domain([yMinimum-1,yMaximum+1])
                .range([height, 0])
            svg.append("g")
                .call(d3.axisLeft(y))
                //..select(".domain").remove()


          svg.append("text")
              .attr("text-anchor", "end")
              .style("font-size", "13px")
              .attr("x", 0)
              .attr("y", -20 )
              .text(xinput.axis_labels.y_axis)
              .attr("text-anchor", "start")

            // Show the main vertical line
            svg
                .selectAll("vertLines")
                .data(sumstat)
                .enter()
                .append("line")
                .attr("x1", function(d){return(x(d.key))})
                .attr("x2", function(d){return(x(d.key))})
                .attr("y1", function(d){return(y(d.value.min))})
                .attr("y2", function(d){return(y(d.value.max))})
                .attr("stroke", "black")
                .style("width", 40)

            // rectangle for the main box

            svg
                .selectAll("boxes")
                .data(sumstat)
                .enter()
                .append("rect")
                    .attr("x", function(d){return(x(d.key)-boxWidth/2)})
                    .attr("y", function(d){return(y(d.value.q3))})
                    .attr("height", function(d){return(y(d.value.q1)-y(d.value.q3))})
                    .attr("width", boxWidth )
                    .attr("stroke", "black")
                    .style("fill", function (d) { return colorMap(d.key); })//"#69b3a2"
                .on("mouseover", tip.show )
                //.on("mousemove", moveTooltip )
                .on("mouseleave", tip.hide )

            // Show the median
            svg
                .selectAll("medianLines")
                .data(sumstat)
                .enter()
                .append("line")
                .attr("x1", function(d){return(x(d.key)-boxWidth/2) })
                .attr("x2", function(d){return(x(d.key)+boxWidth/2) })
                .attr("y1", function(d){return(y(d.value.median))})
                .attr("y2", function(d){return(y(d.value.median))})
                .attr("stroke", "black")
                .style("width", 80)

            // Add individual points with jitter
            //var jitterWidth = 50

                if(xinput.show_points){
                    svg
                    .selectAll("indPoints")
                    .data(data)
                    .enter()
                    .append("circle")
                        .attr("cx", function(d){
                            return(x(d.Group) - jitterWidth/2 + Math.random()*jitterWidth )
                        })
                        .attr("cy", function(d){return(y(d.Value))})
                        .attr("r", 4)
                        .style("fill", function(d){ return(colorMap(+d.Value)) })
                        .attr("stroke", "black")
                }

            }else{

            var y = d3.scaleBand()
                .range([ height, 0 ])
                .domain(groups)
                .padding(.4);
            svg.append("g")
                .call(d3.axisLeft(y).tickSize(0))
                .selectAll(".tick text")
                .style("align-text","center")
                .call(wrap,  30)

            $('.domain').css('stroke', 'none') // remove the y axis line

            svg.append("text")
                .attr("text-anchor", "end")
                .style("font-size", "13px")
                .attr("x", 0)
                .attr("y", -20 )
                .text(ylabel)
                .attr("text-anchor", "start")


            //console.log("yScale.bandwidth() : " + parseInt(y.bandwidth()) );
            //console.log("typeof : " + typeof y.bandwidth());
            // Show the X scale
            var x = d3.scaleLinear()
                .domain([yMinimum-1,yMaximum+1])
                .range([0, width])
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x))
                .attr("stroke","none")
                //.select(".domain").remove() stroke: none

            // Add X axis label:
            svg.append("text")
                .attr("text-anchor", "end")
                .attr("x", width)
                .attr("y", height+40)
                .style("font-size", "13px")
                .text(xlabel);

            // Show the main vertical line
            svg
                .selectAll("vertLines")
                .data(sumstat)
                .enter()
                .append("line")
                .attr("x1", function(d){return(x(d.value.min))})
                .attr("x2", function(d){return(x(d.value.max))})
                .attr("y1", function(d){return(y(d.key) + y.bandwidth()/2)})
                .attr("y2", function(d){return(y(d.key) + y.bandwidth()/2)})
                .attr("stroke", "black")
                .style("width", 40)

            // rectangle for the main box
            svg
                .selectAll("boxes")
                .data(sumstat)
                .enter()
                .append("rect")
                    .attr("x", function(d){return(x(d.value.q1))}) // console.log(x(d.value.q1)) ;
                    .attr("width", function(d){ ; return(x(d.value.q3)-x(d.value.q1))}) //console.log(x(d.value.q3)-x(d.value.q1))
                    .attr("y", function(d) { return y(d.key); })
                    .attr("height", y.bandwidth() )
                    .attr("stroke", "black")
                    .style("fill", function (d) { return colorMap(d.key); })//"#69b3a2"
                    .style("opacity", 0.3)
                .on("mouseover", tip.show )
                .on("mouseleave", tip.hide )

            // Show the median
            svg
                .selectAll("medianLines")
                .data(sumstat)
                .enter()
                .append("line")
                .attr("y1", function(d){return(y(d.key))})
                .attr("y2", function(d){return(y(d.key) + y.bandwidth())})
                .attr("x1", function(d){return(x(d.value.median))})
                .attr("x2", function(d){return(x(d.value.median))})
                .attr("stroke", "black")
                .style("width", 80)

            // Add individual points with jitter

            if(xinput.show_points){

                svg
                .selectAll("indPoints")
                .data(data)
                .enter()
                .append("circle")
                .attr("cx", function(d){ return(x(d.Value))})
                .attr("cy", function(d){ return( y(d.Group) + (y.bandwidth()/2) - jitterWidth/2 + Math.random()*jitterWidth )})
                .attr("r", 4)
                .style("fill", function(d){ return(colorMap(+d.Value)) })
                .attr("stroke", "black")

            }

            }

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

            function formatData(data){
                let res = [];
                Object.keys(data).forEach(function(k){
                    temp = [];
                    for(let i = 0 ; i < data[k].length;i++){
                        obj ={'Group': k ,'Value':data[k][i]};
                        res.push(obj);
                    }
                    //res.push(temp);
                });
                return res;
            }


      },

      resize: function(width, height) {

        // TODO: code to re-render the widget with a new size

      }

    };
  }
});
