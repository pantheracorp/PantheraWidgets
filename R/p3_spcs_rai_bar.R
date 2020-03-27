#' p3_cptrs_bar
#'
#' Bar chart plot for the number of camera trap images captured per specified species
#'
#' @param dataset List of numeric vectors specifying the x-axis values and the
#'                corresponding data points for the specified x-axis values.
#'                Order is very important, see example for details.
#'
#' @param colors Named list with colors for the data series in the chart.
#'               NULL results in an random automatically generated colors.
#' @param  show_values Boolean option to show data values on all bars.
#'                     Defaults to TRUE.
#' @param plot_type Character value specifying the chart type for the plot
#'                  e.g bar , line etc. Defaults to bar chart.
#' @param axis_rotate Boolean value to determine axis rotation. Default is set
#'                    to False.
#' @param show_y2 Boolean value to include a second y-axis. Default is set
#'                to False.
#' @param zoom    Boolean option to Zoom by mouse wheel event and
#'                slide by drag. Default set to True.
#' @param axis_labels   Named list of characters defining the prefered chart axis
#'                      labels.
#' @param labels_pos    Named list of characters defining the prefered position
#'                      of the axis labels  e.g for x-axis ( inner-center,
#'                      inner-left,outer-right, outer-center, outer-left,
#'                      inner-right [default] ) and y-axis ( inner-middle,
#'                      inner-bottom, outer-top, outer-middle, outer-bottom,
#'                      inner-top [default] ).
#' @param subchart  Boolean option to show sub chart for zoom and selection
#'                      range.Default set to False.
#' @param legend  Plot legend.
#' @param width,height  Must be a valid CSS unit (like '100%', '400px', 'auto')
#'                      or a number, which will be coerced to a string and have
#'                      'px' appended.The default is NULL, which results in
#'                      intelligent automatic sizing based on the chart’s
#'                      container.
#' @param elementId 	  Use an explicit element ID for the widget Useful if you
#'                      have other JavaScript that needs to explicitly discover
#'                      and interact with a specific widget instance. in any
#'                      other case leave as NULL which results in an
#'                      automatically generated one.
#'
#' @examples
#' dataset <- list(Species=c("Lion","Baboon","Tiger","Monkey","Leopard","Bird",
#'                          "Girrafe","Kudu","Springbook","Snake"),
#'                          Captures=c(20, 180, 240, 100, 190,213,45,189,67,1))
#' colors <- list(data1="orange",data2="green",data3="red")
#' p3_spcs_rai_bar(dataset = dataset , colors = colors)
#' p3_spcs_rai_bar(dataset,colors,plot_type='line',axis_rotate=FALSE)
#' p3_spcs_rai_bar(dataset,colors,axis_rotate=TRUE)
#'
#' @import htmlwidgets
#'
#' @export
p3_spcs_rai_bar <- function(dataset,colors,show_values=TRUE,plot_type='bar',
                         axis_rotate=TRUE,show_y2=FALSE,zoom=TRUE, axis_labels=NULL,
                         labels_pos=NULL, subchart=FALSE, legend=NULL,width=NULL,height=NULL,elementId=NULL) {


  if(is.null(colors))
  {
    colors <- list()
  }

  if(is.null(axis_labels))
  {
    axis_labels <- list(x_axis="x",y_axis="y")
  }

  if(is.null(labels_pos))
  {
    labels_pos <- list(xs="outer-right",ys="outer-bottom")
  }


  # forward options using x
  x = list(
    dataset  = dataset,
    colors   = colors,
    show_values = show_values,
    plot_type = plot_type,
    axis_rotate = axis_rotate,
    show_y2 = show_y2,
    zoom = zoom,
    axis_labels=axis_labels,
    labels_pos=labels_pos,
    subchart = subchart,
    legend = legend
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'p3_spcs_rai_bar',
    x,
    width = width,
    height = height,
    package = 'PantheraWidgets',
    elementId = elementId
  )
}
# axis_rotate
#
#' Shiny bindings for p3_cptrs_bar
#'
#' Output and render functions for using p3_cptrs_bar within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a p3_cptrs_bar
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name p3_cptrs_bar-shiny
#'
#' @export
p3_spcs_rai_barOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'p3_spcs_rai_bar', width, height, package = 'PantheraWidgets')
}

#' @rdname p3_cptrs_bar-shiny
#' @export
renderp3_spcs_rai_bar <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, p3_spcs_rai_barOutput, env, quoted = TRUE)
}
