#' Single Image Viewer
#'
#' Renders a single image viewer
#' @param width,height  Should be set to 0. The targeted element width and height
#'                      will be used instead.
#' @param elementId 	  Use an explicit element ID where the viewer will be
#'                      displayed.This can be the ID of a div element on your
#'                      page.
#' @import htmlwidgets
#'
#' @example
#'
#' PantheraIDSImageCropper::sngl_img_viewer(
#' filename = "img_idntfctn_scndry.csv",
#' elementId = "spcs_idntfctn_id_rf_2",
#' width = 0,
#' height = 0),
#'
#' @export
sngl_img_viewer <- function(elementId = NULL,width = NULL, height = NULL) {

  # forward options using x
  x = list(
    width = width,
    height = height,
    targetId = elementId
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'sngl_img_viewer',
    x,
    width = width,
    height = height,
    package = 'PantheraWidgets',
    elementId = elementId
  )
}

#' Shiny bindings for sngl_img_viewer
#'
#' Output and render functions for using sngl_img_viewer within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a sngl_img_viewer
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name sngl_img_viewer-shiny
#'
#' @export
sngl_img_viewerOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'sngl_img_viewer', width, height, package = 'PantheraWidgets')
}

#' @rdname sngl_img_viewer-shiny
#' @export
renderSngl_img_viewer <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, sngl_img_viewerOutput, env, quoted = TRUE)
}
