const API_KEY = `98325a9d3ed3ec225e41ccc4d360c817`;
const image_path = `https://image.tmdb.org/t/p/w1280`;

const main_grid = document.querySelector('.movies-grid');

async function fetchFavourites(){
    main_grid.innerHTML='';
    const movies_LS=await getLs();
    const movies=[];
    for(let i=0; i<movies_LS.length; i++){
        const movie_id=movies_LS[i];
        let movie=await getMovieById(movie_id);
        addFavouritesToDomFromLs(movie);
        movies.push(movie); 
    }
    const cards = document.querySelectorAll('.card');

     addClickEffects(cards);
}

function getLs(){
    const movie_ids = JSON.parse(localStorage.getItem('movie-id'))
    return movie_ids === null ? [] : movie_ids
}

async function getMovieById (id) {
    const resp = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
    const respData = await resp.json()
    return respData;
}

function addFavouritesToDomFromLs(movie){
    main_grid.innerHTML += `
    <div class="card" data-id="${movie.id}">
        <div class="img">
            <img src="${image_path + movie.poster_path}">
        </div>
        <div class="info">
            <h2>${movie.title}</h2>
            <div class="single-info">
                <span>Rate: </span>
                <span>${movie.vote_average} / 10</span>
            </div>
            <div class="single-info">
                <span>Release Date: </span>
                <span>${movie.release_date==null?movie.first_air_date:movie.release_date}</span>
            </div>
        </div>
    </div>
`;

}

function addClickEffects(cards){
    cards.forEach(card => {
        card.addEventListener('click', () => openDetails(card))
    })
}

function openDetails(card){
    const id = card.getAttribute('data-id');
    savePicked(id);
    window.location.replace("details.html");
}
function savePicked (id) {
    localStorage.setItem('chosenMovieId', JSON.stringify(id));
}
fetchFavourites();


