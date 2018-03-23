#' p3_stacked_chart
#'
#' @param dataset todo
#' @param colors named list given series colors e.g. list(data1 = "purple", data2 = "blue", data3 = "gray")
#' @param types  named list given series chart types e.g. list(data1 = "bar", data2 = "bar", data3 = "bar")
#' @param groups vector given stacking order e.g. c("data1","data2","data3")
#' @param subchart boolean, should a subchart be show with a brushable area?
#' @param axis_type what type of x-axis should be drawn, either timeseries, category or indexed, defaults to timeseries
#' @param categories category labels
#' @param width chart width
#' @param height chart height
#' @export
#'
  p3_stacked_chart <- function(dataset, colors, types = NULL, groups = NULL, subchart = FALSE, axis_type = "timeseries", categories = NULL, width = NULL, height = NULL) {

    if(is.null(types)){
      types         <- list()
      types[groups] <-"bar"
    }

    # forward options using x
    x = list(
      dataset = dataset,
      colors  = colors,
      groups  = groups,
      subchart = subchart,
      axis_type = axis_type,
      categories = categories,
      types   = types
    )

    # create widget
    htmlwidgets::createWidget(
      name = 'p3_stacked_chart',
      x,
      width = width,
      height = height,
      package = 'PantheraWidgets'
    )
  }

  #' Shiny bindings for p3_stacked_chart
  #'
  #' Output and render functions for using p3_stacked_chart within Shiny
  #' applications and interactive Rmd documents.
  #'
  #' @param outputId output variable to read from
  #' @param width,height Must be a valid CSS unit (like \code{'100\%'},
  #'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
  #'   string and have \code{'px'} appended.
  #' @param expr An expression that generates a p3_stacked_chart
  #' @param env The environment in which to evaluate \code{expr}.
  #' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
  #'   is useful if you want to save an expression in a variable.
  #'
  #' @name p3_stacked_chart-shiny
  #'
  #' @export
  p3_stacked_chartOutput <- function(outputId, width = '100%', height = '400px'){
    htmlwidgets::shinyWidgetOutput(outputId, 'p3_stacked_chart', width, height, package = 'PantheraWidgets')
  }

  #' @rdname p3_stacked_chart-shiny
  #' @export
  renderp3_stacked_chart <- function(expr, env = parent.frame(), quoted = FALSE) {
    if (!quoted) { expr <- substitute(expr) } # force quoted
    htmlwidgets::shinyRenderWidget(expr, p3_stacked_chartOutput, env, quoted = TRUE)
  }


  #' Zooms an existing PantheraWidgetsChart from shiny
  #'
  #' @param chartProxy
  #' @param minX date start
  #' @param maxX date end
  #' @return PantheraWidgets proxy object
  #' @export
  zoomChart <- function(chartProxy, minX, maxX){
    Data <- list(id = chartProxy$id,minX = minX, maxX = maxX)

    chartProxy$session$sendCustomMessage("zoomChart", Data)

    return(chartProxy)
  }

  #' Sets the colors of an existing PantheraWidgets chart
  #'
  #' @param chartProxy PantheraWidgets chart proxy object
  #' @param colors named list with colors for the data series in the chart
  #' @return PantheraWidgets proxy object
  #' @export
  setColors <- function(chartProxy,colors){
    Data <- list(id = chartProxy$id,colors = colors)

    chartProxy$session$sendCustomMessage("setColors", Data)

    return(chartProxy)
  }



  #' Set chart groups
  #'
  #' @param chartProxy PantheraWidgets chart proxy object
  #' @param groups vector containing groups used to stack the chart
  #' @return PantheraWidgets proxy object
  #' @export
  setGroups <- function(chartProxy, groups){
    Data <- list(id = chartProxy$id, groups = groups)

    chartProxy$session$sendCustomMessage("setGroups", Data)

    return(chartProxy)
  }


  #' Set chart types
  #'
  #' @param chartProxy PantheraWidgets chart proxy object
  #' @param message list containing data series types
  #' @return PantheraWidgets proxy object
  #' @export
  setTypes <- function(chartProxy, info){
    Data <- list(id = chartProxy$id, info = info)

    chartProxy$session$sendCustomMessage("setTypes", Data)

    return(chartProxy)
  }


  #' Set all chart types simulaneously
  #'
  #' @param chartProxy PantheraWidgets chart proxy object
  #' @param message list containing data series type
  #' @return PantheraWidgets proxy object
  #' @export
  transformTo <- function(chartProxy, type){
    Data <- list(id = chartProxy$id, type = type)

    chartProxy$session$sendCustomMessage("transformTo", Data)

    return(chartProxy)
  }

#' Shiny bindings for p3_stacked_chart
#'
#' Output and render functions for using p3_stacked_chart within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a p3_stacked_chart
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name p3_stacked_chart-shiny
#'
#' @export
p3_stacked_chartOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'p3_stacked_chart', width, height, package = 'PantheraWidgets')
}

#' @rdname p3_stacked_chart-shiny
#' @export
renderp3_stacked_chart <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, p3_stacked_chartOutput, env, quoted = TRUE)
}
