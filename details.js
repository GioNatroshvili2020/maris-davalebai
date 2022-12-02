const API_KEY = `98325a9d3ed3ec225e41ccc4d360c817`;
const image_path = `https://image.tmdb.org/t/p/w1280`;
const popup_container = document.querySelector('.popup-container')


function getChosenId(){
    const movieId = JSON.parse(localStorage.getItem('chosenMovieId'))
    return movieId;
}

async function getMovieById (id) {
    const resp = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
    const respData = await resp.json()
    return respData
}
async function getTrailer (id) {
    const resp = await fetch(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`)
    const respData = await resp.json()
    return respData.results[0].key
}

async function showDetails () {
    popup_container.classList.add('show-popup');
    
    const movie_id = getChosenId();
    const movie = await getMovieById(movie_id);
    const movie_trailer = await getTrailer(movie_id);
    popup_container.style.background = `linear-gradient(rgba(0, 0, 0, .8), rgba(0, 0, 0, 1)), url(${image_path + movie.poster_path})`

    popup_container.innerHTML = `
            <div class="content">
                <div class="left">
                    <div class="poster-img">
                        <img src="${image_path + movie.poster_path}" alt="">
                    </div>
                    <div class="single-info">
                        <span>Add to favorites:</span>
                        <span class="heart-icon">&#9829;</span>
                    </div>
                </div>
                <div class="right">
                    <h1>${movie.title}</h1>
                    <h3>${movie.tagline}</h3>
                    <div class="single-info-container">
                        <div class="single-info">
                            <span>Language:</span>
                            <span>${movie.spoken_languages[0].name}</span>
                        </div>
                        <div class="single-info">
                            <span>Length:</span>
                            <span>${movie.runtime} minutes</span>
                        </div>
                        <div class="single-info">
                            <span>Rate:</span>
                            <span>${movie.vote_average} / 10</span>
                        </div>
                        <div class="single-info">
                            <span>Budget:</span>
                            <span>$ ${movie.budget}</span>
                        </div>
                        <div class="single-info">
                            <span>Release Date:</span>
                            <span>${movie.release_date}</span>
                        </div>
                    </div>
                    <div class="genres">
                        <h2>Genres</h2>
                        <ul>
                            ${movie.genres.map(e => `<li>${e.name}</li>`).join('')}
                        </ul>
                    </div>
                    <div class="overview">
                        <h2>Overview</h2>
                        <p>${movie.overview}</p>
                    </div>
                    <div class="trailer">
                        <h2>Trailer</h2>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/${movie_trailer}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </div>
            </div>
    `;


    const heart_icon = popup_container.querySelector('.heart-icon');
    const movie_ids = getFromLs();
    for(let i = 0; i <= movie_ids.length; i++) {
        if (movie_ids[i] == movie_id) heart_icon.classList.add('change-color')
    }

    heart_icon.addEventListener('click', () => {
        if(heart_icon.classList.contains('change-color')) {
            removeLs(movie_id);
            heart_icon.classList.remove('change-color');
        }
        else{
            addToLs(movie_id);
            heart_icon.classList.add('change-color');
        }

    });
};
function getFromLs(){
    const movie_ids = JSON.parse(localStorage.getItem('movie-id'))
    return movie_ids === null ? [] : movie_ids
}

function addToLs (id) {
    const movie_ids = getFromLs()
    localStorage.setItem('movie-id', JSON.stringify([...movie_ids, id]))
}
function removeLs (id) {
    const movie_ids = getFromLs()
    localStorage.setItem('movie-id', JSON.stringify(movie_ids.filter(e => e !== id)))
}

showDetails();