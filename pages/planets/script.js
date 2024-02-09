// Variables globales.
let allPlanets = [];

// Fonction de script de la page (histoire).
onInit();

async function onInit() {
    const totalPages = await getPagesNumber();
    await getAllPlanets(totalPages);
    displayPlanets(allPlanets);
};

// Fonctions ---------------------------

// Récupération du nombre de pages.
async function getPagesNumber() {
    const response = await fetch("https://swapi.dev/api/planets");
    const planetsInfos = await response.json();
    return Math.ceil(planetsInfos.count / 10);
};

// Récupération de toutes les planètes.
async function getAllPlanets(totalPages) {
    const url = "https://swapi.dev/api/planets/?page="
    for (let i = 1; i <= totalPages; i++) {
        const response = await fetch(url + i);
        const planetsInfos = await response.json();
        allPlanets.push(...planetsInfos.results);
    };
};

// Affichage des planètes.
function displayPlanets(planets) {
    const table = document.querySelector('.table');
    planets.forEach(planet => {
        const row = document.createElement('tr');
        row.classList.add('table__tr');
        const planetName = document.createElement('td');
        const planetClimate = document.createElement('td');
        planetName.textContent = planet.name;
        planetClimate.textContent = planet.climate;
        row.appendChild(planetName);
        row.appendChild(planetClimate);
        table.appendChild(row);
        addRowClickListener(row, planet);
    });
};

// Ajout d'un écouteur d'événement sur une ligne.
function addRowClickListener(row, planet) {
    row.addEventListener('click', () => {
        displayPlanetDetails(planet);
    });
}

// Affichage des détails d'une planète.
function displayPlanetDetails(planet) {
    document.querySelector('#planetName').textContent = planet.name;
    document.querySelector('#planetPopulation').textContent = planet.population;
    document.querySelector('#planetDiameter').textContent = planet.diameter;
    document.querySelector('#planetClimate').textContent = planet.climate;
    document.querySelector('#planetGravity').textContent = planet.gravity;
    document.querySelector('#planetTerrain').textContent = planet.terrain;

    document.querySelector('#planetInfos').style.display = 'none';
    document.querySelector('#planetRequest').style.display = 'block';
};

// Fonction de filtrage des planètes.
function filterPlanets(filterValue) {
    let filteredPlanets = [];

    switch (filterValue) {
        case '1':
            filteredPlanets = allPlanets;
            break;
        case '2':
            filteredPlanets = allPlanets.filter(planet => Number(planet.population) < 100000);
            break;
        case '3':
            filteredPlanets = allPlanets.filter(planet => Number(planet.population) >= 100000 && Number(planet.population) < 100000000);
            break;
        case '4':
            filteredPlanets = allPlanets.filter(planet => Number(planet.population) >= 100000000);
            break;
    }

    return filteredPlanets;
}

// Gestion du changement de filtre.
document.querySelector('#populationFilter').addEventListener('change', (event) => {
    let value = event.target.value;
    let filteredPlanets = filterPlanets(value);
    clearTable();
    displayPlanets(filteredPlanets);
});

// Fonction de nettoyage du tableau.
function clearTable() {
    const table = document.querySelector('.table');
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }
}

// Gestion des erreurs.
fetch("https://swapi.dev/api/planets")
    .then(response => {
        if (response.ok) {
            return response.json()
        };
        throw new Error("Une erreur est survenue.")
    })
    .then(response => {
        console.log('Bilboquet, c\'est OK !');
    })
    .catch(err => {
        console.log(err);
    });





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