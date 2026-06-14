let btn = document.querySelector('.btn')
let btn2 = document.querySelector('.btn_close_nav')
let icon = document.querySelectorAll('.iconNav')
let menu = document.querySelector('.menu-mobile')
let section = document.querySelectorAll('.section-mobile')
let sectionPc = document.querySelectorAll('.section-desk')
let title = document.querySelector('.titulo_main')
let buscadorPersonajes = document.querySelectorAll('.buscador-personajes')


// INICIO CODIGO LOCACIONES
function getLocations(page, done) {
    const apiUrl = `https://rickandmortyapi.com/api/location?page=${page}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            done(data.results, data.info.pages);
        });
}
function displayLocations(locations) {
    const main = document.querySelector("main");
    main.innerHTML = ""; // Limpiar el contenido principal antes de agregar las locaciones

    locations.forEach(locacion => {
        const article = document.createRange().createContextualFragment(/*html*/`
        <article>
          <h2>${locacion.name}</h2>
          <div>
            <span><b>Tipo:</b> ${locacion.type}</span>
          </div>
          <div>
            <span><b>Dimensión:</b> ${locacion.dimension}</span>
          </div>
        </article>
      `);
        main.append(article);
    });
}
function displayPaginationLocation(totalPages) {
    const paginationContainer = document.querySelector(".pagination");
    paginationContainer.innerHTML = ""; // Limpiar el contenido del paginador

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.className = "boton-pagina-location";
        pageButton.innerText = i;
        pageButton.addEventListener("click", () => changePageLocation(i));
        paginationContainer.appendChild(pageButton);
    }
}
function changePageLocation(page) {
    getLocations(page, (locations, totalPages) => {
        displayLocations(locations);
        displayPaginationLocation(totalPages);
    });
}
// FIN CODIGO LOCACIONES

///INICIO CODIGO EPISODIOS
function getEpisodes(page, done) {
    const apiUrl = `https://rickandmortyapi.com/api/episode?page=${page}`;
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            done(data.results, data.info.pages);
        });
}

function displayEpisodes(episodes) {
    const main = document.querySelector("main");
    main.innerHTML = ""; // Limpiar el contenido principal antes de agregar los episodios

    episodes.forEach(episode => {
        const article = document.createRange().createContextualFragment(/*html*/`
        <article>
          <h2>${episode.name}</h2>
          <div>
            <span><b>Fecha de emisión:</b> ${episode.air_date}</span>
          </div>
          <div>
            <span><b>Episodio:</b> ${episode.episode}</span>
          </div>
        </article>
      `);
        main.append(article);
    });
}

function displayPaginationEpisodes(totalPages) {
    const paginationContainer = document.querySelector(".pagination");
    paginationContainer.innerHTML = ""; // Limpiar el contenido del paginador

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement("button");
        pageButton.className = "boton-pagina-episode";
        pageButton.innerText = i;
        pageButton.addEventListener("click", () => changePageEpisode(i));
        paginationContainer.appendChild(pageButton);
    }
}

function changePageEpisode(page) {
    getEpisodes(page, (episodes, totalPages) => {
        displayEpisodes(episodes);
        displayPaginationEpisodes(totalPages);
    });
}
//FIN CODIGO EPISODIOS

// FUNCIONES PARA MOSTRAR EL MENU Y ASIGNAR LAS FUNCIONES   
btn.addEventListener('click', () => {
    btn.style.display = 'none'
    btn2.style.display = 'flex'
    icon.forEach(e => {
        e.style.display = 'none';
    });

    menu.style.animation = "mostrarMenu 1s alternate forwards"
    btn2.style.height = '10%'
    btn2.style.top = '0%'
    btn2.style.rigth = '0%'

    let div1 = document.createElement('div');
    let div2 = document.createElement('div');
    let div3 = document.createElement('div');
    let a1 = document.createElement('a');
    let a2 = document.createElement('a');
    div1.className = 'section-mobile';
    div2.className = 'section-mobile';
    div3.className = 'section-mobile';

    // Crear el contenido del enlace - personajes
    let linkText1 = document.createTextNode('Personajes');
    a1.href = '../../Pages/index.html';
    a1.appendChild(linkText1);
   // Crear el contenido del enlace - locaciones
   let linkText2 = document.createTextNode('Locaciones');
   a2.href = '../Pages/locations/Pages/locations.html';
   a2.appendChild(linkText2);

  
   

    // Agregar el enlace como hijo del div2
    div1.appendChild(a1);
    div2.appendChild(a2);

    div3.textContent = 'Episodio';

    menu.append(div1);
    menu.append(div2);
    menu.append(div3);

});

btn2.addEventListener('click', () => {
    let lista = document.querySelectorAll('.section-mobile')
    lista.forEach(e => {
        e.remove();
    })
    menu.style.animation = "ocultarMenu .5s alternate forwards"
    btn2.style.display = 'none'
    btn.style.display = 'flex'
    icon.forEach(e => {
        e.style.display = 'flex';
    });
})
const ocultar_seccion = () => {
    let lista = document.querySelectorAll('.section-mobile')
    lista.forEach(e => {
        e.remove();
    })
    menu.style.animation = "ocultarMenu .5s alternate forwards"
    btn2.style.display = 'none'
    btn.style.display = 'flex'
    icon.forEach(e => {
        e.style.display = 'flex';
    });
}
document.body.addEventListener('click', e => {
    if (e.target.className === 'section-mobile') {
        switch (e.target.textContent) {
            case 'Character':
                ocultar_seccion();
                title.textContent = "Character"
                changePage(1);
                break;
            case 'Location':
                ocultar_seccion();
                title.textContent = "Location";
                changePageLocation(1)
                break;
            case 'Episodes':
                ocultar_seccion();
                title.textContent = "Episodes"
                changePageEpisode()
                break;
        }
    }
    //ESTO DETECTA SI EL ELEMENTO PRESIONADO TIENE LA CALSE SECTION-DESK (secciones del menu )
    //Y EJECUTA LA RESPECTIVA FUNCION, SI SE PRESIONA PERSONAJES --> MUESTRA PERSONAJES
    if (e.target.className === 'section-desk') {
        switch (e.target.textContent) {
            case 'Personajes':
                changePage(1);
                cambiarBuscador(1)
                break;
            case 'Locaciones':
                changePageLocation(1)
                cambiarBuscador(0)
                break;
            case 'Episodios':
                changePageEpisode(1)
                cambiarBuscador(0)
                break;
        }
    }
})

//esta funcion es para ocultar el buscador 
//si no se oculta no habra coherencia en buscar un personaje en la seccion de locaciones
const cambiarBuscador = (numero) => {
    if (numero == 0) {
        buscadorPersonajes.forEach(e => {
            e.style.display = 'none'
        })
    } else if (numero == 1) {
        buscadorPersonajes.forEach(e => {
            e.style.display = 'flex'
        })
    }
}