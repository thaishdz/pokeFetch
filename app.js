
const searchButton  = document.querySelector('#js__search__Button');
const messageError  = document.querySelector('#js__message__Error');
const pokemon       = document.querySelector('#js__pokemon__Sprite');

searchButton.addEventListener('click', searchPokemon);

function searchPokemon() {

    const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
    const textSearchInput = document.querySelector('#js__input__search').value;
    
    const pokemon = `${BASE_URL}${textSearchInput}`;
    const stats = [];
    
    axios.get("https://pokeapi.co/api/v2/pokemon/150")
        .then(pokemonJSON => {
            stats.push({
                name: pokemonJSON.data.name,
                type: pokemonJSON.data.types[0].type.name,
                speed: pokemonJSON.data.stats[0].base_stat,
                "special-defense": pokemonJSON.data.stats[1].base_stat,
                "special-attack" : pokemonJSON.data.stats[2].base_stat,
                defense : pokemonJSON.data.stats[3].base_stat,
                attack : pokemonJSON.data.stats[4].base_stat,
                hp : pokemonJSON.data.stats[5].base_stat,
            })
            renderStats(stats);
            return renderPokemon(pokemonJSON.data.sprites.front_default);
        })
        .catch(() => { 
            return renderMessageError();
        })
}


function renderPokemon(sprite,stats) {

    
    messageError.textContent = '';
    
    pokemon.setAttribute('src', sprite);
}

function renderMessageError() {

    pokemon.style.display = 'none';
    messageError.textContent = 'Ningún Pokémon Salvaje Apareció 😥';
}


function renderStats(stats) {
    
    const statsPokemon = document.querySelector("#stats-pokemon");
    const HP = document.querySelector("#hp");
    const nameType = document.querySelector("#name__type");
    statsPokemon.classList.remove("hidden");

    stats.map( attribute => {

        HP.textContent = `HP: ${attribute.hp}`;
        nameType.textContent = `${attribute.name} ${attribute.type}`
    });

}
