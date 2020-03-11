#' Donut Chart
#'
#' Generates a Donut Chart for specified values
#'
#' @param values List of numeric vectors containing the datasets to be plotted
#' @param colors Named list with colors for the data series in the chart.
#'               NULL results in an random automatically generated colors.
#' @param title Character Value for donut chart title. Default title is set to 'Title'
#' @param width,height Fixed width for widget (in css units).The default is NULL
#'                     which results in intelligent automatic sizing based on the
#'                     widget’s container.
#' @param elementId Use an explicit element ID for the widget. Useful if you have
#'                  other JavaScript that needs to explicitly discover and
#'                  interact with a specific widget instance. Default NULL
#'                  which results in an automatically generated one.
#'
#' @return  Donut Chart
#'
#' @examples
#'
#' values <- list(
#' setosa=c(30, 20, 50, 40, 60, 50),
#' versicolor=c(200, 130, 90, 240, 130, 220))
#'
#' p3_donut(values)
#' p3_donut(values,title = "Age")
#'
#' @import htmlwidgets
#'
#' @export
p3_donut <- function(values,colors=NULL,title=NULL, width = NULL, height = NULL, elementId = NULL) {

  if(is.null(colors)){
    colors <- list()
  }
  if(is.null(title))
  {
    title = "Title"
  }
  # forward options using x
  x = list(
    values = values,
    colors = colors,
    title = title
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'p3_donut',
    x,
    width = width,
    height = height,
    package = 'PantheraWidgets',
    elementId = elementId
  )
}

#' Shiny bindings for p3_donut
#'
#' Output and render functions for using p3_donut within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a p3_donut
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name p3_donut-shiny
#'
#' @export
p3_donutOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'p3_donut', width, height, package = 'PantheraWidgets')
}

#' @rdname p3_donut-shiny
#' @export
renderp3_donut <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, p3_donutOutput, env, quoted = TRUE)
}
