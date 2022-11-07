// Site para os dados da API https://pokeapi.co/api/v2/pokemon

// https://pokeapi.co/api/v2/pokemon?

// https://pokeapi.co/api/v2/pokemon?offset=2&limit=2

// dois parametros no arquivo JSON
// offset = 20 a pagina
// Limit = 20 a quantidade de objetos
const pokemonOl = document.getElementById('pokemonlist');
const loadMore = document.getElementById('btn-next');
const maxRecords = 151;
const limit = 10;
let offset = 0;

function convertPokemoToLi(pokemon){

    return `
    <li class="pokemon ${pokemon.type}">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>

        <div class="detail">
            <ol class="types">
                ${pokemon.types.map((type)=> `<li class="type ${type}">${type}<li>`).join("")}
            </ol>
            <img src="${pokemon.photo}" alt="${pokemon.name}">
        </div>
    </li>
    `
}
function LoadPokemomItems(offset, limit){
    poekApi.getPokemons(offset,limit).then((pokemons = []) =>{
        const novaLista = pokemons.map((pokemon)=> convertPokemoToLi(pokemon)) // A função map ira percorrer um array ou itens de uma lista
        const newhtml = novaLista.join("")
    
        pokemonOl.innerHTML += newhtml;
    })
}

LoadPokemomItems(offset,limit)

loadMore.addEventListener('click', ()=>{
    offset += limit

    const qtRecord = offset + limit;

    if(qtRecord >= maxRecords){
        debugger
        const newLimit = maxRecords - offset;
        LoadPokemomItems(offset, newLimit)

        loadMore.parentElement.removeChild(loadMore)
        const div = document.getElementsByClassName('pagination')
        console.log(div)

    }else{
        LoadPokemomItems(offset,limit)
    }
})

