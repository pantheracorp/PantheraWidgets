#' <Add Title>
#'
#' <Add Description>
#'
#' @import htmlwidgets
#'
#' @export
p3_actvty_pttrns <- function(dataset, colors, width = NULL, height = NULL, elementId = NULL) {

  # forward options using x
  x = list(
    dataset  = dataset,
    colors   = colors
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
  htmlwidgets::shinyWidgetOutput(outputId, 'p3_actvty_pttrns', width, height, package = 'PantheraWidgets')
}

#' @rdname p3_actvty_pttrns-shiny
#' @export
renderP3_actvty_pttrns <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, p3_actvty_pttrnsOutput, env, quoted = TRUE)
}
