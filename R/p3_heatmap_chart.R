#' heatmap chart
#'
#' Plots a heatmap Chart for a specified set of data with color mapped value.
#' @param dataset       List of vectors containing the datasets to be
#'                      plotted.
#' @param data_names    List of characters defining the actual names of each data
#'                      defined in the dataset
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
#' @return              Heatmap Chart Plot
#' @examples
#'
#' data_names <- c(groups="Species",variables="Station",values="Images")
#' data <- data.frame(
#'   groups = sort(
#'     rep(
#'       c("Aardwolf","Serval","Hyaena_Brown","Civet_African","Leopard_African",
#'         "Jackal_Black_Backed","Lion_African","Cheetah","Genet_Large_Spotted",
#'         "Hyaena_Spotted"
#'       ),
#'       10
#'     )
#'   ),
#'   variables = rep(
#'     c("StationStation1","StationStation2","StationStation3","StationStation4",
#'       "StationStation5","StationStation6","StationStation7","StationStation8",
#'       "StationStation9","StationStation10"
#'     ),
#'     10
#'   ),
#'   values = round(
#'     runif(100,min=0,max=10000),
#'     0
#'   )
#' )
#' p3_heatmap_chart(dataset=data,data_names=data_names)
#' p3_heatmap_chart(data)
#'
#' @import htmlwidgets
#'
#' @export
p3_heatmap_chart <- function(dataset,data_names=NULL, width = NULL, height = NULL, elementId = NULL) {

  if(is.null(width)){

    width = 960
  }

  if(is.null(height)){
    height = 500
  }

  if(is.null(data_names)){
    data_names <- c(groups="group",variables="variable",values="value")
  }
  # forward options using x
  xinput = list(
    allgroups = dataset$groups,
    dataset = jsonlite::toJSON(dataset),
    data_names = data_names,
    width = width,
    height = height
  )

  # create widget
  htmlwidgets::createWidget(
    name = 'p3_heatmap_chart',
    xinput,
    width = width,
    height = height,
    package = 'PantheraWidgets',
    elementId = elementId
  )
}

#' Shiny bindings for p3_heatmap_chart
#'
#' Output and render functions for using p3_heatmap_chart within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a p3_heatmap_chart
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name p3_heatmap_chart-shiny
#'
#' @export
p3_heatmap_chartOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'p3_heatmap_chart', width, height, package = 'PantheraWidgets')
}

#' @rdname p3_heatmap_chart-shiny
#' @export
renderP3_heatmap_chart <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, p3_heatmap_chartOutput, env, quoted = TRUE)
}
