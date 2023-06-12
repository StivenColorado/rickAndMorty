const searchCharacter = () => {
  let characterName = document.querySelector('#input_character_name').value.toLowerCase().trim();
  let sizeScreen = innerWidth; 
  if (characterName.length === 0) {
    //alert("Por favor, ingrese un nombre de personaje para buscar.");
    return;
  }
  let allCharacters = [];
  let clase = "color_vivo"
  let content = ''

  const processResponse = (data) => {
    const characters = data.results;
    allCharacters.push(...characters);

    if (characters.length > 0) {
      const main = document.querySelector("main");
      main.innerHTML = ""; // Limpiar el contenido previo en cada búsqueda
      characters.forEach(character => {
        if (character.status == "Alive") {
          clase += "_green";
        }
        if (character.status == "Dead") {
          clase += "_red";
        }
        if (character.status == "unknown") {
          clase += "_gray";
        }
        if(sizeScreen > 480){
          content = `
          <article>
            <div class="image-container">
              <img id="${character.id}" class="image" src="${character.image}" alt="Personaje">
            </div>
            <div class="info_personaje">
              <h2>${character.name}</h2>
              <div>
                <span><b>Género:</b> ${character.gender}</span>
              </div>
              <div>
                <span><b>Estado:</b> <span class=${clase}>${character.status}</span></span>
              </div>
              <div>
                <span><b>Localización:</b> ${character.location.name}</span>
              </div>
            </div>
          </article>
        `
        }else{
          content = `
          <article>
            <div class="image-container">
              <img id="${character.id}" class="image" src="${character.image}" alt="Personaje">
            </div>
            <div class="info_personaje">
              <h2>${character.name}</h2>
            </div>
          </article>
        `
        }
        //console.log(content)
        //console.log(sizeScreen)
        const article = document.createRange().createContextualFragment(/*html*/ content);
        main.appendChild(article);
        clase = "color_vivo";
      });
      
    } else {
      //alert("No se encontraron personajes con ese nombre.");
    }
  };

  const processError = (error) => {
    console.error(error);
    alert("Ocurrió un error al buscar los personajes.");
  };

  fetch(`https://rickandmortyapi.com/api/character?page=1&name=${characterName}`)
    .then(response => response.json())
    .then(data => {
      processResponse(data);
    })
    .catch(error => {
      processError(error);
    });
};
