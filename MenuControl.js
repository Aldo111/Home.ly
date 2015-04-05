		var menus = ["Switches", "Modes"];
		
		
			var menuControl;

			function MenuControl(sw) {
		
			//private
			var current_menu = 0;
		    if (typeof sw == "undefined")
				sw = [];
				
			var menu = sw;
			
			
			for (i in menu)
			{
				$(".panels").append("<section class='panel' id='menu_"+i+"'><h3>"+menu[i]+"</h3></section>");
			}
			
			var id="#menu_"+current_menu;
				if (!$(id).hasClass("selected_panel"))
					$(id).addClass("selected_panel");

			setInterval(function() {
				var id="#menu_"+current_menu;
				if (!$(id).hasClass("selected_panel"))
					$(id).addClass("selected_panel");
				
			}, 1000/30);
			
			
			//functions
			 this.getCurrentMenu = function() {
			 	var j = current_menu;
				return j;
			}
			
			this.getCurrentMenuName = function() {
				return menu[current_menu].toLowerCase();
			}
			
			this.selectNext = function() {
				$("#menu_"+current_menu).removeClass("selected_panel");
				if (++current_menu >= menu.length) current_menu = 0;
			}
			
			this.selectPrev = function() {
				$("#menu_"+current_menu).removeClass("selected_panel");
				if (--current_menu < 0 && menu.length != 0) current_menu = menu.length-1;
			}
			
			
			
			
			
		
			}