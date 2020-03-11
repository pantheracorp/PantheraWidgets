#' Stacked Bar Chart
#'
#' Plots a series of bar charts stacked according to specified data_groups
#' @param dataset       List of numeric vectors specifying the datasets to be plotted.
#' @param data_groups   List of character vectors defining different groupings for the chart.
#' @param colors        Named list with colors for the data series in the chart.
#'                      NULL results in an random automatically generated colors.
#' @param axis_labels   Named list of characters defining the prefered chart axis labels
#' @param labels_pos    Named list of characters defining the prefered position of the axis labels
#'                       e.g for x-axis ( inner-center, inner-left, outer-right, outer-center, outer-left, inner-right [default] )
#'                       and  y-axis ( inner-middle, inner-bottom, outer-top, outer-middle, outer-bottom, inner-top [default] )
#' @param axis_rotate   Boolean value to determine axis rotation. Default is set
#'                      to False.
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
#' @return              Stacked Bar Chart with specified parms.
#' @examples
#' dataset <- list(
#' data1=c(30, 20, 50, 40, 60, 50),
#' data2=c(200, 130, 90, 240, 130, 220),
#' data3=c(300, 200, 160, 400, 250, 250),
#' data4=c(200, 130, 90, 240, 130, 220))
#'
#' data_groups <- list(grp1=c('data1','data3'),grp2=c('data2','data4'))
#' colors <- list(data1="orange",data2="green",data3="red")
#' axis_labels <- list(x_axis="species",y_axis="frequency")
#' labels_pos <- list(xpos="outer-center",ypos="outer-middle")
#'
#' p3_stacked_bar_chart(dataset,data_groups,colors,labels_pos=labels_pos)
#' p3_stacked_bar_chart (dataset,data_groups,colors,axis_labels,labels_pos,subchart=TRUE)
#'
#' @import htmlwidgets
#'
#' @export
p3_stacked_bar_chart <- function(dataset,data_groups,colors=NULL,axis_labels=NULL,
                                 labels_pos=NULL,axis_rotate=FALSE,subchart=FALSE,zoom=TRUE,
                                 width=NULL, height=NULL, elementId=NULL) {

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
    data_groups  = data_groups,
    colors = colors,
    axis_labels = axis_labels,
    labels_pos = labels_pos,
    axis_rotate = axis_rotate,
    subchart = subchart,
    zoom = zoom
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'p3_stacked_bar_chart',
    x,
    width = width,
    height = height,
    package = 'PantheraWidgets',
    elementId = elementId
  )
}

#' Shiny bindings for p3_stacked_bar_chart
#'
#' Output and render functions for using p3_stacked_bar_chart within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a p3_stacked_bar_chart
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name p3_stacked_bar_chart-shiny
#'
#' @export
p3_stacked_bar_chartOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'p3_stacked_bar_chart', width, height, package = 'PantheraWidgets')
}

#' @rdname p3_stacked_bar_chart-shiny
#' @export
renderp3_stacked_bar_chart <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, p3_stacked_bar_chartOutput, env, quoted = TRUE)
}


