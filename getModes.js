var modeControl;
var modes= ["Party", "Goodnight", "Danger"];
	
function ModeControl(modess) {
		
			
			//private
			var current_mode = 1;
		    if (typeof modess == "undefined")
		    {
				modess = [];
				console.log("HERE");
			}
				
			var modes = modess;
			

			for (i in modes) {
			
				$("#modes").append("<div class='box' id ='mode_"+i+"'>"+modes[i]+"</div>");
				

			}
			

			

			setInterval(function() {
				var id="#mode_"+current_mode;
				if (!$(id).hasClass("selected"))
					$(id).addClass("selected");
				
			}, 1000/30);
			
			
			//functions
			 this.getCurrentMode = function() {
				return modes[current_mode];
			}
			
			this.selectNext = function() {
				$("#mode_"+current_mode).removeClass("selected");
				//alert("YO");
				if (++current_mode >= modes.length) current_mode = 0;
			}
			
			this.selectPrev = function() {
				$("#mode_"+current_mode).removeClass("selected");
				//alert("YO");
				if (--current_mode < 0 && modes.length != 0) current_mode = modes.length-1;
			}
			
			this.lock = function() {
				//switch off
				//switchOff(switches[current_switch].id)
				
				//switches[current_switch].state = "off";
				$("#mode_"+current_mode).removeClass("on");
				activateDefaultMode();
				
				
			
			}
			
			this.unlock = function() {
			var currMode = this.getCurrentMode();
				
				console.log("Current mode = "+currMode);
				
				if (currMode == "Party") activatePartyMode();
				if (currMode == "Goodnight") activateGoodnightMode();
				if (currMode == "Danger") activateDangerMode();
				
				//switch on
				//switchOn(switches[current_switch].id);
				
				//switches[current_switch].state = "on";
				$("#mode_"+current_mode).addClass("on");

			}
			
			
			
		
		}


function activatePartyMode() {
       

       $.get("https://graph.api.smartthings.com/api/smartapps/installations/"+key+"/modes/party", function(data) {
        // switchOn(data);
		});

}

function activateDangerMode() {
       
       
       $.get("https://graph.api.smartthings.com/api/smartapps/installations/"+key+"/modes/danger", function(data) {
        // switchOn(data);
		});

}

function activateGoodnightMode() {
       
       
       $.get("https://graph.api.smartthings.com/api/smartapps/installations/"+key+"/modes/goodnight", function(data) {
        // switchOn(data);
		});

}

function activateDefaultMode() {

		$.get("https://graph.api.smartthings.com/api/smartapps/installations/"+key+"/modes/default", function(data) {
        // switchOn(data);
		});

}





