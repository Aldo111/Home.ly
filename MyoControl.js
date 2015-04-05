var myo = Myo.create(0);
	
	//FOR ROTATING/turning
	var fist_mode = false;
	var start_roll = 0;//roll recorded when fist mode went to true
	var last_roll = 0;
	
	var orig_angle = 0;
	var max_delta = 3.6;
	
	var orig_gz = 0;
	var max_gz = 360;
	
	
	
	//-----
	
	
	var spread_mode = false;
	var orig_w = 0;	
	
	
	myo.on('fingers_spread', function(edge){
		
		if (inPage) {
		
		
			if (edge && current_page == "switches") {
				control.unlock();
			}
			else if (edge && current_page == "modes") {
				modeControl.unlock();
			}
		}
		else {
		
			if (edge) {
				spread_mode = true;
			
			}
			else {
				spread_mode = false;
				
				
			}
		
		
		
		}
			
			//console.log('wave Left!');
		})
	
	myo.on('wave_in', function(edge){
		
			if (inPage) {
			
				//for switches
				if (edge && current_page=="switches") {
					myo.unlock(10000);
					control.selectPrev();
				}
				else if (edge && current_page == "modes") {
					myo.unlock(10000);
					modeControl.selectPrev();
				}
			
			}
			else {
				if (edge) {
					myo.unlock(10000);
					menuControl.selectPrev();
				}
			}
			
			//console.log('wave Left!');
		})
		
	myo.on('wave_out', function(edge) {
			if (inPage) {
			
				//for switches
				if (edge && current_page=="switches") {
					myo.unlock(10000);
					control.selectNext();
				}
				else if (edge && current_page == "modes") {
					myo.unlock(10000);
					modeControl.selectNext();
				}
			
			}
			else {
				if (edge) {
					myo.unlock(10000);
					menuControl.selectNext();
				}
			}

	});
	
	
	myo.on('fist', function(edge){
	
		if (inPage && current_page == "switches") {
			if (edge) {
	
				control.lock(); // lock the switch control
				myo.unlock(10000);

			
			if (!fist_mode) {
			//set fist mode
				fist_mode = true;
				start_roll = last_roll;
			}
			
			//alert("STARTED FIST");
			}
			else	{
				fist_mode = false;
				start_roll =0;
		//	orig_height = $("#rectangle").height();
			//myo.vibrate();
			//alert("ENDED FIST");
			}
		
		
		}
		else if (inPage && current_page == "modes") {
			if (edge) {
	
				modeControl.lock(); // lock the switch control
				myo.unlock(10000);

			
			if (!fist_mode) {
			//set fist mode
				fist_mode = true;
				start_roll = last_roll;
			}
			
			//alert("STARTED FIST");
			}
			else	{
				fist_mode = false;
				start_roll =0;
		//	orig_height = $("#rectangle").height();
			//myo.vibrate();
			//alert("ENDED FIST");
			}
		
		
		}
		else { //default
			if (edge) {
	

			
			if (!fist_mode) {
			//set fist mode
				fist_mode = true;
				start_roll = last_roll;
			}
			
			}
			if (!edge)	{
			var id = "menu_"+menuControl.getCurrentMenu();
			fist_mode = false;
			start_roll = 0;
			rotate(0,id);
			orig_angle = 0;
			$("#"+id).removeClass("selected_panel_complete");
			}
		}
		
		});
		
		
	myo.on('double_tap', function(edge) {
		this.zeroOrientation();
	});

	
		
	myo.on('orientation', function(data) {
			
			var id = "menu_"+menuControl.getCurrentMenu();
	
			//console.log(data);
			var x = data.x;
			var y = data.y;
			var z = data.z;	
			var w = data.w;	   

			
			
			
			 
			roll = Math.atan2(2.0 * (w * x + y * z),1.0 - 2.0 * (x * x + y * y));
			last_roll = roll;
			
			
			delta = roll - start_roll;
			if (fist_mode && Math.abs(delta)>0.1) { //if fist mode is on and there's considerable rotation
				
				
				var absolute_delta = Math.abs(delta);
				
				var percent = -delta*10/max_delta;
				
				var rotate_degrees = 90*percent;
				var curr_rotation_degrees=getRotationDegrees("#"+id);
			
			
				if (!inPage) { //default behavior
					if (rotate_degrees < 0) rotate_degrees = 0;
					else if (rotate_degrees >90) rotate_degrees = 90;
					rotate(rotate_degrees, id);

					if (rotate_degrees >=85)
					{
						//success
						$("#"+id).addClass("selected_panel_complete");
						$("#"+id).removeClass("selected_panel_complete");
						showPage(menuControl.getCurrentMenuName());
					
					}
					
				}
				
				
					//$("#log").html("YOOOO:"+menuControl.getCurrentMenu());

				


			}
			
			if (!fist_mode && getRotationDegrees("#"+id)>0 )//&& getRotationDegrees("#"+id)
				rotate(0, id);
			//roll = ((roll + Math.PI)/(Math.PI * 2.0) * 18); //going from 0 to 17 - based on the C++ version

		
		});
		
		
		myo.on('gyroscope', function (data) {
			
			if (Math.abs(data.z) >= 180 && inPage)
			{
				hidePage();
			}
			
			
		});
		