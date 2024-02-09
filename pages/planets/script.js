// Variables.
let urlPlanets = "https://swapi.dev/api/planets";
let allPlanets = [];

// Variables des éléments du DOM.
let table       = document.querySelector('table');
let planetInfos = document.querySelector('#planetInfos');
document.querySelector('#planetRequest').style.display = 'none';

// Fonction pour récupérer toutes les planètes au démarrage de l'application.
async function fetchAllPlanets() {
    allPlanets = await getAllPlanets();
}

// Fonction d'initialisation.
async function onInit() {
    await fetchAllPlanets();
    let filteredPlanets = filterPlanets('1');
    clearTable(table);
    displayPlanets(filteredPlanets, table);
}

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
function filterPlanets(filterValue) {
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

document.querySelector('#populationFilter').addEventListener('change', (event) => {
    let value = event.target.value;
    let filteredPlanets = filterPlanets(value);
    clearTable(table);
    displayPlanets(filteredPlanets, table);
});

// Allumage !
onInit();






        // CORRECTION.

        
// // Variables globales
// let planets = [];

// // OnInit : exécuté dès le chargement
// onInit();
// async function onInit() {
//     const countPages = await getCountPages();
//     await getPlanets(countPages);
//     showPlanets();
//     showCountPlanets();
// };

// // Fonctions ---------------------------
// async function getCountPages() {
//     const response = await fetch("https://swapi.dev/api/planets");
//     const planetsInfos = await response.json();
//     return planetsInfos.count / 10;
// };

// async function getPlanets(countPages) {
//     const url = "https://swapi.dev/api/planets/?page="
//     for (let i = 1; i <= countPages; i++) {
//         const response = await fetch(url + i);
//         const planetsInfos = await response.json();
//         planets.push(...planetsInfos.results);
//     };
// };

// function showPlanets() {
//     const tbody = document.querySelector('.table tbody');
//     planets.forEach(planet => {
//         const tr = document.createElement('tr');
//         const td1 = document.createElement('td');
//         const td2 = document.createElement('td');
//         td1.textContent = planet.name;
//         td2.textContent = planet.climate;
//         tr.appendChild(td1);
//         tr.appendChild(td2);
//         tbody.appendChild(tr);
//         tr.addEventListener('click', showPlanet);
//         // tbody.innerHTML += `<tr><td>${planet.name}</td><td>${planet.climate}</td></tr>`;
//     });
// };

// function showCountPlanets() {
//     document.querySelector('.info').textContent = planets.length + ' resultat(s)';
// };

// function showPlanet(event) {
//     const namePlanet = 
//         event.target.parentNode.querySelector('td').textContent;
//     const planet = planets.find(planet => planet.name == namePlanet);
//     document.querySelector('.namePlanet').textContent = planet.name;
//     document.querySelector('.gravityPlanet').textContent = planet.gravity;
// };
// // Gestion des erreurs

// fetch("https://swapi.dev/api/planes")
//     .then(response => {
//         if (response.ok) {
//             return response.json()
//         };
//         throw new Error("Nous rencontrons un problème")
//     })
//     .then(response => {
//         console.log(response);
//     })
//     .catch(err => {
//         console.log(err);
//     });