var CC = (function(){

    var el              = {
            fullWidth   : null,
            colNum      : null,
            singleWidth : null,
            colSpacing  : null,
            demoArea    : null
        },
        calculate       = function( focussed ){
            var full    = el.fullWidth.val() || 0,
                col     = el.colNum.val() || 0,
                single  = el.singleWidth.val() || 0,
                spacing = el.colSpacing.val() || 0;

            console.log('CALCULATE', full,col,single,spacing);

            if( is_set(full) && is_set(col) ){

                if( is_set(spacing) && (focussed != "singleWidth") ) {

                    single = ( full - ( spacing * ( col - 1) ) ) / col;
                    el.singleWidth.val(single);
                    demo( full, col, single, spacing );

                } else if( is_set(single) && (focussed != "colSpacing") ) {

                    spacing = ( full - ( single * col ) ) / ( col - 1 );
                    el.colSpacing.val(spacing);
                    demo( full, col, single, spacing );

                }

            }
        },
        // Check if the value is set
        is_set          = function(value){
            if ( (value !== "") && (value !== 0) ) {
                return true;
            } else {
                return false;
            }
        },
        // Update the demo area
        demo            = function( full, col, single, spacing ){
            if ( full > 960 ){
                single = ( 960 * single ) / full;
                spacing = ( 960 * spacing ) / full;
                full = 960;
            }
            el.demoArea.width( full ).html("");
            for( i=0; i<col; i++){
                $("<div />", {
                    'class' : 'col',
                    'css'   : {
                        width       : single,
                        marginLeft  : (i===0) ? 0 : spacing+"px"
                    }
                }).appendTo(el.demoArea);
            }
        },
        registerEvents  = function(){
            el.fields.on('keyup', function(e){
                var focussed = $(this).attr("id");

                // If the UP arrow is pressed
                if( e.keyCode == 38 ){
                    // $(this).val( parseInt($(this).val()) + 1 );
                // If the DOWN arrow is pressed
                }else if( e.keyCode == 40 ){
                    // $(this).val( parseInt($(this).val()) - 1 );
                }

                calculate(focussed);
            });
        },
        init            = function(){

            // Cache the jquery objects
            el = {
                fields      : $(".form"),
                fullWidth   : $("#fullWidth"),
                colNum      : $("#colNum"),
                singleWidth : $("#singleWidth"),
                colSpacing  : $("#colSpacing"),
                demoArea    : $("#demo")
            };

            registerEvents();

            // Calculate on page load
            calculate();
        };

    return {
        init    : init
    };

}());


$(document).ready(function(){

    CC.init();

});