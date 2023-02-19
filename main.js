
import Movie from "./movie.js"

const form = document.getElementById('search')
const main = document.querySelector('main')



document.addEventListener('submit', getMovies)


async function getMovies(e){
    e.preventDefault()
    const formData = new FormData(form)
    const searchStr = formData.get('search-field')

    const searchResults = await searchMovies(searchStr)
    
    if (searchResults.Response == 'True'){

        //Getting imdbID's of search results
        const imdbArray = searchResults.Search.map(item => item.imdbID)

        //Getting movie data for those ID's
        const moviesData =  await Promise.all(imdbArray.map(
            async item =>  await getMovieDetails(item)
             ))

        renderMovies(moviesData)
    }
    else{
        renderError()
    }
}


async function searchMovies(string){
    const  response = await fetch(`http://www.omdbapi.com/?apikey=ce85253d&s=${string}`)
    const data = await response.json()
    return data
}

async function getMovieDetails(imdbID){
    const  response = await fetch(`http://www.omdbapi.com/?apikey=ce85253d&i=${imdbID}`)
    const data = await response.json()
    return data
}

function renderMovies(moviesData){

    const fragment = document.createDocumentFragment()
        
    moviesData.forEach(item => {
        const mov = new Movie(item)
        const movieCard = mov.createMovieCard()

        fragment.appendChild(movieCard)
    })

    main.textContent = ''
    main.appendChild(fragment)
}

function renderError(){
    main.innerHTML =  `
    <div class="message-container">
        <h3>Unable to find what you’re looking for. Please try another search.</h3>
    </div>`

}

//Setting up local Storage 
if (localStorage.getItem('watchlist') === null){
    localStorage.setItem('watchlist','{}')
}



export {renderMovies}