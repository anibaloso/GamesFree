//llaves autentificacion
const options = {
    headers: {
        'x-rapidapi-key': '840ee180f5msh38df9daea86120dp13726djsn2d34784026fd',
        'x-rapidapi-host': 'gamerpower.p.rapidapi.com'
    }
};

//plantilla cards
const cardTemplate = `
<div class="col-12 col-sm-12 col-md-6 col-lg-4 col-xl-3 m-3" >
    <div class="card " style="width: 18rem;  max-height:28rem; min-height:28rem;" >
        <img src="{img}" class="card-img-top" alt="...">
        <div class="card-body overflow-auto">
            <h5 class="card-title">{title}</h5>
            <p class="card-text ">{description}</p>
        </div>
        <div class="card-footer text-body-secondary d-flex"  >
            <div class="align-self-center">Valor 🤑 {valor} </div>
            <a class="btn btn-primary ms-auto " href="{link}" target="_blank">Adquirir</a>
        </div>
    </div> 
</div> 
`;


//llamado ala API
let url = 'https://gamerpower.p.rapidapi.com/api/filter?platform=epic-games-store.steam.android&type=game.loot';
fetch(url, options)
    .then(res => res.json())
    .then(response => {
        //console.log("🚀 ~ response:", response),//muestra toda la API
        //console.log("🚀 ~ response:", response[0].title); //muestra el titulo del primer registro de la API
        createCards(response)//pasa la respuesta ala funcion createCards
    })
    .catch(err => console.error(err));

//-----------------------------------------------------------------

// Variables para guardar el botón presionado y la lista de juegos
let selectedPlatform = null;
let allGames = [];

// Función para crear las tarjetas
const createCards = (juegos) => {
    allGames = juegos; // Guarda todos los juegos
    console.log("🚀 ~ createCards ~ allGames:", allGames)
    filterAndDisplayCards();
};

// Función para filtrar y mostrar las tarjetas según la plataforma seleccionada
const filterAndDisplayCards = () => {
    const listaJuegos = document.getElementById("listaJuegos");
    listaJuegos.innerHTML = ''; // Limpia las tarjetas actuales

    let filteredGames = allGames;

    if (selectedPlatform) {
        filteredGames = allGames.filter(game => game.platforms.includes(selectedPlatform));
        console.log("🚀 ~ filterAndDisplayCards ~ filteredGames:", filteredGames)
    }

    for (let i = 0; i < filteredGames.length ; i++) { // Mostrar solo 6 productos
        let cardHTML = cardTemplate
            .replace("{img}", filteredGames[i].image)
            .replace("{title}", filteredGames[i].title)
            .replace("{description}", filteredGames[i].description)
            .replace("{valor}", filteredGames[i].worth)
            .replace("{link}", filteredGames[i].open_giveaway_url);

        listaJuegos.insertAdjacentHTML('beforeend', cardHTML);
    }
};

// Función para manejar los clics en los botones
const handleButtonClick = (event) => {
    const button = event.target;
    selectedPlatform = button.innerText.trim(); // Guarda la plataforma seleccionada
    console.log("🚀 ~ Platform selected:", selectedPlatform);
    if (selectedPlatform=='Todos') {
        selectedPlatform='';
        filterAndDisplayCards();// Filtra y muestra las tarjetas según la plataforma seleccionada
    }else{
        filterAndDisplayCards();// Filtra y muestra las tarjetas según la plataforma seleccionada
    }
     
};

// Añadir event listeners a cada botón
document.getElementById('btnSteam').addEventListener('click', handleButtonClick);
document.getElementById('btnEpic').addEventListener('click', handleButtonClick);
document.getElementById('btnPropio').addEventListener('click', handleButtonClick);
document.getElementById('btnAndroid').addEventListener('click', handleButtonClick);
document.getElementById('btnTodos').addEventListener('click',handleButtonClick);




// ----------------------------------------------------------------

// //veo que boton se apreta
// let button = null;

// let palabra = [];
// let comparacion=null;
// let platforms=null;
// //crea las cards dependiendo de la cantidad q se le pida
// const createCards = (juegos) => {
//     const listaJuegos = document.getElementById("listaJuegos");
//     if (button != null) {
//         for (let i = 0; i <= juegos.length; i++) {
//             platforms=juegos[i].platforms;
//             console.log("🚀 ~ createCards ~ platforms:", platforms)
//         }
//     } else {
//         for (let i = 0; i <= juegos.length; i++) {

//             if (i >= juegos.length) break; //damos un limite que no pase la cantidad todal

//             // console.log("🚀 ~ createCards ~ i:", i)

//             //remplazamos
//             let cardHTML = cardTemplate
//                 .replace("{img}", juegos[i].image)
//                 .replace("{title}", juegos[i].title)
//                 .replace("{description}", juegos[i].description)
//                 .replace("valor", juegos[i].worth)
//                 .replace("{link}", juegos[i].open_giveaway_url);
//             // console.log("🚀 ~ createCards ~ juegos[i].open_giveaway_url:", juegos[i].open_giveaway_url)

//             listaJuegos.insertAdjacentHTML('beforeend', cardHTML);

//         }
//     }
// }

// const handleButtonClick = (event) => {
//     button = (event.target).innerText;
//     console.log("🚀 ~ btnApretado ~ button:", button)
// }

// // Añadir event listeners a cada botón
// document.getElementById('btnSteam').addEventListener('click', handleButtonClick);
// document.getElementById('btnEpic').addEventListener('click', handleButtonClick);
// document.getElementById('btnPropio').addEventListener('click', handleButtonClick);
// document.getElementById('btnAndroid').addEventListener('click', handleButtonClick);


