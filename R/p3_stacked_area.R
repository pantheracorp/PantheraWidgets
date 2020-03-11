#' Stacked Area Chart
#'
#' Extension of a basic area chart to display the evolution of the value of
#' several groups on the same graphic.
#'
#' @param dataset List of numeric vectors containing the datasets to be plotted
#'                  and a factor vector specifying the time category
#' @param colors A list of plot colors prefered for each dataset
#' @param show_points   Boolean option to show data values on the chart plot
#' @param axis_labels   Named list of characters defining the prefered chart axis labels.
#' @param labels_pos    Named list of characters defining the prefered position
#'                      of the axis labelse.g for x-axis ( inner-center, inner-left,
#'                      outer-right, outer-center, outer-left, inner-right [default] )
#'                      and  y-axis ( inner-middle, inner-bottom, outer-top,
#'                      outer-middle, outer-bottom, inner-top [default] )
#' @param subchart      Boolean option to show sub chart for zoom and selection
#'                      range.Default set to False.
#' @param zoom          Boolean option to Zoom by mouse wheel event and
#'                      slide by drag. Default set to True
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
#' dataset <- list(
#' Time=c("2016-01-05","2016-01-12","2016-01-24","2016-02-05","2016-02-12","2016-02-24"),
#' data1=c(200, 130, 90, 240, 130, 220),
#' data2=c(300, 200, 160, 400, 250, 250),
#' data3=c(10, 20, 50, 40, 80, 65))
#'
#' colors <- list(data1="orange",data2="green",data3="red")
#' axis_labels <- list(x_axis="species",y_axis="frequency")
#' labels_pos <- list(xpos="outer-center",ypos="outer-middle")
#'
#' p3_stacked_area(dataset, colors)
#' p3_stacked_area(dataset, colors,axis_labels=axis_labels,labels_pos=labels_pos)
#' p3_stacked_area(dataset, colors, TRUE,axis_labels,labels_pos,TRUE,TRUE)
#' @import htmlwidgets
#'
#' @export
p3_stacked_area <- function(dataset, colors=NULL,show_points=FALSE,axis_labels=NULL,
                            labels_pos=NULL,subchart=TRUE,zoom=TRUE,width=NULL,
                            height=NULL,elementId=NULL) {


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
    show_points = show_points,
    axis_labels = axis_labels,
    labels_pos = labels_pos,
    subchart = subchart,
    zoom = zoom
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'p3_stacked_area',
    x,
    width = width,
    height = height,
    package = 'PantheraWidgets',
    elementId = elementId
  )
}

#' Shiny bindings for p3_stacked_area
#'
#' Output and render functions for using p3_stacked_area within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a p3_stacked_area
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name p3_stacked_area-shiny
#' @export
p3_stacked_areaOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'p3_stacked_area', width, height, package = 'PantheraWidgets')
}

#' @rdname p3_stacked_area-shiny
#' @export
renderp3_stacked_area <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, p3_stacked_areaOutput, env, quoted = TRUE)
}
