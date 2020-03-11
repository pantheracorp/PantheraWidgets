#'  Activity Patterns Chart
#'
#' Plots the captured species activity during a 24 hr time period .
#'
#' @param dataset       List of numeric vectors containing the datasets to be
#'                      plotted.
#' @param colors        Named list with colors for the data series in the chart.
#'                      NULL results in an random automatically generated colors.
#' @param show_points   Boolean option to show data values on the chart plot.
#' @param categories    List of characters of prefered categories used to show
#'                      ticks as categorized by each data.See examples for more
#'                      details.
#' @param axis_regions  Named list of character list defining the properties
#'                      of regions to be shadded.
#' @param axis_labels   Named list of characters defining the prefered chart
#'                      axis labels.
#' @param labels_pos    Named list of characters defining the prefered position
#'                      of the axis labels.
#'                      e.g for x-axis ( inner-center, inner-left, outer-right,
#'                      outer-center, outer-left, inner-right [default] )
#'                      and  y-axis ( inner-middle, inner-bottom, outer-top,
#'                      outer-middle, outer-bottom, inner-top [default] )
#' @param axis_rotate   Boolean value to determine axis rotation. Default is set
#'                      to False.
#' @param subchart      Boolean option to show sub chart for zoom and selection
#'                      range. The Default set to False.
#' @param zoom          Boolean option to Zoom by mouse wheel event and
#'                      slide by drag. Default set to True.
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
#' @return              Activity Patterns Chart.
#' @examples
#' dataset <- list(
#' data1=c(200, 130, 90, 240, 130, 220),
#' data2=c(300, 200, 160, 400, 250, 250),
#' data3=c(10, 20, 50, 40, 80, 65))
#'
#' axis_labels <- list(x_axis="Time",y_axis="Kernel Density")
#' colors <- list(data1="orange",data2="green",data3="red")
#' axis_regions <- list(list(axis='x',start= 1,end= 4,reg_class='regionX'),
#'                        list(axis='x',start= 18,end= 24,reg_class='regionX'))
#' labels_pos <- list(xpos="outer-center",ypos="outer-middle")
#' categories <- list("0:00","01:00","02:00","03:00","04:00","05:00")
#' p3_actvty_pttrns(dataset, colors,axis_regions=axis_regions)
#' p3_actvty_pttrns(dataset, colors,TRUE,categories,axis_regions,axis_labels,
#'                  labels_pos,subchart=TRUE)
#'
#' @import htmlwidgets
#'
#' @export
p3_actvty_pttrns <- function(dataset, colors = NULL,show_points=FALSE,
                             categories=NULL,axis_regions=NULL,axis_labels=NULL,
                             labels_pos=NULL,axis_rotate=FALSE,subchart=FALSE,
                             zoom=TRUE, width=NULL,height=NULL,elementId=NULL){


  # , axis_regions=NULL
  if(is.null(colors))
  {
    colors <- list()
  }

  if(is.null(categories))
  {
    categories <- list("0:00","01:00","02:00","03:00","04:00","05:00",
                       "06:00","07:00","08:00","09:00","10:00","11:00",
                       "12:00","13:00","14:00","15:00","16:00","17:00",
                       "18:00","19:00","20:00","21:00","22:00","23:00",
                       "24:00")
  }

  if(is.null(axis_regions))
  {
    axis_regions <- list(list(axis='x',start=-1,end=-1,reg_class='regionX'))
  }

  if(is.null(axis_labels))
  {
    axis_labels <- list(x_axis="Time",y_axis="Kernel Density")
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
    categories = categories,
    axis_regions = axis_regions,
    axis_labels = axis_labels,
    labels_pos = labels_pos,
    axis_rotate = axis_rotate,
    subchart = subchart,
    zoom = zoom
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'p3_actvty_pttrns',
    x,
    width = width,
    height = height,
    package = 'PantheraWidgets',
    elementId = elementId
  )
}

#' Shiny bindings for p3_actvty_pttrns
#'
#' Output and render functions for using p3_actvty_pttrns within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a p3_actvty_pttrns
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name p3_actvty_pttrns-shiny
#'
#' @export
p3_actvty_pttrnsOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'p3_actvty_pttrns', width, height,
                                 package = 'PantheraWidgets')
}

#' @rdname p3_actvty_pttrns-shiny
#' @export
renderP3_actvty_pttrns <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, p3_actvty_pttrnsOutput, env, quoted = TRUE)
}
