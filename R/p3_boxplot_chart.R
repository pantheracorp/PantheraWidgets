#'  BoxPlot Chart
#'
#' Plots groups of numerical data through their quartiles.
#'
#' @param dataset       List of numeric vectors containing the datasets to be
#'                      plotted.
#' @param axis_labels   Named list of characters defining the prefered chart
#'                      axis labels.
#' @param show_points   Boolean option to show data values on the chart plot.
#' @param axis_rotate   Boolean value to determine axis rotation. Default is set
#'                      to False.
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
#' @return              Box Plot Chart.
#' @examples
#'
#' data <- list(
#' Aardwolf=c(77,77,77,69,89,20,85,77,100,41,37,98,58,80,100,61,26,43,61,66,14,
#'            76,60,10),
#' Serval=c(93,70,95,1,29,83,11,55,21,76,40,62,41,99,89,4,20,17,23,85,89,9,79,17),
#' Hyaena_Black=c(44, 21, 56,73,70,66,8 ,85,45,35,82,61,40,43,58,46,33,94,46,90,
#'                56,24,11,2 ),
#' Civet_African=c(34, 41, 49, 71, 1, 65, 7, 99, 28, 45, 58, 23, 9, 63, 85, 56, 90, 67, 10,69, 64, 5, 42, 30),
#' Genet_Large_Spotted=c(9, 17, 20, 27, 29, 32, 37, 38, 40, 42, 45, 46, 48, 51, 57, 58, 65, 69, 70, 73, 83, 84, 88, 92),
#' Hyaena_Brown=c(2, 4, 5, 12, 15, 18, 22, 23, 28, 31, 36, 41, 58, 64, 65, 67, 68, 71, 74, 83, 85, 89, 92, 98),
#' Serva=c(1, 4, 10, 21, 23, 28, 33, 38, 45, 47, 52, 54, 57, 62, 65, 67, 72, 74, 79, 81, 84, 90, 93, 99),
#' Jackal_Black_Backed=c(2, 4, 12, 19, 20, 25, 29, 37, 38, 45, 50, 52, 53, 60, 65, 71, 75, 80, 84, 88, 89, 90, 94, 100),
#' Cheetah=c(1, 3, 7, 14, 16, 19, 26, 37, 38, 41, 42, 44, 50, 51, 59, 62, 65, 66, 67, 72, 75, 80, 84, 90),
#' Leopard_African=c(1, 2, 3, 9, 24, 35, 36, 37, 39, 43, 49, 53, 60, 61, 64, 66, 68, 72, 74, 76, 78, 93, 98, 100),
#' Lion=c(2, 3, 4, 7, 8, 20, 21, 24, 40, 42, 47, 56, 59, 63, 66, 74, 79, 80, 82, 87, 88, 93, 94, 96)
#' )
#'
#'
#' axis_labels <- list(x_axis="Species",y_axis="Kernel Density")
#' p3_boxplot_chart(dataset = data, axis_labels  = axis_labels )
#' p3_boxplot_chart(dataset = data, axis_labels  = axis_labels, show_points = FALSE )
#'
#' @import htmlwidgets
#'
#' @export
p3_boxplot_chart <- function(dataset,axis_labels=NULL,show_points=TRUE,
                             axis_rotate=FALSE,width = NULL,height = NULL,elementId = NULL) {

  axis_rotate = FALSE

  if(is.null(width)){

    width = 960
  }

  if(is.null(height)){
    height = 500
  }

  if(is.null(axis_labels))
  {
    axis_labels <- list(x_axis="x",y_axis="y")
  }
  #if(is.null(data_names)){
  #  data_names <- c(group="group",scaled_values="scaled",xvalues="xvalues",yvalues="yvalues")
  #}
  # forward options using x
  xinput = list(
    dataset = jsonlite::toJSON(dataset),
    #data_names = data_names,
    axis_labels = axis_labels,
    show_points = show_points,
    axis_rotate = axis_rotate,
    width = width,
    height = height
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'p3_boxplot_chart',
    xinput,
    width = width,
    height = height,
    package = 'PantheraWidgets',
    elementId = elementId
  )
}
#' Shiny bindings for p3_boxplot_chart
#'
#' Output and render functions for using p3_boxplot_chart within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a p3_boxplot_chart
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name p3_boxplot_chart-shiny
#'
#' @export
p3_boxplot_chartOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'p3_boxplot_chart', width, height, package = 'PantheraWidgets')
}

#' @rdname p3_boxplot_chart-shiny
#' @export
renderP3_boxplot_chart <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, p3_boxplot_chartOutput, env, quoted = TRUE)
}
