import Movie from "./movie.js"


const main = document.querySelector('main')


document.addEventListener('click',event =>{
    if(event.target.classList.contains('add-btn') ){
        renderWatchlist()
    }
})

function renderWatchlist(){

    const watchlist = JSON.parse(window.localStorage.getItem('watchlist'))

    if (Object.keys(watchlist).length>0){
        const fragment = document.createDocumentFragment()

        for(let key in watchlist){
            const movieData = watchlist[key]
            
            const movie = new Movie(movieData)
            fragment.appendChild(movie.createMovieCard())
        }
        main.textContent = ''
        main.appendChild(fragment)
    }

    else{
        main.innerHTML = `
        <div class="message-container">
            <h3>Your watchlist is looking a little empty...</h3>
            <a href="index.html"><span class="fa">\u{f055}</span>  Let’s add some movies!</a>
        </div>
        `
    }
    
}

renderWatchlist()