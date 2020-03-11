#'  Pie Chart
#'
#'  Display as Pie Chart based on the specified values.
#'
#' @param values List of numeric vector values to display in the Chart
#' @param legendPosition Character value specifying the legend positioning (bottom or right side).
#' @param width,height Fixed width for widget (in css units).The default is NULL
#'                     which results in intelligent automatic sizing based on the
#'                     widget’s container.
#' @param elementId Use an explicit element ID for the widget. Useful if you have
#'                  other JavaScript that needs to explicitly discover and
#'                  interact with a specific widget instance. Default NULL
#'                  which results in an automatically generated one.
#'
#' @return  Pie Chart
#'
#' @examples
#'
#' values <- list(setosa=c(30, 20, 50, 40, 60, 50),versicolor=c(200, 130, 90, 240, 130, 220))
#'
#' p3_pie(values)
#' p3_pie(values,legendPosition="right")
#'
#' @import htmlwidgets
#'
#' @export

p3_pie <- function(values, legendPosition = "bottom", width = NULL, height = NULL, elementId = NULL) {

  # forward options using x
  x = list(
    values = values,
    legendPosition = legendPosition
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'p3_pie',
    x,
    width = width,
    height = height,
    package = 'PantheraWidgets',
    elementId = elementId
  )
}

#' Shiny bindings for p3_pie
#'
#' Output and render functions for using p3_pie within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a p3_pie
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name p3_pie-shiny
#'
#' @export
p3_pieOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'p3_pie', width, height, package = 'PantheraWidgets')
}

#' @rdname p3_pie-shiny
#' @export
renderp3_pie <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, p3_pieOutput, env, quoted = TRUE)
}
