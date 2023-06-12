function getEpisodes(page, done) {
  const apiUrl = `https://rickandmortyapi.com/api/episode?page=${page}`;
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      done(data.results, data.info.pages);
    });
}

//crea numero aleatorio
function generarNumeroAleatorio() {
  return Math.floor(Math.random() * 5) + 1;
}
//recibe numero aleatorio y asigna una imagen random
function asignarImagen(numero) {
  const imagenes = [
    '../img/random-img/1.jpg',
    '../img/random-img/2.jpg',
    '../img/random-img/3.jpg',
    '../img/random-img/4.png',
    '../img/random-img/5.jpg'
  ];

  if (numero >= 1 && numero <= 5) {
    return imagenes[numero - 1];
  } else {
    return null; // Valor inválido, retorna null
  }
}

function displayEpisodes(episodes) {
  const main = document.querySelector("main");
  main.innerHTML = ""; // Limpiar el contenido principal antes de agregar los episodios
  episodes.forEach(episode => {
    let a = generarNumeroAleatorio()
    let image = asignarImagen(a) 
    const article = document.createRange().createContextualFragment(/*html*/`
        <article>
          <div class="image-container-location">
            <img  id="${episode.id}" class="image-episode" src="${image}" alt="Personaje">
          </div>
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


changePageEpisode()
