const API_KEY =

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


