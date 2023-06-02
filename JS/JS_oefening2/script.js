//variables & refs
const menu = {
	voorgerechten: [
		{
			naam: "Sprinkhaan",
			beschrijving: "Krokante sprinkhaan op een bedje van kakkerlak",
			prijs: 5.99,
			foto: "Foto1.jpg"
		},
		{
			naam: "Tandoori Burger",
			beschrijving: "Burger op basis van Tandoori, een snelle hap als hongerstillertje",
			prijs: 4.99,
			foto: "Foto3.jpg"
		},
		{
			naam: "Cupcake",
			beschrijving: "Eetbare Cupcake, met wormpjes",
			prijs: 2.99,
			foto: "Foto9.jpg"
		}
	],
	hoofdgerechten: [
		{
			naam: "Sushi",
			beschrijving: "Speciale sushi met een summum aan krakertjes",
			prijs: 7.99,
			foto: "Foto8.jpg"
		},
		{
			naam: "Insect Burger",
			beschrijving: "Een burger met lekkers en Pont-Neuf frietjes",
			prijs: 4.99,
			foto: "Foto5.jpg"
		},
		{
			naam: "Salade",
			beschrijving: "Salade op basis van zelfgevonden items",
			prijs: 1.99,
			foto: "Foto10.jpg"
		}
	],
	nagerechten: [
		{
			naam: "Lolly",
			beschrijving: "Een lolly met inhoud, een vleugje notalgie",
			prijs: 2.99,
			foto: "Foto6.jpg"
		},
		{
			naam: "Ijsje",
			beschrijving: "Lekker ijs met licht glimmende worms on the side",
			prijs: 2.99,
			foto: "Foto7.jpg"
		}
	]
};

const courseSelectHTML = document.getElementById("course-selection"); //Gang
const dishSelectHTML = document.getElementById("dish-selection"); //Keuze
let currentlySelectedDishOption;

//functions
//event handlers
function firstRender() {
	loadCourseOptions();
	loadDishOptions();
	setCurrentlySelectedDishOption();
}

function handleCourseChange() {
	loadDishOptions();
	setCurrentlySelectedDishOption();
	updateDishInfo();
}

function handleDishChange() {
	setCurrentlySelectedDishOption();
	updateDishInfo();
}

function handleFormSubmit() {
	processForm(event);
}


//greater functions
function loadCourseOptions() {
	courseSelectHTML.innerHTML = ""; //this clears the previous options

	Object.keys(menu).forEach(courseOption => {
		let optionToLoad = document.createElement("option");
		optionToLoad.innerHTML = `<option value="${courseOption}">${courseOption}</option>`;
		courseSelectHTML.append(optionToLoad);
	});
}

function loadDishOptions() {
	dishSelectHTML.innerHTML = ""; //this clears the previous options

	menu[courseSelectHTML.value].forEach(dishOption => {
		let optionToLoad = document.createElement("option");
		optionToLoad.innerHTML = `<option value="${dishOption.naam}">${dishOption.naam}</option>`;
		dishSelectHTML.append(optionToLoad);
	});
}

function updateDishInfo() {
	document.getElementById("dish-image").src = `./res/img/${currentlySelectedDishOption.foto}`; //image
	document.getElementById("dish-info-price").innerHTML = `€${currentlySelectedDishOption.prijs}`; //price
	document.getElementById("dish-info-name").innerHTML = `${currentlySelectedDishOption.naam}`; //name
	document.getElementById("dish-info-description").innerHTML = `${currentlySelectedDishOption.beschrijving}`; //description
}

function processForm(event) {
	event.preventDefault(); //this stops the form from instantly resetting once clicked
	const aantal = parseInt(document.getElementById("aantal").value);

	const formInfo = {
		course: `${courseSelectHTML.value}`,
		dish: `${currentlySelectedDishOption.naam}`,
		amount: aantal,
		totalPrice: (aantal * currentlySelectedDishOption.prijs).toFixed(2)
	};

	updateOverview(formInfo);
}

function updateOverview(formInfo) {
	const overviewHTML = document.getElementById("card-overview"); //Reservatie
	const formInfoHTML = document.createElement("div");

	formInfoHTML.innerHTML =
		`<div class="ugly">
		  <p>${formInfo.course}</p>
		  <p>${formInfo.dish} x ${formInfo.aantal} = ${formInfo.totalPrice}</p>
		</div>`;

	overviewHTML.append(formInfoHTML);
}

function setCurrentlySelectedDishOption() {
	currentlySelectedDishOption = menu[courseSelectHTML.value].filter(element => element.naam === dishSelectHTML.value)[0];
}


//event listeners
document.getElementById("course-selection").addEventListener("change", handleCourseChange);
document.getElementById("dish-selection").addEventListener("change", handleDishChange);
document.getElementById("submit").addEventListener("click", handleFormSubmit);

//stuff to find a better solution for
//first render - loading options and images based on json
firstRender();