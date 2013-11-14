var currentCycleId = 0;
var cycleResetTime = 1000;
var lastCycleTimestamp = new Date();
var lastkey = 0;

var recentQueueCommands = [];

var oldApiUnitBuild = api.unit.build;
api.unit.build = function(itemId, cnt, ctrK) {
	recentQueueCommands.push({"id": itemId, "count": cnt, "ctrl": ctrK});
	return oldApiUnitBuild(itemId, cnt, ctrK);
};

var oldSetCmd = model.setCommandIndex;
model.setCommandIndex = function(index) {
	oldSetCmd(index);
	if (index == -1) {
		recentQueueCommands = [];
	}
};

$(document).ready(function(){
	gameConsole.log('-- Key mapper loaded --'+"\n");
	
	var oldEndFabMode = model.endFabMode;
	model.endFabMode = function() {
		lastCycleTimestamp = new Date(0);
		oldEndFabMode();
	};
	
	var generalFunctionMappings = {
		toggle_pole_lock: function() {
			var allSettings = decode(localStorage.settings);
			var currentPoleLock = allSettings.camera_pole_lock.toLowerCase(); // the settings store this upper case, the engine processes it in lowercase... wtf
			var nextSetting = "";
			if (currentPoleLock === 'off') {
				nextSetting = "on";
			} else {
				nextSetting = "off";
			}
			engine.call("set_camera_pole_lock", nextSetting);
			allSettings.camera_pole_lock = nextSetting.toUpperCase();
			localStorage.settings = encode(allSettings);
		},
		
		requeue: function() {
			for (var x = 0; x < 50; x++) {
				for (var i = 0; i < recentQueueCommands.length; i++) {
					var cmd = recentQueueCommands[i];
					oldApiUnitBuild(cmd["id"], cmd["count"], cmd["ctrl"]);
				}
			}
		}
	}
	
	function checkGeneralFunctions(e) {
		if (keyMap[e.which] != undefined && keyMap[e.which].general != undefined) {
			generalFunctionMappings[keyMap[e.which].general]();
		}
	}
	
	$(document).keydown(function(e){
		
		if (!model.chatSelected() && !model.showLanding()) {
			checkGeneralFunctions(e);
		}
	
		//Nothing selected don't do anything or Game hasn't started
		if(!model.hasSelection() || model.showLanding() || model.chatSelected())
			return;

		function knowsAnyBuildCommand(cmds) {
			for (var i = 0; i < cmds.length; i++) {
				if (knowsBuildCommand(cmds[i])) {
					return true;
				}
			}
			return false;
		}
		
		function knowsBuildCommand(cmd) {
			for(var i = 0; i < model.buildItems().length; i++) {
				if (model.buildItems()[i].id() == cmd) {
					return true;
				}
			}
			return false;
		}
		
		function getBuildItemId(cmd) {
			for (var i = 0; i < model.buildItems().length; i++) {
				if (model.buildItems()[i].id() == cmd) {
					return i;
				}
			}
			return -1;
		}
		
		function doCycleId(length, key) {
			var thisTime = new Date();
			if (thisTime - lastCycleTimestamp > cycleResetTime
				|| key != lastkey) {
				currentCycleId = 0;
			} else {
				currentCycleId++;
				if (currentCycleId == length) {
					currentCycleId = 0;
				}
			}
			lastCycleTimestamp = thisTime;
			lastkey = key;
		}
		
		function closeFabMode() {
			if (model.mode() === 'fab') {
				model.endFabMode();
			}
		}
		
		if(keyMap[e.which] !== undefined) {
			if(keyMap[e.which].commands !== undefined) 
			{
				closeFabMode();
				model.setCommandIndex(keyMap[e.which].commands);
				e.preventDefault();
			} 
			else if (keyMap[e.which].fireOrder !== undefined) 
			{
				var fOrder = keyMap[e.which].fireOrder;
				model.selectedFireOrderIndex(model.fireOrdersMap[fOrder]); 
				closeFabMode();
				engine.call('set_order_state', 'weapon', fOrder);
				e.preventDefault();
			}
			else if (keyMap[e.which].moveOrder !== undefined) 
			{
				var mOrder = keyMap[e.which].moveOrder;
				model.selectedMoveOrderIndex(model.moveOrdersMap[mOrder]); 
				
				//Spelling mistake in engine, but not in JS
				if(mOrder == 'maneuver')
					mOrder = 'manuever';
				closeFabMode();
				engine.call('set_order_state', 'movement', mOrder);
				e.preventDefault();
			}
			else if (keyMap[e.which].energyOrder !== undefined) 
			{
				var eOrder = keyMap[e.which].energyOrder;
				
				if (eOrder === 'toggle') {
					var currentOrder = model.selectedEnergyOrderIndex();
					if (currentOrder === 0) {
						eOrder = 'conserve';
					} else {
						eOrder = 'consume';
					}
				}
				
				model.selectedEnergyOrderIndex(model.energyOrdersMap[eOrder]); 
				closeFabMode();
				engine.call('set_order_state', 'energy', eOrder);
				e.preventDefault();
			}
			else if (keyMap[e.which] !== undefined)
			{
				var hotbuilds = keyMap[e.which];
				
				if (knowsAnyBuildCommand(hotbuilds)) {
				
					var failDetect = 0;
				
					do {
						doCycleId(hotbuilds.length, e.which);
						failDetect++;
						if (failDetect > 1000) {
							gameConsole.log("loop of death\n"); // I dont think this should ever happen...
							return;
						}
					} while(!knowsBuildCommand(hotbuilds[currentCycleId]) && knowsAnyBuildCommand(hotbuilds));
					
					var target = getBuildItemId(hotbuilds[currentCycleId]);
					
					model.executeStartBuild(e, target);
					e.preventDefault();
				}
			}
			
		} 
	});
});