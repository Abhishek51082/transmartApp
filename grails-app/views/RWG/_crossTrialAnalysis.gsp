
<script type="text/javascript">		
	jQuery(function ($) {

		//displayxtAnalysesList();

    	jQuery( "#xtSelectedAnalysesList" ).sortable();
    	jQuery( "#xtSelectedAnalysesList" ).disableSelection();

    	jQuery('#xtSummaryChartArea').sortable();
    	

    //	displaySelectedAnalysisTopGenes();
    	addXTSearchAutoComplete();

		
	});
</script>



<div id="xtHolder">
	<div id="xtMenuBar">
		<h1>Cross Trial Analysis</h1>
		<ul id="xtMenu">
			<li>Summary</li>
			<li>Heatmap</li>
			<li><a href="#" onclick="javascript:jQuery('#xtBoxplot').show();">Boxplot</a></li>
		</ul>
	</div>
	
		
	<div id ="xtSearch">
		<input id="xtSearch-ac"/></input> 
	</div>
	
	
	<div id="xtSummary"><!-- Summary Tab Content -->
	
	<div id="xtSummaryChartArea"></div>
			
	<h2>Selected Analyses</h2>
	
	
	<div id="xtSummary_AnalysesList"></div>

	<div id="xtTopGenes"></div>
	
	<div id="xtBioMarkerSummary"></div>
			

</div>
<div id="xtHeatmap"><!-- Heatmap Tab Content -->


</div>
<div id="xtBoxplot" style="display:none"><!-- Boxplot Tab Content -->
	
	
	</div>
</div>


