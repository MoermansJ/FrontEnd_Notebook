//variables
let counter = 0;
let numbersRolledArray = [];


//functions
//event handlers
function handlePlay() {
	rollDice();
	updateTriesCounter();
	countDuplicates();
}

//helper functions
function rollDice() {
	for (let i = 1; i <= 6; i++) {
		let randomInt = Math.floor(Math.random() * 6) + 1; //generates random int from 0 to 5, then adds 1 so it's a range of 1 to 6 incl
		document.getElementById(`dice${i}`).src = `res/img/dobbel${randomInt}.gif`;
		numbersRolledArray.push(randomInt);
	}
}

function updateTriesCounter() {
	counter++;
	document.getElementById("tries-counter").innerHTML = counter;
}

function countDuplicates() {
	while (numbersRolledArray.length >= 1) {
		let prevLength = numbersRolledArray.length;
		let currentElement = numbersRolledArray.pop();
		numbersRolledArray = numbersRolledArray.filter(element => element != currentElement);
		let duplicateCounter = prevLength - numbersRolledArray.length; //comparing length of filtered array to its old length
		if (duplicateCounter >= 2) {
			updateCombinationCounter(duplicateCounter);
		}
	}
}

function updateCombinationCounter(duplicateCounter) {
	let previousValue = parseInt(document.getElementById(`combination-counter${duplicateCounter}`).innerHTML);
	document.getElementById(`combination-counter${duplicateCounter}`).innerHTML = ++previousValue;
}


//event listeners
document.getElementById("play-button").addEventListener("click", handlePlay);