// Aquí se mostrará el personaje al hacer clic sobre la imagen
// https://rickandmortyapi.com/api/character/1

// Obtener los elementos para luego afectar sus valores
let div_screen = document.querySelector('.pantalla-negra');
let div_info = document.querySelector('.pantalla');
const close = document.querySelector(".btn_close");
let timeoutId; // Variable para almacenar el ID del timeout
let estado = false;//para validar que al dar click a escape no se ejecute la animacion excepto se abra una ventana


//elementos con valor
let img_element = document.querySelector('.img_person');
let title_element = document.querySelector('.title');
let gender_element = document.querySelector('.gender');
let state_element = document.querySelector('.state');
let location_element = document.querySelector('.location');
let origin_element = document.querySelector('.origin');
let species_element = document.querySelector('.species');
let date_element = document.querySelector('.sub_footer_info');
let icon_gs_1 = document.querySelector('.icon-gs-1')
let icon_gs_2 = document.querySelector('.icon-gs-2')


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
  fetch(`https://rickandmortyapi.com/api/character/${id}`)
    .then(response => response.json())
    .then(data => {
      if(data.status == 'Alive') {
        state_element.style.color = 'green'
      }else if(data.status == "Dead"){
        state_element.style.color = 'red'
      }else{
        state_element.style.color = 'gray'
      }
      //console.log(data); // Aquí puedes trabajar con los datos del personaje obtenidos de la API
      img_element.src = `${data.image}`;
      title_element.textContent = data.name
      gender_element.textContent = data.gender
      //detectar si es masculino o femenino
      console.log(data.gender)
      icon_gs_1.className = "icon-gs-1"
      icon_gs_1.classList.add(data.gender);
      //detectar si es humano o no
      species_element.textContent =data.species
      icon_gs_2.className = "icon-gs-2"
      icon_gs_2.classList.add(data.species);

      state_element.textContent = data.status
      location_element.textContent = "Location:  " + data.location.name
      origin_element.textContent = "Origin:    " + data.origin.name
      date_element.textContent = "Created: " + data.created
    
    })
    .catch(error => {
      console.log('Error:', error);
    });
};
let articles = document.querySelectorAll('article');
document.body.addEventListener('click', (e) => {
  if (e.target.className === 'image' && e.target.className != "icon-search" && e.target.className != "img_person") {
    console.log('se presiono')
    estado = true
    let id_character = e.target.id;
    obtener(id_character);
    mostrar();
  }
});
