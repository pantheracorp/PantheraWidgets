#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
PWpie <- function(values, legendPosition = "bottom", width = NULL, height = NULL, elementId = NULL) {

  # forward options using x
  x = list(
    values = values,
    legendPosition = legendPosition
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'PWpie',
    x,
    width = width,
    height = height,
    package = 'PantheraWidgets',
    elementId = elementId
  )
}

#' Shiny bindings for PWpie
#'
#' Output and render functions for using PWpie within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a PWpie
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name PWpie-shiny
#'
#' @export
PWpieOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'PWpie', width, height, package = 'PantheraWidgets')
}

#' @rdname PWpie-shiny
#' @export
renderPWpie <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, PWpieOutput, env, quoted = TRUE)
}
