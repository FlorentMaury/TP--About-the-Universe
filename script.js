// Déclaration des variables.
let livingNumber = document.querySelector("#livingNumber");
let vehicleNumber = document.querySelector("#vehicleNumber");
let planetNumber = document.querySelector("#planetNumber");

// Déclaration des URL.
let urlPeople = "https://swapi.dev/api/people";
let urlVehicles = "https://swapi.dev/api/vehicles";
let urlPlanets = "https://swapi.dev/api/planets";

// Récupération des données.
fetch(urlPeople)
    .then((response) => response.json())
    .then((response) => {
        livingNumber.innerHTML = response.count;
        livingNumber.style.color = "white";
    })

fetch(urlVehicles)
    .then((response) => response.json())
    .then((response) => {
        vehicleNumber.innerHTML = response.count;
        vehicleNumber.style.color = "white";
    })

fetch(urlPlanets)
    .then((response) => response.json())
    .then((response) => {
        planetNumber.innerHTML = response.count;
        planetNumber.style.color = "white";
    })

