#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
PWgauge <- function(value, width = NULL, height = NULL, elementId = NULL) {

  # forward options using x
  x = list(
    data = value
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'PWgauge',
    x,
    width = width,
    height = height,
    package = 'PantheraWidgets',
    elementId = elementId
  )
}

#' Shiny bindings for PWgauge
#'
#' Output and render functions for using PWgauge within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a PWgauge
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name PWgauge-shiny
#'
#' @export
PWgaugeOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'PWgauge', width, height, package = 'PantheraWidgets')
}

#' @rdname PWgauge-shiny
#' @export
renderPWgauge <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, PWgaugeOutput, env, quoted = TRUE)
}
