$.widget( "custom.cardlabel", {
 
    // Default options.
    options: {
		label: "Card",
		color: "#FFCCFF"
	},
	
    _create: function() {
		var labelName = this.options.label;
		var labelColor = this.options.color;

        this.element
            .css( {"background-color": labelColor} )
            .text( labelName );
    }
});