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

// Fonction qui permet de récupérer toutes les planètes.
async function allPlanets(filterValue) {
    let totalPages = await getPagesNumber();
    let allPlanets = [];

    // Boucle qui permet de récupérer les planètes de chaque page.
    for (let i = 1; i <= totalPages; i++) {
        let url     = urlPlanets + '?page=' + i;
        let planets = await getPlanets(url);
        allPlanets  = allPlanets.concat(planets);
    }

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

    // Supprime toutes les lignes du tableau
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }

    // Boucle qui permet d'afficher les planètes dans le tableau.
    filteredPlanets.forEach(planet => {
        let row = document.createElement('tr');
        row.classList.add('table__tr');

        let planetName = document.createElement('td');
        planetName.textContent = planet.name;
        row.appendChild(planetName);

        let planetClimate = document.createElement('td');
        planetClimate.textContent = planet.climate;
        row.appendChild(planetClimate);

        // Ajoute la ligne au tableau
        table.appendChild(row);

        // Écouteur d'événement qui permet d'afficher les informations de la planète (au clic).
        row.addEventListener('click', () => {
            document.querySelector('#planetName').textContent = planet.name;
            document.querySelector('#planetPopulation').textContent = planet.population;
            document.querySelector('#planetDiameter').textContent = planet.diameter;
            document.querySelector('#planetClimate').textContent = planet.climate;
            document.querySelector('#planetGravity').textContent = planet.gravity;
            document.querySelector('#planetTerrain').textContent = planet.terrain;

            // Cache l'élément planetInfos et affiche la div contenant les détails de la planète
            document.querySelector('#planetInfos').style.display = 'none';
            document.querySelector('#planetRequest').style.display = 'block';
        });
    });
}

document.querySelector('#populationFilter').addEventListener('change', (event) => {
    let value = event.target.value;
    allPlanets(value);
});

// Allumage !
allPlanets('1');