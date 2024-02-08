// Déclaration des variables.
let livingNumber  = document.querySelector("#livingNumber");
let vehicleNumber = document.querySelector("#vehicleNumber");
let planetNumber  = document.querySelector("#planetNumber");

// Déclaration des URL.
let urlPeople   = "https://swapi.dev/api/people";
let urlVehicles = "https://swapi.dev/api/vehicles";
let urlPlanets  = "https://swapi.dev/api/planets";

// Fonction asynchrone pour récupérer le nombre d'éléments d'une URL donnée.
async function getCount(url) {
    let response = await fetch(url);
    let data = await response.json();
    return data.count;
}

// Fonction asynchrone pour mettre à jour le nombre d'éléments.
async function updateCount(element, url) {
    element.innerHTML = await getCount(url);
    element.style.color = "white";
}

// Lancements !
updateCount(livingNumber, urlPeople);
updateCount(vehicleNumber, urlVehicles);
updateCount(planetNumber, urlPlanets);