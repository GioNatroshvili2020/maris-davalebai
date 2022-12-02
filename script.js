const API_KEY = `98325a9d3ed3ec225e41ccc4d360c817`;
const image_path = `https://image.tmdb.org/t/p/w1280`;

const searchInput = document.querySelector('.search input');
const searchButton = document.querySelector('.search button')
const title = document.querySelector('.wrapper h1');
const moviesGrid = document.querySelector('.movies-grid');

const popup_container = document.querySelector('.popup-container')


function addClickEffects(cards){
    cards.forEach(card => {
        card.addEventListener('click', () => openDetails(card))
    })
}




searchButton.addEventListener('click', addSearchResults);


async function getSearchResults (key) {
    const resp = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${key}`)
    const respData = await resp.json();
    return {data: respData.results, searchKey: key}
}
async function addSearchResults () {
    if(!searchInput.value) {
        addTrendings();
        return;
    }
    const {data, searchKey} = await getSearchResults(searchInput.value)

    title.innerText = `Results for '${searchKey}':`;
    moviesGrid.innerHTML = data.map(e => {
        return `
            <div class="card" data-id="${e.id}">
                <div class="img">
                    <img src="${image_path + e.poster_path}">
                </div>
                <div class="info">
                    <h2>${e.title==null?e.name:e.title}</h2>
                    <div class="single-info">
                        <span>Rate: </span>
                        <span>${e.vote_average} / 10</span>
                    </div>
                    <div class="single-info">
                        <span>Release Date: </span>
                        <span>${e.release_date==null?e.first_air_date:e.release_date}</span>
                    </div>
                </div>
            </div>
        `
    }).join('')

    const cards = document.querySelectorAll('.card')
    addClickEffects(cards)
}






getTrendings()
async function getTrendings () {
    const resp = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}`)
    const respData = await resp.json()
    return respData.results
}

async function addTrendings () {

    const data = await getTrendings()
    title.innerText = `Trending`;

    moviesGrid.innerHTML = data.slice().map(e => {
        return `
            <div class="card" data-id="${e.id}">
                <div class="img">
                    <img src="${image_path + e.poster_path}">
                </div>
                <div class="info">
                    <h2>${e.title==null?e.name:e.title}</h2>
                    <div class="single-info">
                        <span>Rate: </span>
                        <span>${e.vote_average} / 10</span>
                    </div>
                    <div class="single-info">
                        <span>Release Date: </span>
                        <span>${e.release_date==null?e.first_air_date:e.release_date}</span>
                    </div>
                </div>
            </div>
        `
    }).join('')

    const cards = document.querySelectorAll('.card')
    addClickEffects(cards)

}

function openDetails(card){
    debugger
    const id = card.getAttribute('data-id');
    savePicked(id);
    window.location.replace("details.html");
}
function savePicked (id) {
    localStorage.setItem('chosenMovieId', JSON.stringify(id));
}

addTrendings()

