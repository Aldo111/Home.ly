
		//https://graph.api.smartthings.com/api/smartapps/installations/c27ea84b-9fc0-4098-bb76-53c71ab15eb3
		function SwitchControl(sw) {
		
			//private
			var current_switch = 1;
		    if (typeof sw == "undefined")
				sw = [];
				
			var switches = sw;
			
			
			for (i in switches)
			{
				$("#switches").append("<div class='box' id="+i+">"+switches[i].name+"</div>");
				if (switches[i].state == "on")
					$("#"+i).addClass("on");
			}
			

			setInterval(function() {
				var id="#"+current_switch;
				if (!$(id).hasClass("selected"))
					$(id).addClass("selected");
				
			}, 1000/30);
			
			
			//functions
			 this.getCurrentSwitch = function() {
				return switches[current_switch];
			}
			
			this.selectNext = function() {
				$("#"+current_switch).removeClass("selected");
				//alert("YO");
				if (++current_switch >= switches.length) current_switch = 0;
			}
			
			this.selectPrev = function() {
				$("#"+current_switch).removeClass("selected");
				//alert("YO");
				if (--current_switch < 0 && switches.length != 0) current_switch = switches.length-1;
			}
			
			this.lock = function() {
				//switch off
				switchOff(switches[current_switch].id)
				
				switches[current_switch].state = "off";
				$("#"+current_switch).removeClass("on");
				
			
			}
			
			this.unlock = function() {
				
				//switch on
				switchOn(switches[current_switch].id);
				
				switches[current_switch].state = "on";
				$("#"+current_switch).addClass("on");

			}
			
			
			
		
		}



//-------
var control; //global variables - stores our Switch Control


		
		
function getSwitches() {	  
	var local_switches=[];
	var x=0;

	//GET SWITCHES
 	$.get("https://graph.api.smartthings.com/api/smartapps/installations/"+key+"/switches", function(data) {
         console.log("DATA:" + data);
         var switches = data;
         for (i in switches)
         {
         	var s=switches[i].split("||");
         	local_switches[x++] = {"state":s[1], "id":s[0], "name" : s[2]};
                 //switchOn(switches[i]);
         }
         
         control = new SwitchControl(local_switches); //create a switch control
         console.log(control.getCurrentSwitch());
        // switchOn(data);
	});
}


function switchOff(switch_id) {
        
         var command_object = {"command" : "toggle"};
        
         $.ajax({
                 url: 'https://graph.api.smartthings.com/api/smartapps/installations/'+key+'/switches/'+switch_id+'/off',
                 type: 'PUT',
                 success: function (response) {
                 }
         });

 }
function switchOn(switch_id) {
       
        var command_object = {"command" : "toggle"};
       
        $.ajax({
                url: 'https://graph.api.smartthings.com/api/smartapps/installations/'+key+'/switches/'+switch_id+'/on',
                type: 'PUT',
                success: function (response) {
                }
        });

}
