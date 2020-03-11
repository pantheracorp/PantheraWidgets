#' @title Scatter Chart
#' @description          Plots a Scatter Chart using Cartesian coordinates
#'                       to display values of a given dataset
#' @param dataset        List of numeric vectors containing the datasets to be plotted
#' @param colors         A list of plot colors preffred for each dataset
#' @param axis_labels    Named list of characters defining the prefered chart axis labels
#' @param labels_pos    Named list of characters defining the prefered position of the axis labels
#'                       e.g for x-axis ( inner-center, inner-left, outer-right, outer-center, outer-left, inner-right [default] )
#'                       and  y-axis ( inner-middle, inner-bottom, outer-top, outer-middle, outer-bottom, inner-top [default] )
#' @param axis_regions  Named list of character lists defining the properties of regions to be shadded
#' @param subchart      Boolean option to show sub chart for zoom and selection
#'                      range.Default set to False.
#' @param zoom          Boolean option to Zoom by mouse wheel event and
#' @param width,height   Fixed width for widget (in css units). The default is
#'                       NULL, which results in intelligent automatic sizing
#'                       based on  the widget’s container.
#' @param elementId Use an explicit element ID for the widget. Useful if you have
#'                  other JavaScript that needs to explicitly discover and
#'                  interact with a specific widget instance. Default NULL
#'                  which results in an automatically generated one.
#' @examples
#' dataset <- list(
#' data1=c(30, 20, 50, 40, 60, 50),
#' data2=c(200, 130, 90, 240, 130, 220),
#' data3=c(300, 200, 160, 400, 250, 250))
#' axis_labels <- list(x_axis="Petals",y_axis="Sepals")
#' labels_pos <- list(xpos="outer-center",ypos="outer-middle")
#' colors <- list(data1="blue",data2="black",data3="red")
#' axis_regions <- list(list(axis='x',start= 1, end= 2,reg_class='regionX'),
#'                      list(axis='x',start=4, end=5,reg_class='regionX'))
#'
#'
#'
#' p3_scatter_chart(dataset,colors,axis_labels,labels_pos,axis_regions,TRUE,TRUE)
#' p3_scatter_chart(dataset,NULL,NULL,NULL,axis_regions,FALSE,TRUE,'80%','200%')
#' p3_scatter_chart(dataset,colors,axis_labels,labels_pos)
#' p3_scatter_chart(dataset,colors,axis_labels)
#' \dontrun{
#'
#'  p3_scatter_chart(dataset,colors,'100%','500%')
#' }
#'
#' @export

p3_scatter_chart <-function(dataset,colors = NULL,axis_labels = NULL,labels_pos = NULL,axis_regions=NULL,
                           subchart=FALSE,zoom=TRUE,width = NULL,
                           height = NULL,elementId=NULL) {

  #,elementId = NULL
  # forward options using x
  # axis_labels_pos = NULL,

  if(is.null(colors)){
    colors <- list()
  }
  if(is.null(labels_pos))
  {
    labels_pos <- list(xs="outer-right",ys="outer-bottom")
  }
  if(is.null(axis_labels))
  {
    axis_labels <- list(x_axis="x",y_axis="y")
  }
  if(is.null(axis_regions))
  {
    axis_regions <- list(list(axis='x',start=-1,end=-1,reg_class='regionX'))
  }


  x = list(
    dataset = dataset,
    colors = colors,
    axis_labels = axis_labels,
    labels_pos = labels_pos,
    axis_regions = axis_regions,
    subchart = subchart,
    zoom = zoom,
    elementId = elementId

  )

  # create widget
  htmlwidgets::createWidget(
    name = 'p3_scatter_chart',
    x,
    width = width,
    height = height,
    package = 'PantheraWidgets'

  )
}

#' Shiny bindings for Scatter
#'
#' Output and render functions for using p3_scatter_chart within Shiny
#' applications and interactive Rmd documents.
#'
#' @param outputId output variable to read from
#' @param width,height Must be a valid CSS unit (like \code{'100\%'},
#'   \code{'400px'}, \code{'auto'}) or a number, which will be coerced to a
#'   string and have \code{'px'} appended.
#' @param expr An expression that generates a Scatter
#' @param env The environment in which to evaluate \code{expr}.
#' @param quoted Is \code{expr} a quoted expression (with \code{quote()})? This
#'   is useful if you want to save an expression in a variable.
#'
#' @name p3_scatter_chart-shiny
#'
#' @export
p3_scatter_chartOutput <- function(outputId, width = '100%', height = '400px'){
  htmlwidgets::shinyWidgetOutput(outputId, 'p3_scatter_chart', width, height, package = 'PantheraWidgets')
}

#' @rdname p3_scatter_chart-shiny
#' @export
renderp3_scatter_chart <- function(expr, env = parent.frame(), quoted = FALSE) {
  if (!quoted) { expr <- substitute(expr) } # force quoted
  htmlwidgets::shinyRenderWidget(expr, p3_scatter_chartOutput, env, quoted = TRUE)
}
