$(document).ready(function(){
	
	// Cache the jquery objects
	var fullWidth	= $("#fullWidth"),
		colNum		= $("#colNum"),
		singleWidth = $("#singleWidth"),
		colSpacing	= $("#colSpacing"),
		demoArea	= $("#demo");

	// Do the calculation
	function calculate( focussed ){
		
		var full	= fullWidth.val(),
			col		= colNum.val(),
			single	= singleWidth.val(),
			spacing	= colSpacing.val();
			
		if( is_set(full) && is_set(col) ){
			
			if( is_set(spacing) && (focussed != "singleWidth") ) {
				
				var single = ( full - ( spacing * ( col - 1) ) ) / col;
				singleWidth.val(single);
				demo( full, col, single, spacing );
				
			} else if( is_set(single) && (focussed != "colSpacing") ) {
				
				var spacing = ( full - ( single * col ) ) / ( col - 1 );
				colSpacing.val(spacing);
				demo( full, col, single, spacing );
				
			}
			
		}
		
	}
	
	// Check if the value is set
	function is_set(value){
		if ( (value != "") && (value != 0) ) {
			return true;
		} else {
			return false
		}
	}
	
	// Update the demo area
	function demo( full, col, single, spacing ){
		if ( full > 960 ){
			single = ( 960 * single ) / full;
			spacing = ( 960 * spacing ) / full;
			full = 960;
		}
		demoArea.width( full );
		demoArea.html("");
		for( i=0; i<col; i++){
			$("<div />", {
				className : 'col',
				css : {
					width: single,
					marginLeft: (i==0) ? 0 : spacing+"px"
				}
			}).appendTo(demoArea);
		}
	}
	
	// Calculate on keyup
	$(".form").keyup(function(e){
		var focussed = $(this).attr("id");
		// If the UP arrow is pressed
		if( e.keyCode == 38 ){
			$(this).val( parseInt($(this).val()) + 1 );
		// If the DOWN arrow is pressed
		}else if( e.keyCode == 40 ){
			$(this).val( parseInt($(this).val()) - 1 );
		}
		calculate(focussed);
	});
	
	// Calculate on page load
	calculate();

});