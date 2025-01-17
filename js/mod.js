let modInfo = {
	name: "The Something Tree",
	id: "thesotree",
	author: "Gibridka",
	pointsName: "points",
	modFiles: ["layers.js", "tree.js"],

	discordName: "",
	discordLink: "",
	initialStartPoints: new Decimal (10), // Used for hard resets and new players
	offlineLimit: 6,  // In hours
}

// Set your version in num and name
let VERSION = {
	num: "0.0.27",
	name: "still (almost) Literally nothing",
}

let changelog = `<h1>Changelog:</h1><br>
	<h3>v0.0.27 - still (almost) Literally nothing</h3><br>
	- made some unbalanced tempcrap for Beta layer<br>
	- new achievement<br>
	- onion in next update.<br>
	- update: more balance for god of balance.<br>
	<br>
	<h3>v0.0.2 - (almost) Literally nothing</h3><br>
		- i started this. lel.<br>
		- added Alpha and Beta<br>
		- 6 upgrades and 2 achievements<br>`

let winText = `Congratulations! You have reached the end and beaten this game, but for now...`

// If you add new functions anywhere inside of a layer, and those functions have an effect when called, add them here.
// (The ones here are examples, all official functions are already taken care of)
var doNotCallTheseFunctionsEveryTick = ["blowUpEverything"]

function getStartPoints(){
    return new Decimal(modInfo.initialStartPoints)
}

// Determines if it should show points/sec
function canGenPoints(){
	return true
}

// Calculate points/sec!
function getPointGen() {
	if(!canGenPoints())
		return new Decimal(0)

	let gain = new Decimal(1)

	// Alpha upgrades
	if (hasUpgrade('a', 11) && hasUpgrade('b', 11)) gain = gain.mul(10)
	if (hasUpgrade('a', 11)) gain = gain.mul(2)
	if (hasUpgrade('a', 12)) gain = gain.mul(3)
	if (hasUpgrade('a', 13)) gain = gain.mul(upgradeEffect('a', 13))
	if (hasUpgrade('a', 21)) gain = gain.mul(1.5)
	if (hasUpgrade('a', 22)) gain = gain.mul(upgradeEffect('a', 22))
	if (hasUpgrade('a', 23)) gain = gain.mul(1.5)
	if (hasUpgrade('b', 13)) gain = gain.pow(1.12)
	if (hasUpgrade('b', 12)) gain = gain.mul(upgradeEffect('b', 12))
	if (hasAchievement('Ach', 13)) gain = gain.pow(0.1)
	return gain
}

// You can add non-layer related variables that should to into "player" and be saved here, along with default values
function addedPlayerData() { return {
}}

// Display extra things at the top of the page
var displayThings = [
]

// Determines when the game "ends"
function isEndgame() {
	return player.points.gte(new Decimal("e280000000"))
}



// Less important things beyond this point!

// Style for the background, can be a function
var backgroundStyle = {

}

// You can change this if you have things that can be messed up by long tick lengths
function maxTickLength() {
	return(3600) // Default is 1 hour which is just arbitrarily large
}

// Use this if you need to undo inflation from an older version. If the version is older than the version that fixed the issue,
// you can cap their current resources with this.
function fixOldSave(oldVersion){
}