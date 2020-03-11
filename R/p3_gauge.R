#' Gauge Chart
#'
#' Display as Gauge Chart for specific data value
#'
#' @param value A numeric value for the guage.
#' @param width,height  Must be a valid CSS unit (like '100%','400px', 'auto')
#'                      or a number, which will be coerced to a string and have
#'                      'px' appended.The default is NULL, which results in
#'                      intelligent automatic sizing based on the chart’s
#'                      container.
#' @param elementId 	  Use an explicit element ID for the widget Useful if you
#'                      have other JavaScript that needs to explicitly discover
#'                      and interact with a specific widget instance .In any
#'                      other case leave as NULL which results in an
#'                      automatically generated one.
#' @examples
#' p3_gauge(45)
#' p3_gauge('45')
#'
#'
#' @import htmlwidgets
#'
#' @export
p3_gauge <- function(value, width = NULL, height = NULL, elementId = NULL) {

  # forward options using x
  x = list(
    data = value
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'p3_gauge',
    x,
    width = width,
    height = height,
    package = 'PantheraWidgets',
    elementId = elementId
  )
}

#' Shiny bindings for p3_gauge
#'
#' Output and render functions for using p3_gauge within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a p3_gauge
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name p3_gauge-shiny
#'
#' @export
p3_gaugeOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'p3_gauge', width, height, package = 'PantheraWidgets')
}

#' @rdname p3_gauge-shiny
#' @export
renderp3_gauge <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, p3_gaugeOutput, env, quoted = TRUE)
}
