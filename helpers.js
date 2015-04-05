/*Following function from StackOverflow*/
			function getRotationDegrees(obj) {
    			var matrix = $(obj).css("-webkit-transform") ||
    			$(obj).css("-moz-transform")    ||
    			$(obj).css("-ms-transform")     ||
    			$(obj).css("-o-transform")      ||
    			$(obj).css("transform");
    			if(matrix !== 'none') {
        			var values = matrix.split('(')[1].split(')')[0].split(',');
        			var a = values[0];
        			var b = values[1];
        			var angle = Math.round(Math.atan2(b, a) * (180/Math.PI));
    			} else { var angle = 0; }
    			return ((angle < 0) ? angle + 360 : angle)%360;
			}

			function rotate(degree,id) {
            	$("#"+id).css({
                        '-webkit-transform': 'rotate(' + degree + 'deg)',
                        '-moz-transform': 'rotate(' + degree + 'deg)',
                        '-ms-transform': 'rotate(' + degree + 'deg)',
                        '-o-transform': 'rotate(' + degree + 'deg)',
                        'transform': 'rotate(' + degree + 'deg)',
                        'zoom': 1
            	});
            }