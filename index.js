const API_KEY = 'c31b6b59';

async function searchMovies() {
    const searchInput = document.getElementById('movie-search').value;

    if (!searchInput) {
        alert('Please enter a movie name');
        return;
    }


    const movieListEl = document.querySelector(".movie-list");
    movieListEl.innerHTML = '<p>Loading...</p>';

    // Using the 's' parameter for search
    const response = await fetch(`http://www.omdbapi.com/?s=${searchInput}&apikey=${API_KEY}`);
    const data = await response.json();

    console.log(data);

    if (data.Response === "True") {
        movieListEl.innerHTML = data.Search.map((movie) => movieHTML(movie)).join("");
    } else {
        movieListEl.innerHTML = `<p class="error-message">${data.Error}</p>`;
    }
}


function showMovieDetails(imdbID) {
    localStorage.setItem("imdbID", imdbID);
    window.location.href = `${window.location.origin}/movie.html`;
}

function movieHTML(movie) {
    const poster = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster";

    return `<div class="movie-card" onclick="showMovieDetails('${movie.imdbID}')">
        <div class="movie-card__container">
            <img src="${poster}" alt="${movie.Title}" class="movie-poster">
            <h3>${movie.Title}</h3>
            <p><b>Year:</b> ${movie.Year}</p>
            <p><b>Type:</b> ${movie.Type}</p>
            <p><b>IMDb ID:</b> ${movie.imdbID}</p>
        </div>
    </div>`;
}
