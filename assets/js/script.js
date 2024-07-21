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
            <div class="align-self-center">Valor 🤑 valor </div>
            <a class="btn btn-primary ms-auto " href="{link}" target="_blank">Comprar</a>
        </div>
    </div> 
</div> 
`;
//llamado ala API
let url = 'https://gamerpower.p.rapidapi.com/api/filter?platform=epic-games-store.steam.android&type=game.loot';
fetch(url, options)
    .then(res => res.json())
    .then(response => {
        console.log("🚀 ~ response:", response),//muestra toda la API
            console.log("🚀 ~ response:", response[0].title); //muestra el titulo del primer registro de la API
        createCards(response)//pasa la respuesta ala funcion createCards
    })
    .catch(err => console.error(err));


//crea las cards dependiendo de la cantidad q se le pida
const createCards = (juegos) => {
    const listaJuegos = document.getElementById("listaJuegos");

    for (let i = 0; i <= juegos.length; i++) {

        if (i >= juegos.length) break; //damos un limite que no pase la cantidad todal 

        // console.log("🚀 ~ createCards ~ i:", i)

        //remplazamos 
        let cardHTML = cardTemplate
            .replace("{img}", juegos[i].image)
            .replace("{title}", juegos[i].title)
            .replace("{description}", juegos[i].description)
            .replace("valor", juegos[i].worth)
            .replace("{link}", juegos[i].open_giveaway_url);
        // console.log("🚀 ~ createCards ~ juegos[i].open_giveaway_url:", juegos[i].open_giveaway_url)

        listaJuegos.insertAdjacentHTML('beforeend', cardHTML);
    }
}

