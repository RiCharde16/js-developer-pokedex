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
const pokemonsList = document.getElementsByClassName("pokemon");
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

        for(pokemon of pokemonsList){
            // console.log(pokemonsList[index])
            // pokemon.addEventListener("click",()=>[
            //     alert("Teste")
            // ])
            pokemon.addEventListener('click',(e)=> pegarNomeDoPokemon(e))
        }
    })
}

function pegarNomeDoPokemon(nome){
    spanName = nome.currentTarget.querySelector("span.name").innerHTML;
    // console.log(nome.currentTarget.querySelector("span.name"))
    // console.log(spanName)
    fetch(`https://pokeapi.co/api/v2/pokemon/${spanName}`)
        // .then((response)=> console.log(response))
        .then((response)=> response.json())
        .then((responseJson) => {
            var types = responseJson.types;
            var abilities = responseJson.abilities;
            var stats = responseJson.stats;
            var image = responseJson.sprites.other.dream_world.front_default;
            // Função que vai chamar a construção do card
            montarCard(spanName,types, abilities, stats, image);

            // console.log(image)
            // console.log(abilities)  
            // console.log(types)
            // console.log(stats)
        })
}

// Construção do card do pokemon
montarCard=(name, types, abilities, stats, image)=>{
    const main = document.getElementsByClassName("container")[0];
    var btn_close = document.getElementById("btn_close");
    var progress_bar = document.getElementsByClassName("progress-bar") 
    var nome_pokemon = document.getElementById("name");
    var image_background = document.getElementsByClassName('card-img')[0]
    var image_pokemon = image_background.getElementsByTagName('img')[0];
    var abilities_pokemon = document.querySelectorAll('.abilities ul li')
    var states_pokemon = document.querySelectorAll('.state p:last-child'); 
    
    image_pokemon.src = image
    // console.log(states_pokemon)
    // var types_pokemon = document.querySelectorAll(".card-type span")
    var types_card = document.getElementsByClassName('card-type')[0];

    nome_pokemon.textContent = name;
    nome_pokemon.setAttribute('class',`${types[0].type.name}`) 
    // console.log(types_pokemon)
    types_card.innerHTML = "";
    main.style.display = "flex";
    // nome_pokemon.textContent = 

    btn_close.addEventListener('click',()=>{
        main.style.display = "none"
        image_background.classList.remove(types[0].type.name)
    })
    // console.log(main)
    
    for(var item = 0; item < types.length; item ++){
        var type_span = document.createElement('span');

        var span = types_card.appendChild(type_span)
        span.setAttribute('class',`${types[item].type.name}`)
        span.textContent = types[item].type.name;
        // image_background.setAttribute("class",types[0].type.name) 
        image_background.classList.add(types[0].type.name)
        // console.log(image_background)
    }
    for(var item = 0;  item < abilities.length; item++){
        // console.log(item.ability.name)
        abilities_pokemon[item].textContent = abilities[item].ability.name
        // console.log(abilities[item].ability.name)
    }
    for(var i = 0; i < 3; i++){
        var hp = document.getElementById('hp'); 
        var atk = document.getElementById('attack'); 
        var def = document.getElementById('defense'); 

        progress_bar[i].title = `${stats[i].stat.name} / ${stats[i].base_stat}`;
        states_pokemon[i].textContent = stats[i].base_stat
        if(i == 0){
            hp.style.width = stats[i].base_stat+"px";
        }
        else if(i == 1){
            atk.style.width = stats[i].base_stat+"px";
        }
        else if(i == 2){
            def.style.width = stats[i].base_stat+"px";
        }
        // console.log(hp)

        // console.log(stats[i].stat.name)
        // console.log(stats[i].base_stat)
    }
}


// Ira carregar a lista de pokemon da pole-api
LoadPokemomItems(offset,limit)

loadMore.addEventListener('click', ()=>{
    offset += limit

    const qtRecord = offset + limit;

    if(qtRecord >= maxRecords){
        debugger
        const newLimit = maxRecords - offset;
        LoadPokemomItems(offset, newLimit)

        loadMore.parentElement.removeChild(loadMore)

    }else{
        LoadPokemomItems(offset,limit)
        // rodar()
       
    }
})




