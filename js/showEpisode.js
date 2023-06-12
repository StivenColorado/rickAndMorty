// Aquí se mostrará el personaje al hacer clic sobre la imagen
// https://rickandmortyapi.com/api/character/1

// Obtener los elementos para luego afectar sus valores
let div_screen = document.querySelector('.pantalla-negra');
let div_info = document.querySelector('.pantalla');
const close = document.querySelector(".btn_close");
let timeoutId; // Variable para almacenar el ID del timeout
let estado = false;//para validar que al dar click a escape no se ejecute la animacion excepto se abra una ventana


//elementos con valor
let contenedor_imagenes = document.querySelector('.container-photos')
let title_element = document.querySelector('.title');
let location_element = document.querySelector('.location');
let air_date = document.querySelector('.air_date')
let num_episode = document.querySelector('.num_episode')
let num_character = document.querySelector('.num_character')
let date_element = document.querySelector('.sub_footer_info');



const mostrar = () => {
    div_screen.style.display = 'flex';
    div_info.style.display = 'flex';
    div_screen.style.animation = 'aparecer 2s alternate forwards';
    div_info.style.animation = 'aparecer2 2s alternate forwards';
};

const ocultar = () => {
    div_screen.style.animation = 'ocultar 2s alternate forwards';
    div_info.style.animation = 'ocultar2 2s alternate forwards';
    timeoutId = setTimeout(() => {
        div_screen.style.display = 'none';
        div_info.style.display = 'none';
    }, 1500);
};

close.addEventListener('click', () => {
    clearTimeout(timeoutId); // Cancelar el timeout anterior
    ocultar();
});
document.body.addEventListener('keydown', e => {//cuando se presione la tecla esc
    if (e.key == 'Escape' && estado == true) {
        clearTimeout(timeoutId); // Cancelar el timeout anterior
        ocultar();
    }
})
let clase = "color_vivo"

const obtener = (id) => {
    fetch(`https://rickandmortyapi.com/api/episode/${id}`)
        .then(response => response.json())
        .then(data => {
            //console.log(data); // Aquí puedes trabajar con los datos del personaje obtenidos de la API
            //promesa anidada
            const personajesEpisodio = data.characters
            contenedor_imagenes.innerHTML = ""
            let personaje_episodio;
            personajesEpisodio.forEach(url => {
                fetch(url)
                    .then(respuesta => respuesta.json())
                    .then(data_personaje => {
                        const img = document.createElement('img');
                        img.classList.add('img_person');
                        img.src = data_personaje.image;
                        img.setAttribute('alt',data_personaje.name);
                        contenedor_imagenes.appendChild(img);
                    })
                    .catch(error => {
                        console.log('error al mostrar los personajes del episodio', error)
                    })
            })
            title_element.textContent = data.name
            date_element.textContent = "Creado: " + data.created
            air_date.textContent = "Fecha lanzamiento: " + data.air_date
            num_episode.textContent = "Episodio: "+data.episode
            num_character.textContent = "Cantidad personajes: "+data.characters.length
        })
        .catch(error => {
            console.log('Error:', error);
        });
};
let articles = document.querySelectorAll('article');
document.body.addEventListener('click', (e) => {
    if (e.target.className === 'image-episode' && e.target.className != "icon-search" && e.target.className != "img_person") {
        console.log(e.target.id)
        estado = true
        let id_character = e.target.id;
        obtener(id_character);
        mostrar();
    }
});
