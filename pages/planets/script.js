// Variables des URLs.
let urlPlanets = "https://swapi.dev/api/planets";

// Variables des éléments du DOM.
let table       = document.querySelector('table');
let planetInfos = document.querySelector('#planetInfos');
document.querySelector('#planetRequest').style.display = 'none';

// Fonction qui permet de récupérer le nombre de pages de planètes.
async function getPagesNumber() {
    let response = await fetch(urlPlanets);
    let data     = await response.json();
    return Math.ceil(data.count / 10);
}

// Fonction qui permet de récupérer les planètes (du coup sur une seule page).
async function getPlanets(url) {
    let response = await fetch(url);
    let data     = await response.json();
    return data.results;
}

// Fonction pour récupérer toutes les planètes.
async function getAllPlanets() {
    let totalPages = await getPagesNumber();
    let allPlanets = [];

    for (let i = 1; i <= totalPages; i++) {
        let url     = urlPlanets + '?page=' + i;
        let planets = await getPlanets(url);
        allPlanets  = allPlanets.concat(planets);
    }

    return allPlanets;
}

// Fonction pour filtrer les planètes en fonction de la population.
function filterPlanets(allPlanets, filterValue) {
    let filteredPlanets = [];

    switch (filterValue) {
        case '1':
            filteredPlanets = allPlanets;
            break;
        case '2':
            filteredPlanets = allPlanets.filter(planet => planet.population < 100000);
            break;
        case '3':
            filteredPlanets = allPlanets.filter(planet => planet.population >= 100000 && planet.population < 100000000);
            break;
        case '4':
            filteredPlanets = allPlanets.filter(planet => planet.population >= 100000000);
            break;
    }

    return filteredPlanets;
}

// Fonction pour vider le tableau.
function clearTable(table) {
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
}

// Fonction pour afficher les planètes dans le tableau.
function displayPlanets(filteredPlanets, table) {
    filteredPlanets.forEach(planet => {
        let row = document.createElement('tr');
        row.classList.add('table__tr');

        let planetName = document.createElement('td');
        planetName.textContent = planet.name;
        row.appendChild(planetName);

        let planetClimate = document.createElement('td');
        planetClimate.textContent = planet.climate;
        row.appendChild(planetClimate);

        table.appendChild(row);

        row.addEventListener('click', () => {
            displayPlanetDetails(planet);
        });
    });
}

// Fonction pour afficher les détails d'une planète.
function displayPlanetDetails(planet) {
    document.querySelector('#planetName').textContent = planet.name;
    document.querySelector('#planetPopulation').textContent = planet.population;
    document.querySelector('#planetDiameter').textContent = planet.diameter;
    document.querySelector('#planetClimate').textContent = planet.climate;
    document.querySelector('#planetGravity').textContent = planet.gravity;
    document.querySelector('#planetTerrain').textContent = planet.terrain;

    document.querySelector('#planetInfos').style.display = 'none';
    document.querySelector('#planetRequest').style.display = 'block';
}

// Fonction principale qui utilise les fonctions ci-dessus.
async function allPlanets(filterValue) {
    let allPlanets = await getAllPlanets();
    let filteredPlanets = filterPlanets(allPlanets, filterValue);
    clearTable(table);
    displayPlanets(filteredPlanets, table);
}

document.querySelector('#populationFilter').addEventListener('change', (event) => {
    let value = event.target.value;
    allPlanets(value);
});

// Allumage !
allPlanets('1');