#' TimeSeries Chart
#'
#' Plots data trends in numeric data over a time period.
#'
#' @import htmlwidgets
#' @param dataset List of numeric vectors containing the datasets to be plotted and a factor vector specifying the time category
#' @param colors  A list of plot colors prefered for each dataset
#' @param axis_regions  Named list of character lists defining the properties of regions to be shadded
#' @param show_points Boolean option to show data values points
#' @param time_format   Character value specifying the display time format .
#' @param axis_labels    Named list of characters defining the prefered chart axis labels.
#' @param labels_pos    Named list of characters defining the prefered position of the axis labels.
#'                      e.g for x-axis ( inner-center, inner-left, outer-right, outer-center, outer-left, inner-right [default] )
#'                       and  y-axis ( inner-middle, inner-bottom, outer-top, outer-middle, outer-bottom, inner-top [default] )
#' @param subchart Boolean option to show sub chart for zoom and selection range.Default set to False..
#' @param zoom    Boolean option to Zoom by mouse wheel event and slide by drag. Default set to True
#' @param show_y2 Boolean option to show a second y-axis on the chart axis.
#' @param width,height Fixed width for widget (in css units).The default is NULL
#'                     which results in intelligent automatic sizing based on the
#'                     widget’s container.
#' @param elementId Use an explicit element ID for the widget. Useful if you have
#'                  other JavaScript that needs to explicitly discover and
#'                  interact with a specific widget instance. Default NULL
#'                  which results in an automatically generated one.
#' @return TimeSeries Chart
#'
#' @examples
#' dataset <- data.frame(
#'     Time=c('2013-01-01','2013-01-02','2013-01-03','2013-01-04','2013-01-05','2013-01-06'),
#'     data1=c(30, 200, 100, 400, 150, 250),
#'     data2=c(130, 340, 200, 500, 250, 350),
#'     data3=c(400, 500, 450, 700, 600, 500))
#' colors <- list(data1="orange",data2="green",data3="red")
#' axis_regions <- list(list(start= '2013-01-02', end= '2013-01-03'),
#'                      list(start='2013-01-05', end='2013-01-06'))
#' labels_pos <- list(xpos="outer-center",ypos="outer-middle")
#'
#' p3_time_series_chart(dataset,colors,axis_regions,labels_pos=labels_pos)
#' p3_time_series_chart(dataset,colors,axis_regions,show_points=TRUE,labels_pos=labels_pos,subchart=TRUE,zoom=TRUE)
#' @export
#'
p3_time_series_chart <- function(dataset,colors=NULL,axis_regions=NULL,show_points=FALSE,
                                 time_format=NULL,axis_labels=NULL,labels_pos = NULL,subchart=FALSE,zoom=TRUE,
                                 show_y2=FALSE,width = NULL,height = NULL, elementId=NULL) {



  if(is.null(labels_pos))
  {
    labels_pos <- list(xs="outer-right",ys="outer-bottom")
  }
  if(is.null(axis_regions))
  {
    axis_regions <- list(list(axis='x',start=-1,end=-1,reg_class='regionX'))
  }
  if(is.null(axis_labels))
  {
    axis_labels <- list(x_axis="Time",y_axis="Frequency")
  }
  if(is.null(time_format))
  {
    time_format = '%d-%m-%Y'
  }
  # forward options using x
  x = list(
    dataset = dataset,
    colors  = colors,
    axis_regions = axis_regions,
    show_points = show_points,
    time_format = time_format,
    axis_labels = axis_labels,
    labels_pos = labels_pos,
    subchart = subchart,
    zoom = zoom,
    show_y2 = show_y2,
    elementId = elementId
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'p3_time_series_chart',
    x,
    width = width,
    height = height,
    elementId = elementId,
    package = 'PantheraWidgets'
  )
}

#' Shiny bindings for p3_time_series_chart
#'
#' Output and render functions for using p3_time_series_chart within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a p3_time_series_chart
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name p3_time_series_chart-shiny
#'
#' @export
p3_time_series_chartOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'p3_time_series_chart', width, height, package = 'PantheraWidgets')
}

#' @rdname p3_time_series_chart-shiny
#' @export
renderp3_time_series_chart <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, p3_time_series_chartOutput, env, quoted = TRUE)
}
