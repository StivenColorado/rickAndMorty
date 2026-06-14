let loading = document.querySelector('.loading')
let sizeScreen = innerWidth
console.log(sizeScreen)
const searchCharactersByLocation = () => {
    const selectedLocation = document.querySelector('#lang').value;
    const url = `https://rickandmortyapi.com/api/character?location=${selectedLocation}`;
    fetch(url)
        .then(response => response.json())
        .then(data => {
            processResponse(data);
        })
        .catch(error => {
            let, processError(error);
        });
};
// Obtener las opciones de localización y agregarlas al select
const fetchLocations = () => {
    const select = document.querySelector('#lang');
    fetch('https://rickandmortyapi.com/api/location')
        .then(response => response.json())
        .then(data => {
            const locations = data.results;
            locations.forEach(location => {
                const option = document.createElement('option');
                option.value = location.name;
                option.className = "options";
                option.text = location.name;
                option.style.backgroundColor = 'white';
                option.style.color = 'black';
                select.appendChild(option);
            });
        })
        .catch(error => console.error(error));
};

// Llamar a la función para obtener las opciones de localización al cargar la página
loading.style.display = 'flex'
fetchLocations();
function getCharacters(location, done) {
    const apiUrl = `https://rickandmortyapi.com/api/character`;
    let characters = [];
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            characters = data.results;
            const totalPages = data.info.pages;
            const promises = [];
            for (let page = 2; page <= totalPages; page++) {
                promises.push(
                    fetch(`${apiUrl}?page=${page}`)
                        .then(response => response.json())
                        .then(data => {
                            characters = characters.concat(data.results);
                        })
                );
            }
            Promise.all(promises).then(() => {
                if (location) {
                    characters = characters.filter(character => character.location.name === location);
                }
                done(characters);
            });
            loading.style.animation = 'desvanecer 1s alternate ease-in forwards'
        });
}

function displayCharacters(characters) {
    let clase = "color_vivo"
    const main = document.querySelector("main");
    main.innerHTML = ""; // Limpiar el contenido principal antes de agregar los personajes

    characters.forEach(personaje => {
        if (personaje.status == "Alive") {
            clase += "_green"
        }
        if (personaje.status == "Dead") {
            clase += "_red"
        }
        if (personaje.status == "unknown") {
            clase += "_gray"
        }
        if (sizeScreen > 700) {
            const article = document.createRange().createContextualFragment(/*html*/`
                <article>
                <div class="image-container-location">
                    <img  id="${personaje.id}" class="image" src="${personaje.image}" alt="Personaje">
                </div>
                <div class="info_personaje">
                    <h2>${personaje.name}</h2>
                    <div class="optional">
                    <span><b>Género:</b> ${personaje.gender}</span>
                    </div>
                    <div class="optional">
                    <span><b>Estado:</b> <span class=${clase}>${personaje.status}</span></span>
                    </div>
                    <div class="optional">
                    <span><b>Localización:</b> ${personaje.location.name}</span>
                    </div>
                </div>
                </article>
            `);
            main.append(article);
        } else {
            const article = document.createRange().createContextualFragment(/*html*/`
                <article>
                <div class="image-container-location">
                    <img  id="${personaje.id}" class="image" src="${personaje.image}" alt="Personaje">
                </div>
                <div class="info_personaje">
                    <h2>${personaje.name}</h2>
                </div>
                </article>
            `);
            main.append(article);
        }
        clase = "color_vivo"
    });
}

const ObtenerLocation = () => {
    const select = document.querySelector('select').value;
    console.log(select)
    getCharacters(select, displayCharacters);
};

document.querySelector('select').addEventListener('change', () => {
    const main = document.querySelector("main");
    main.innerHTML = "";
    ObtenerLocation();
});
ObtenerLocation();













