#'  Bubble Chart Plot
#'
#' Plots relationship between three variables or three dimensions of data
#' with one represented as a buble displays
#'
#' @param dataset       List of numeric vectors containing the datasets to be
#'                      plotted.
#' @param data_names    List of characters defining the actual names of each data
#'                      defined in the dataset
#' @param axis_labels   Named list of characters defining the prefered chart
#'                      axis labels.
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
#' @return              Bubble Chart Plot.
#' @examples
#' bubble_data <- data.frame(
#'   group= c("Aardwolf","Serval","Hyaena_Brown","Civet_African","Leopard_African",
#'            "Jackal_Black_Backed","Lion_African","Cheetah","Genet_Large_Spotted",
#'            "Hyaena_Spotted"),
#'   scaled_values=c(318899230,37600523,733333216,912420476,940301927,520434176,98199783,99708573,1750448339,100392226),
#'   xvalues=c(974,5937,6223,4797,12779,34435,36126,29796,1391,33692),
#'   yvalues=c(43,76,72,42,75,81,79,75,64,79)
#'
#' )
#'
#' data_names <- c(group="Species",scaled_values="pop",xvalues="captures",yvalues="weight")
#'
#' p3_bubble_chart(dataset = bubble_data, data_names = data_names)
#' p3_bubble_chart(dataset = bubble_data)
#'
#' @import htmlwidgets
#'
#' @export
p3_bubble_chart <- function(dataset,data_names=NULL,axis_labels=NULL,
                            width = NULL, height = NULL, elementId = NULL) {


  if(is.null(axis_labels))
  {
    axis_labels <- list(x_axis="x",y_axis="y",scaled="Scale")
  }
  if(is.null(data_names)){
    data_names <- c(group="group",scaled_values="scaled",xvalues="xvalues",yvalues="yvalues")
  }
  # forward options using x
  xinput = list(
    data_columns = names(dataset),
    dataset = jsonlite::toJSON(dataset),
    groups = dataset$group,
    data_names = data_names,
    axis_labels = axis_labels

  )

  # create widget
  htmlwidgets::createWidget(
    name = 'p3_bubble_chart',
    xinput,
    width = width,
    height = height,
    package = 'PantheraWidgets',
    elementId = elementId
  )
}
#' Shiny bindings for p3_bubble_chart
#'
#' Output and render functions for using p3_bubble_chart within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a p3_bubble_chart
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name p3_bubble_chart-shiny
#'
#' @export
p3_bubble_chartOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'p3_bubble_chart', width, height, package = 'PantheraWidgets')
}

#' @rdname p3_bubble_chart-shiny
#' @export
renderP3_bubble_chart <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, p3_bubble_chartOutput, env, quoted = TRUE)
}
