
const poekApi = {}

function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon();
    pokemon.number = pokeDetail.id
    pokemon.name = pokeDetail.name

    const types = pokeDetail.types.map((typeSlot)=> typeSlot.type.name)
    const [type1] = types

    pokemon.types = types
    pokemon.type = type1;

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default
    
    return pokemon
}

poekApi.getPokemonsDetail = (pokemon) =>{
    return fetch(pokemon.url)
        .then((response)=> response.json())
        .then(convertPokeApiDetailToPokemon)
}

poekApi.getPokemons = (offset = 0, limit = 6) =>{
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
    .then((response)=>{ // pega o arquivo json
        // debugger // usando o debugger podemos adcionar um breakpoint diretamente no arquivo js
        return response.json(); // Transformando o promyse da requisição em JSON
    })
    .then((jsonBody)=> jsonBody.results)
    .then((pokemons)=> pokemons.map(poekApi.getPokemonsDetail))
    .then((detailRequests)=> Promise.all(detailRequests))
    .then((pokemonDetails)=> pokemonDetails)
    .catch((error)=>console.log(error))
}