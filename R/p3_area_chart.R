#' Area Chart
#'
#' Display as Area Chart.
#'
#' @param dataset       List of numeric vectors specifying the datasets to be plotted.
#' @param colors        Named list with colors for the data series in the chart.
#'                      NULL results in an random automatically generated colors.
#' @param chart_type    Character value for the chart type to plot e.g 'area' or line.
#'                      Defaults to area line chart
#' @param axis_regions  Named list of character list defining the properties of regions to be shadded
#' @param axis_labels   Named list of characters defining the prefered chart axis labels.
#' @param labels_pos    Named list of characters defining the prefered position of the axis labels
#'                      e.g for x-axis ( inner-center, inner-left, outer-right, outer-center, outer-left, inner-right [default] )
#'                      and  y-axis ( inner-middle, inner-bottom, outer-top, outer-middle, outer-bottom, inner-top [default] )
#' @param show_points   Boolean option to show data points on the chart plot
#' @param show_y2       Boolean option to include a second y-axis.
#' @param zoom          Boolean option to Zoom by mouse wheel event and
#'                      slide by drag. Default set to True
#' @param subchart      Boolean option to show sub chart for zoom and selection
#'                      range.Default set to False.
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
#' @import htmlwidgets
#'
#' @examples
#'
#' dataset <- list(data1=c(300, 350, 300, 0, 0, 0),
#'                 data2=c(130, 100, 140, 200, 150, 50))
#' axis_regions <- list(list(axis='x',start= 1,end= 2,reg_class='regionX'),
#'                      list(axis='x',start= 4,end= 5,reg_class='regionX'))
#' colors <- list(data1="orange",data2="green")
#' axis_labels <- list(x_axis="species",y_axis="frequency")
#' labels_pos  <- list(xpos="outer-center",ypos="outer-middle")
#'
#'  p3_area_chart(dataset,colors,chart_type='area',axis_regions,axis_labels=axis_labels,labels_pos=labels_pos)
#'  p3_area_chart(dataset,colors,chart_type='line',axis_regions,axis_labels,labels_pos)
#' @export
p3_area_chart <- function(dataset,colors,chart_type='area',axis_regions=NULL,
                          axis_labels=NULL,labels_pos=NULL,show_points=FALSE,
                          show_y2=FALSE,zoom=TRUE,subchart=FALSE,width = NULL,
                          height = NULL, elementId = NULL) {


  if(is.null(chart_type))
  {
    chart_type = 'area'
  }
  if(is.null(colors))
  {
    colors <- list()
  }

  if(is.null(axis_regions))
  {
    axis_regions <- list(list(axis='x',start=-1,end=-1,reg_class='regionX'))
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
    dataset = dataset,
    colors = colors,
    chart_type = chart_type,
    axis_regions = axis_regions,
    axis_labels = axis_labels,
    labels_pos = labels_pos,
    show_points = show_points,
    show_y2 = show_y2,
    zoom = zoom,
    subchart = subchart
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'p3_area_chart',
    x,
    width = width,
    height = height,
    package = 'PantheraWidgets',
    elementId = elementId
  )
}

#' Shiny bindings for p3_area_chart
#'
#' Output and render functions for using p3_area_chart within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a p3_area_chart
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name p3_area_chart-shiny
#'
#' @export
p3_area_chartOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'p3_area_chart', width, height, package = 'PantheraWidgets')
}

#' @rdname p3_area_chart-shiny
#' @export
renderP3_area_chart <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, p3_area_chartOutput, env, quoted = TRUE)
}
