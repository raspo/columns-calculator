var CC = (function(){

    var el              = {
            fullWidth   : null,
            colNum      : null,
            singleWidth : null,
            colSpacing  : null,
            demoArea    : null
        },
        eventTimeout    = null,
        setValue        = function(fieldName, value){
            isFieldValid(el[fieldName], value);
            el[fieldName].val(value);
        },
        isFieldValid    = function(field, value){
            // are there any decimal numbers?
            if( value < 0 || value % 1 !== 0) {
                field.addClass('v-invalid');
            } else {
                field.removeClass('v-invalid');
            }
        },
        getFieldValue   = function( el ){
            var value = el.val() || 0;
            return parseFloat(value);
        },
        calculate       = function( fieldName ){
            var full    = getFieldValue(el.fullWidth),
                col     = getFieldValue(el.colNum),
                single  = getFieldValue(el.singleWidth),
                spacing = getFieldValue(el.colSpacing);

            // console.log('CALCULATE', full,col,single,spacing);

            if( full && col ){
                if( spacing && (fieldName != "singleWidth") ) {

                    single = ( full - ( spacing * ( col - 1) ) ) / col;

                    setValue( 'singleWidth', single );
                    demo( full, col, single, spacing );

                } else if( single && (fieldName != "colSpacing") ) {

                    spacing = ( full - ( single * col ) ) / ( col - 1 );
                    setValue( 'colSpacing', spacing );
                    demo( full, col, single, spacing );

                }
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
            el.fields.on('keyup change', function(e){
                var el          = $(this),
                    fieldName   = el.attr("id");

                // prevent multiple events from being fired at (almost) the same time
                clearTimeout(eventTimeout);
                eventTimeout = setTimeout(function(){
                    console.log('FIRE', fieldName, e.type);
                    isFieldValid(el, getFieldValue(el));
                    calculate(fieldName);
                }, 100);
            });
        },
        init            = function(){
            // Cache the jquery objects
            el = {
                fields      : $(".field"),
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