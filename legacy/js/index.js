let loading = document.querySelector('.loading');



let sizeScreen = innerWidth
let icon = document.querySelector('.logo')
console.log(sizeScreen)
function getCharacters(page, done) {
  const apiUrl = `https://rickandmortyapi.com/api/character?page=${page}`;
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      done(data.results, data.info.pages);
    });
}

loading.style.display = 'flex'
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
    if (sizeScreen > 800) {
      const article = document.createRange().createContextualFragment(/*html*/`
      <article>
        <div class="image-container">
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
        <div class="image-container">
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
  loading.style.animation = 'desvanecer 1s alternate ease-in forwards' 
}

function changePage(page) {
  getCharacters(page, (characters, totalPages) => {
    displayCharacters(characters);
    displayPagination(totalPages);
  });
}

let currentPage = 1;
let firstTime = true;

function changePage(page) {
  console.log('si')
  currentPage = page; // Actualizar la página actual

  getCharacters(currentPage, (characters, totalPages) => {
    displayCharacters(characters);
    displayPagination(totalPages);
  });
}

function displayPagination(totalPages) {
  const paginationContainer = document.querySelector(".pagination");
  paginationContainer.innerHTML = ""; // Limpiar el contenido del paginador

  // Botón "Atrás"
  const previousButton = document.createElement("button");
  previousButton.className = "boton-pagina";
  previousButton.innerText = "Atrás";
  console.log(currentPage)
  previousButton.addEventListener("click", () => {
    if (currentPage > 0) {
      changePage(currentPage - 1)
    }
  });
  paginationContainer.appendChild(previousButton);

  // Botón "Primera página"
  const firstPageButton = document.createElement("button");
  firstPageButton.className = "boton-pagina";
  firstPageButton.classList.add("guia")
  firstPageButton.innerText = "1";
  firstPageButton.addEventListener("click", () => changePage(1));
  paginationContainer.appendChild(firstPageButton);

  // Botones de páginas intermedias
  if (firstTime) {
    for (let i = 2; i <= Math.min(totalPages - 1, 6); i++) {
      const pageButton = document.createElement("button");
      pageButton.className = "boton-pagina";
      pageButton.innerText = i;
      pageButton.addEventListener("click", () => changePage(i));
      paginationContainer.appendChild(pageButton);
    }
    firstTime = false;
  } else {
    paginationContainer.innerHTML = "";
    paginationContainer.appendChild(previousButton);
    paginationContainer.appendChild(firstPageButton);
    for (
      let i = Math.max(currentPage - 2, 2);
      i <= Math.min(currentPage + 3, totalPages - 1);
      i++
    ) {
      const pageButton = document.createElement("button");
      pageButton.className = "boton-pagina";
      pageButton.innerText = i;
      pageButton.addEventListener("click", () => changePage(i));
      paginationContainer.appendChild(pageButton);
    }
  }

  // Botón "Última página"
  if (totalPages > 1) {
    const lastPageButton = document.createElement("button");
    lastPageButton.className = "boton-pagina";
    lastPageButton.classList.add("guia")
    lastPageButton.innerText = totalPages;
    lastPageButton.addEventListener("click", () => changePage(totalPages));
    paginationContainer.appendChild(lastPageButton);
  }

  // Botón "Siguiente"
  const nextButton = document.createElement("button");
  nextButton.className = "boton-pagina";
  nextButton.innerText = "Siguiente";
  nextButton.addEventListener("click", () => {
    if (currentPage != totalPages) {
      changePage(currentPage + 1)
    }
  });
  paginationContainer.appendChild(nextButton);
}
changePage(1); // Mostrar la primera página de personajes

window.addEventListener('resize', function() {
  changePage(1);
});
icon.addEventListener('click', () => window.location = "./index.html")
  