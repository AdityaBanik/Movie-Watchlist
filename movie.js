




const watchlist = JSON.parse(window.localStorage.getItem('watchlist'))

class Movie{

    constructor(data){
        this.movieData = data

        if(watchlist[data.imdbID]){
            this.inWatchlist = true
        }
        else{
            this.inWatchlist = false
        }
    }

    createMovieCard() {
        const {Title, Plot, Poster, imdbRating, Runtime, Genre}  = this.movieData

        const movieCard = document.createElement('article')
        movieCard.classList.add('movie-card')

            const img = document.createElement('img')
            img.src = Poster


            const movieCardContent = document.createElement('section')
            movieCardContent.classList.add('movie-card-content')

                const titleContainer = document.createElement('div')

                    const title = document.createElement('h3')
                    title.textContent= Title

                    const rating = document.createElement('p')
                    rating.classList.add('small-text')
                    rating.textContent = `⭐ ${imdbRating}`

                    titleContainer.appendChild(title)
                    titleContainer.appendChild(rating)
                
                const infoContainer = document.createElement('div')

                    const duration = document.createElement('p')
                    duration.classList.add('small-text')
                    duration.textContent = Runtime

                    const genre = document.createElement('p')
                    genre.classList.add('small-text')
                    genre.textContent = Genre
                    

                    const button = document.createElement('button')
                    button.classList.add('add-btn')
                  

                    modifyBtn(button,this.inWatchlist)
                   
                    button.addEventListener('click',this.modifyWatchlist.bind(this))
                    
                    infoContainer.appendChild(duration)
                    infoContainer.appendChild(genre)
                    infoContainer.appendChild(button)
                    

                const plot = document.createElement('p')
                plot.textContent = Plot 
                plot.classList.add('line-clamp')



                movieCardContent.appendChild(titleContainer)
                movieCardContent.appendChild(infoContainer)
                movieCardContent.appendChild(plot)
            
            movieCard.appendChild(img)
            movieCard.appendChild(movieCardContent)
        
            return movieCard
    }

    

    modifyWatchlist(event){
        let {movieData} = this
        
        if(this.inWatchlist){
           delete watchlist[movieData.imdbID] 
        }
        else{ 
            watchlist[movieData.imdbID] = movieData
        }
      
        window.localStorage.setItem('watchlist',JSON.stringify(watchlist))

        this.inWatchlist = !this.inWatchlist
        modifyBtn(event.currentTarget,this.inWatchlist)
        
        
        
    }

}

function modifyBtn(button,inWatchlist){
    button.classList.toggle('remove-btn')
    if(!inWatchlist){
        button.innerHTML = '<span class="fa add-btn">\u{f055}</span>  Watchlist'
        
        button.classList.remove('remove-btn')
    }
    else{
        button.innerHTML = '<span class="fa add-btn">\u{f056}</span>  Remove' 
        button.classList.add('remove-btn')
    }
}

export default Movie


/*Reference HTML
   <article class="movie-card">
        <img src="images/background.png" alt="">
        <section class="movie-card-content">
            <div>
                <h3>Blade Runner 2049</h3>
                <p class="small-text">⭐ 8.1</p>
            </div>
            <div>
                <p class="small-text">164 min</p>
                <p class="small-text">Action, Drama, Mystery</p>
                <button class="small-text add-btn"><i class="fa-solid fa-circle-plus"></i>Watchlist</button>
            </div>
            <p>Young Blade Runner K's discovery of a long-buried secret leads him to track down former Blade Runner Rick Deckard, who's been missin...</p>
        </section>
    </article>

*/












