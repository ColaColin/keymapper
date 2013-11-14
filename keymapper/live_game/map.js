/*
 * You can use this tool here to modify key codes
 * http://www.asquare.net/javascript/tests/KeyCode.html
 * 
 * Use the value shown in the "onKeyDown" column in the "event.which" row
 */

// unit selection cannot cycle!
 
 var onW = [
	'/pa/units/land/vehicle_factory/vehicle_factory.json',
	'/pa/units/land/bot_factory/bot_factory.json',
    '/pa/units/land/fabrication_bot/fabrication_bot.json',
	'/pa/units/land/fabrication_bot_adv/fabrication_bot_adv.json',
	'/pa/units/land/fabrication_vehicle/fabrication_vehicle.json',
	'/pa/units/land/fabrication_vehicle_adv/fabrication_vehicle_adv.json',
	'/pa/units/air/fabrication_aircraft/fabrication_aircraft.json',
	'/pa/units/air/fabrication_aircraft_adv/fabrication_aircraft_adv.json',
 ]
 
 var onE = [
	'/pa/units/air/air_factory_adv/air_factory_adv.json',
	'/pa/units/sea/naval_factory_adv/naval_factory_adv.json',
	'/pa/units/air/air_factory/air_factory.json',
	'/pa/units/sea/naval_factory/naval_factory.json',
	'/pa/units/land/land_scout/land_scout.json',
	'/pa/units/air/air_scout/air_scout.json',
	'/pa/units/land/bot_aa/bot_aa.json',
	'/pa/units/land/tank_heavy_mortar/tank_heavy_mortar.json',
	'/pa/units/land/bot_artillery_adv/bot_artillery_adv.json',
	'/pa/units/air/fighter_adv/fighter_adv.json'
 ]
 
 var onR = [
	'/pa/units/land/assault_bot/assault_bot.json',
	'/pa/units/land/assault_bot_adv/assault_bot_adv.json',
	'/pa/units/land/tank_laser_adv/tank_laser_adv.json',
	'/pa/units/air/fighter/fighter.json',
	'/pa/units/land/radar_adv/radar_adv.json',
	'/pa/units/land/radar/radar.json',
	'/pa/units/land/aa_missile_vehicle/aa_missile_vehicle.json',
	'/pa/units/air/bomber_adv/bomber_adv.json'	
 ]
 
 var onT = [
 	'/pa/units/land/vehicle_factory_adv/vehicle_factory_adv.json',
	'/pa/units/land/bot_factory_adv/bot_factory_adv.json',	
	'/pa/units/land/tank_light_laser/tank_light_laser.json',
	'/pa/units/air/bomber/bomber.json',
 ]
 
 var onF = [
	'/pa/units/land/energy_plant_adv/energy_plant_adv.json',
    '/pa/units/land/energy_plant/energy_plant.json',
 ]
 
 var onS = [
	'/pa/units/land/metal_extractor_adv/metal_extractor_adv.json',
		'/pa/units/land/metal_extractor/metal_extractor.json',
 ]

 var onX = [
	'/pa/units/land/laser_defense_adv/laser_defense_adv.json',
    '/pa/units/land/laser_defense/laser_defense.json',
	'/pa/units/land/laser_defense_single/laser_defense_single.json',
 ]

 var onC = [
 	'/pa/units/land/air_defense/air_defense.json',
	'/pa/units/land/land_barrier/land_barrier.json'
 ]
 
 var onV = [
	'/pa/units/land/artillery_short/artillery_short.json',
	'/pa/units/land/artillery_long/artillery_long.json'	
 ]

 var onD = [
	'/pa/units/land/energy_storage/energy_storage.json',
	'/pa/units/land/metal_storage/metal_storage.json'
 ]
 
 var onTab = {energyOrder:'toggle'}
 
 
var keyMap = {
	
	// actually kreyDown dooesnt need the big char codes anymore, but the whole code of this mod is pretty ugly anyway
	// gonna clear it up once orbital/navy is needed in it
	
	9:onTab,
	
	100:onD,
	68:onD,
	
	119:onW,
	87:onW,
	
	115:onS,
	83:onS,
	
	101:onE,
	69:onE,
	
	82:onR,
	114:onR,
	
	84:onT,
	116:onT,
	
	70:onF,
	102:onF,
	
	88:onX,
	120:onX,
	
	67:onC,
	99:onC,
	
	86:onV,
	118:onV,
	
	113:{commands:5},	//q - Patrol
	81:{commands:5}, //Q
	89:{commands:-1},	//Y - Stop
	
	97:	{commands:1},	//a - Attack
	65: {commands:1}, // A
	
	220: {general:"toggle_pole_lock"}, // ^ toggle camera pole lock
	
	79: {general: "requeue"},
	
	// very old, might be broken:
	
	
	// 113:	{commands:0},	//Q - Move
	// 97:	{commands:1},	//A - Attack
	// 100:	{commands:2},	//D - Assist
	// 114:	{commands:3},	//R - Repair
	// 101:	{commands:4},	//E - Reclaim
	// 116:	{commands:5},	//T - Patrol
	// 115:	{commands:-1},	//S - Stop
	
	// 106:	{fireOrder:'fire at will'},	//J - Fire at will
	// 103:	{fireOrder:'return fire'},	//G - Return fire
	// 107:	{fireOrder:'hold fire'},	//K - Hold fire - is set as "fire at will" in live_game_alpha.html
										// //	  But this doesn't seem to break anything setting it correctly
	
	// 121:	{moveOrder:'maneuver'},		//Y - Maneuver
	// 120:	{moveOrder:'roam'},			//X - Roam
	// 104:	{moveOrder:'hold position'},//H - Hold position
	
	// 118:	{energyOrder:'conserve'},	//V - Return fire (energy hold)
	// 98:	{energyOrder:'consume'}	//B - Hold fire	(energy consume)
	// 98:	{energyOrder:'toggle'}	//B - toggle energy usage on/off(energy consume)
}