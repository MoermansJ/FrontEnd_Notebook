window.onload = () => {
	//variables
	let counter = 0;
	let numbersRolledArray = [];


	//functions
	//event handlers
	function handlePlay() {
		rollDice();
		incrementTimesPlayedCounter();
		countDuplicates();
	}

	//main functions
	function rollDice() {
		for (let i = 1; i <= 6; i++) {
			let randomInt = Math.floor(Math.random() * 6) + 1; //provides int with range of 1 to 6 incl
			document.getElementById(`dice${i}`).src = `res/img/dobbel${randomInt}.gif`;
			numbersRolledArray.push(randomInt);
		}
	}

	function incrementTimesPlayedCounter() {
		document.getElementById("times-played").innerHTML = ++counter;
	}

	function countDuplicates() {
		//filters the numbersRolledArray using its last element and subtracts its new length (post-filter) from its old length (pre-filter) to calculate the amount of duplicates
		while (numbersRolledArray.length >= 1) {
			let prevLength = numbersRolledArray.length;
			let currentElement = numbersRolledArray.pop();
			numbersRolledArray = numbersRolledArray.filter(element => element != currentElement);
			let lengthDifference = prevLength - numbersRolledArray.length; //comparing length of filtered array to its old length

			if (lengthDifference >= 2) {
				updateCombinationCounter(lengthDifference);
			}
		}
	}

	//helper functions
	function updateCombinationCounter(duplicateCounter) {
		let previousValue = parseInt(document.getElementById(`combination-counter${duplicateCounter}`).innerHTML);
		document.getElementById(`combination-counter${duplicateCounter}`).innerHTML = ++previousValue;
	}


	//event listeners
	document.getElementById("play-button").addEventListener("click", handlePlay);
};