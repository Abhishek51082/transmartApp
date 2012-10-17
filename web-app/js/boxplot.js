// Draw the box plot using D3
function drawBoxPlotD3(divId, boxPlotJSON, analysisID, forExport, title, isCTA)	{
	  // if not title is passed in (e.g. single box plot being drawn for non CTA, then the title will be based on active probe)
	  if (title == undefined)  {		  
		  var probeID = getActiveProbe(analysisID);
	 	  title = getGeneforDisplay(analysisID, probeID);
	  }

	  // boxPlotJSON should be a map of analysisId:[cohortID:[desc:cohort description, order:display order for the cohort, data:sorted log2 intensities]]	  
	  var allPlotData = setupPlotData(true, boxPlotJSON, forExport, analysisID, divId, title, isCTA);

	  // create the plot without any lines (just title, axes, legend)
 	  drawEmptyPlots(allPlotData, forExport, divId);
 	  
 	  for (var key in boxPlotJSON)  { 		  
	 	  var chartObject = allPlotData[key].emptyPlotData;
	 	  var plotData = allPlotData[key];

	 	  var chart = chartObject.chart;
	 	  var x=chartObject.x;
	 	  var y=chartObject.y;	 	  
	 	  
	 	  var wBox = chartObject.wBand * .4; 
	
	 	  
		  // create group for boxPlots  
	 	  var boxPlotsGroup = chart
			.append("g")
	        .attr("id", "boxplotId")
	        .attr("transform", "translate(" + chartObject.wBand/2 + ",0)")
			.attr("class", "boxes")
			.on("mouseover", function() {
				   jQuery('#boxplotId text.hoverText').show();
				})
			.on("mouseout", function() {
				   jQuery('#boxplotId text.hoverText').hide();
				})
	 	  	;
	
		  // draw range lines
	 	  var rangeLinesGroup = boxPlotsGroup
			.append("g")
			.attr("class", "plotLines");
	
	 	  var rangeLines = rangeLinesGroup
	         .selectAll(".line")
	    	.data(plotData.statMapping).enter().append("line")
	    	.attr('x1', function(d) {return x(d.id);})
	    	.attr('x2', function(d) {return x(d.id);})
	    	.attr('y1', function(d) {return y(d.min);})
	    	.attr('y2', function(d) {return y(d.max);})
	    	.attr("class", "rangeLines");
	    	;
		  
	 	 var wMinMaxLines = wBox/2;
		  // draw min lines
	 	  var minLinesGroup = boxPlotsGroup
			.append("g")
			.attr("class", "plotLines");
	
	 	  var minLines = minLinesGroup
	         .selectAll(".line")
	    	.data(plotData.statMapping).enter().append("line")
	    	.attr('x1', function(d) {return x(d.id) - wMinMaxLines/2;})
	    	.attr('x2', function(d) {return x(d.id) + wMinMaxLines/2;})
	    	.attr('y1', function(d) {return y(d.min);})
	    	.attr('y2', function(d) {return y(d.min);})
	    	;
	
	 	  // min line text for hovers
	 	 var minLinesText = minLinesGroup
	 	 	.selectAll(".text")
	 	 	.data(plotData.statMapping).enter().append("text")
	 	 	.attr('x', function(d) {return x(d.id) })
	 	 	.attr('y', function(d) {return y(d.min) + 1 ;})
	 	 	.attr("dy", ".71em")
	 	 	.attr('text-anchor', "middle")
	 	 	.attr('class', 'hoverText')
	 	 	.text(function(d) {return d.min.toFixed(2) })
		; 	  
	 	  
		  // draw max lines
	 	  var maxLinesGroup = boxPlotsGroup
			.append("g")
			.attr("class", "plotLines");
	
	 	  var maxLines = maxLinesGroup
	         .selectAll(".line")
	    	.data(plotData.statMapping).enter().append("line")
	    	.attr('x1', function(d) {return x(d.id) - wMinMaxLines/2;})
	    	.attr('x2', function(d) {return x(d.id) + wMinMaxLines/2;})
	    	.attr('y1', function(d) {return y(d.max);})
	    	.attr('y2', function(d) {return y(d.max);})
	    	;
	
	 	  // max line text for hovers
	  	 var maxLinesText = maxLinesGroup
	  	 	.selectAll(".text")
	  	 	.data(plotData.statMapping).enter().append("text")
	  	 	.attr('x', function(d) {return x(d.id) })
	  	 	.attr('y', function(d) {return y(d.max) - 1 ;})
	  	 	.attr('text-anchor', "middle")
	  	 	.attr('class', 'hoverText')
	  	 	.text(function(d) {return d.max.toFixed(2) })
	 	 ; 	  
	
	  	 // draw boxes (draw after the range lines have been drawn so that range line is behind box
		 var boxes = boxPlotsGroup
		    .selectAll(".rect")
		    .data(plotData.statMapping).enter().append("svg:rect")
		    .attr('width',wBox)
		    .attr('height',function(d){
		    	return y(d.lq) - y(d.uq);}   // height goes down from the upper quartile
		    )
		    .attr('x',  function(d){return (x(d.id) -  wBox/2);  } )	    
		    .attr('y', function(d){return y(d.uq)})   // start at upper
		    .style('fill', function (d) {return cohortBGColors[d.cohortDisplayStyle]})
		    ;	 	 
		 
	      // draw median lines
		  var medianLinesGroup = boxPlotsGroup
			.append("g")
			.attr("class", "plotLines");
	
		  var medianLines = medianLinesGroup
	        .selectAll(".line")
	        .data(plotData.statMapping).enter().append("line")
	        .attr('x1', function(d) {return x(d.id) - wBox/2;})
	        .attr('x2', function(d) {return x(d.id) + wBox/2;})
	        .attr('y1', function(d) {return y(d.median);})
	        .attr('y2', function(d) {return y(d.median);})
	   	;
	
		  // max line text for hovers
	 	 var medianLinesText = medianLinesGroup
	 	 	.selectAll(".text")
	 	 	.data(plotData.statMapping).enter().append("text")
	 	 	.attr('x', function(d) {return x(d.id) + wBox/2 + 2; })
	 	 	.attr('y', function(d) {return y(d.median);})
	 	 	.attr('text-anchor', "start")
	 	 	.attr('dy', '.35em')
	 	 	.attr('class', 'hoverText')
	 	 	.text(function(d) {return d.median.toFixed(2) })
		 ; 	  
		 
	 	 
		 // upper quartile text for hovers
	 	 var uqText = boxPlotsGroup
	 	 	.selectAll(".text")
	 	 	.data(plotData.statMapping).enter().append("text")
	 	 	.attr('x', function(d) {return x(d.id) - wBox/2 - 2; })
	 	 	.attr('y', function(d) {return y(d.uq);})
	 	 	.attr('text-anchor', "end")
	 	 	.attr('class', 'hoverText')
	 	 	.text(function(d) {return d.uq.toFixed(2) })
		 ; 	  
	
		 // lower quartile text for hovers
	 	 var lqText = boxPlotsGroup
	 	 	.selectAll(".text")
	 	 	.data(plotData.statMapping).enter().append("text")
	 	 	.attr('x', function(d) {return x(d.id) - wBox/2 - 2; })
	 	 	.attr('y', function(d) {return y(d.lq);})
	 	 	.attr('text-anchor', "end")
	 	 	.attr('dy', '.71em')
	 	 	.attr('class', 'hoverText')
	 	 	.text(function(d) {return d.lq.toFixed(2) })
		 ; 	  
	 	  	
		 applyPlotStyles(chartObject.svg);
	
	 	 if (!forExport)  {		
			drawScreenLegend(plotData.numCohorts, plotData.cohortArray, plotData.cohortDesc, plotData.cohortDisplayStyles, "boxplot", analysisID);
	  	 }
  }
		
}
