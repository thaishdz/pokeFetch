
const textSearchInput = document.querySelector('#js__input__search');
const searchButton  = document.querySelector('#js__search__button');
const pokeSprite     = document.querySelector('#js__pokemon__sprite');
const messageError  = document.querySelector('#js__message__error');
const statsPokemon = document.querySelector("#stats-pokemon");


const handlerEnter = function(event) {
    if (event.keyCode === 13) {
    event.preventDefault();
    searchButton.click();
    }
}


searchButton.addEventListener('click', searchPokemon);
textSearchInput.addEventListener('keyup', handlerEnter);


function searchPokemon() {

    const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
    
    const pokemon = `${BASE_URL}${textSearchInput.value}`;
    const stats = [];
    
    axios.get(pokemon)
        .then(pokemonJSON => {
            console.log(pokemonJSON);
            
            stats.push({
                name: pokemonJSON.data.name,
                ...pokemonJSON.data.types.length != 1 ? 
                {type: [pokemonJSON.data.types[0].type.name, pokemonJSON.data.types[1].type.name].join("/")} :
                {type: pokemonJSON.data.types[0].type.name}
                ,
                speed: pokemonJSON.data.stats[0].base_stat,
                specialDefense: pokemonJSON.data.stats[1].base_stat,
                specialAttack : pokemonJSON.data.stats[2].base_stat,
                defense : pokemonJSON.data.stats[3].base_stat,
                attack : pokemonJSON.data.stats[4].base_stat,
                hp : pokemonJSON.data.stats[5].base_stat,
                number : pokemonJSON.data.game_indices[0].game_index
            })    
            renderStats(stats);
            return renderPokemon(pokemonJSON.data.sprites.front_default);
        })
        .catch((error) => { 
            console.error(error);
            return renderMessageError();
        })
}


function renderPokemon(sprite) {
    messageError.classList.add("hidden");
    statsPokemon.classList.remove("hidden");
    pokeSprite.src = sprite;
}

function renderMessageError() {

    const imageError  = document.querySelector('#js__image__error');

    backgroundType.style.background = '#F7DE5C';
    statsPokemon.classList.add("hidden");
    messageError.classList.remove("hidden");
    imageError.src = "img/imageError.jpg";
    text__error.textContent = 'No Wild Pokemon Found';
}


function renderStats(stats) {
    
    statsPokemon.classList.remove("hidden");

    const HP = document.querySelector("#hp");
    const name = document.querySelector("#name");

    stats.map( attribute => {

        HP.textContent = `HP: ${attribute.hp}`;
        name.textContent = `${attribute.name}`;
        number.textContent = `${attribute.number}`;
        
        type.textContent = `${attribute.type}`;
        defense.textContent = `${attribute.defense}`;
        specialDefense.textContent = `${attribute.specialDefense}`;
        specialAttack.textContent = `${attribute.specialAttack}`;
        attack.textContent = `${attribute.attack}`;
        speed.textContent = `${attribute.speed}`;

    });

    changeBackground(type.textContent);
}

function changeBackground(type) {

    const typeBackground = type.split("/");
    
    switch (typeBackground.length != 1 ? typeBackground[1] : typeBackground[0]) {
        case "grass":
            backgroundType.style.background = '#99E575';
        break;
        case "fire":
            backgroundType.style.background = '#ee8130';
        break;
        case "water":
            backgroundType.style.background = '#6390f0';
        break;
        case "electric":
            backgroundType.style.background = '#edd977';
        break;
        case "ground":
            backgroundType.style.background = '#c8d3e5';
        break;
        case "poison":
            backgroundType.style.background = '#B836FF';
        break;
        case "rock":
            backgroundType.style.background = '#c8d3e5';
        break;
        case "psychic":
            backgroundType.style.background = '#D769A3';
        break;
    }
}
