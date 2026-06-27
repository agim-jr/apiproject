const API_KEY = 'c31b6b59';
const movieDetailsEl = document.querySelector('.movie-details');

async function renderMovieDetails() {
    const imdbID = localStorage.getItem("imdbID");

    if (!imdbID) {
        movieDetailsEl.innerHTML = `<p class="error-message">No movie selected. Please go back and select a movie.</p>`;
        return;
    }

    // Using the 'i' parameter to get movie by IMDb ID with full plot
    const response = await fetch(`http://www.omdbapi.com/?i=${imdbID}&plot=full&apikey=${API_KEY}`);
    const movie = await response.json();
    console.log(movie);

        if (movie.Response === "True") {
        const poster = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster";

        movieDetailsEl.innerHTML = `
            <div class="movie-detail-card">
                <div class="movie-detail__poster">
                    <img src="${poster}" alt="${movie.Title}">
                </div>
                <div class="movie-detail__info">
                    <h1>${movie.Title} (${movie.Year})</h1>
                    <p><b>Rated:</b> ${movie.Rated}</p>
                    <p><b>Released:</b> ${movie.Released}</p>
                    <p><b>Runtime:</b> ${movie.Runtime}</p>
                    <p><b>Genre:</b> ${movie.Genre}</p>
                    <p><b>Director:</b> ${movie.Director}</p>
                    <p><b>Writer:</b> ${movie.Writer}</p>
                    <p><b>Actors:</b> ${movie.Actors}</p>
                    <p><b>Plot:</b> ${movie.Plot}</p>
                    <p><b>Language:</b> ${movie.Language}</p>
                    <p><b>Country:</b> ${movie.Country}</p>
                    <p><b>Awards:</b> ${movie.Awards}</p>
                    ${movie.Ratings && movie.Ratings.length > 0 ? `
                        <div class="ratings">
                            <h3>Ratings:</h3>
                            ${movie.Ratings.map(rating => `
                                <p><b>${rating.Source}:</b> ${rating.Value}</p>
                            `).join('')}
                        </div>
                    ` : ''}
                    ${movie.imdbRating !== "N/A" ? `<p><b>IMDb Rating:</b> ${movie.imdbRating}/10 (${movie.imdbVotes} votes)</p>` : ''}
                    ${movie.Metascore !== "N/A" ? `<p><b>Metascore:</b> ${movie.Metascore}</p>` : ''}
                    ${movie.BoxOffice !== "N/A" ? `<p><b>Box Office:</b> ${movie.BoxOffice}</p>` : ''}
                    ${movie.Type === "series" && movie.totalSeasons ? `<p><b>Total Seasons:</b> ${movie.totalSeasons}</p>` : ''}
                    <p><b>IMDb ID:</b> ${movie.imdbID}</p>
                </div>
            </div>
        `;
    } else {
        movieDetailsEl.innerHTML = `<p class="error-message">${movie.Error}</p>`;
    }
}

// Load movie details when page loads
renderMovieDetails();
