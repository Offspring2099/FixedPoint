/**
 * FixedPoint.js - Anchors an HTML element to a background image.
 * v1.0.0.1
 *
 */


/**
 * @param bgWidth 		- width of background image you are using
 * @param bgHeight 		- height of background image you are using
 * @param targetObject 	- target object to be plotted. Ex. "#rock" 
 * @param align 		- 'left' or 'right' - use to top left or top right corner of the targetObject as an anchor
 * @param ptX 			- x coordinate of the object being plotted, relative to the background image
 * @param ptY 			- y coordinate of the object being plotted, relative to the background image
 */
function FixedPoint(bgWidth, bgHeight, targetObject, align, ptX, ptY) {
	var self = this;
    this.bgHeight = bgHeight;
    this.bgWidth = bgWidth;
    this.targetObject = targetObject;
    this.align = align;
	this.ptX = ptX;
    this.ptY = ptY;

    this.plot(); 
	
	$(window).resize(function() {
		self.plot();
	});
	
    $(this.targetObject).css("display", "block"); 
}

/**
 * Plots the element
 */
FixedPoint.prototype.plot = function() {
	var height 	= $(window).height();
    var width 	= $(window).width();

    var bgRatio = this.bgWidth / this.bgHeight ;
    var windowRatio = width/height ;
	
	var tmp;
	var newX;
	var newY;

    //Width is proportionally greater
    if(windowRatio >= bgRatio ) {
        newX    = Math.floor( (this.ptX*width)/this.bgWidth );
        tmp     = (((this.bgHeight*width)/this.bgWidth)-height)/2;
        newY    = Math.floor( ((((this.bgHeight*width)/this.bgWidth)*this.ptY)/this.bgHeight)-tmp );

    //Height is proportionally greater
    } else if(windowRatio < bgRatio)  {
        tmp     = (((this.bgWidth*height)/this.bgHeight)-width)/2;
        newX    = Math.floor( ((((this.bgWidth*height)/this.bgHeight)*this.ptX)/this.bgWidth)-tmp );
        newY = Math.floor( (this.ptY*height)/this.bgHeight );
    }
	
	if(this.align=="left"){
		$(this.targetObject).css("left", newX); 
	}else if(this.align=="right"){
		$(this.targetObject).css("left", newX-$(this.targetObject).outerWidth());
	}
	
	$(this.targetObject).css("top", newY); 
}
