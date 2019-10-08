
const searchButton  = document.querySelector('#js__search__Button');
const messageError  = document.querySelector('#js__message__Error');
const pokemon       = document.querySelector('#js__pokemon__Sprite');

searchButton.addEventListener('click', searchPokemon);

function searchPokemon() {

    const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
    const textSearchInput = document.querySelector('#js__input-search').value;
    
    const pokemon = `${BASE_URL}${textSearchInput}`;
    
    axios.get(pokemon)
        .then(pokemonJSON => {
            return renderPokemon(pokemonJSON.data.sprites.front_default);
        })
        .catch(() => { 
            return renderMessageError();
        })
}


function renderPokemon(sprite) {

    messageError.textContent = '';

    pokemon.setAttribute('src', sprite);
    pokemon.style.display = 'inherit';
}

function renderMessageError() {

    pokemon.style.display = 'none';
    messageError.textContent = 'Ningún Pokémon Salvaje Apareció 😥';
}
