const API_KEY = 'c31b6b59';
let moviesData = [];

async function searchMovies() {
    const searchInput = document.getElementById('movie-search').value;

    if (!searchInput) {
        alert('Please enter a movie name');
        return;
    }

    const movieListEl = document.querySelector(".movie-list");
        const filterSection = document.getElementById("filter-section"); // FIXED THIS LINE

    movieListEl.innerHTML = '<p>Loading...</p>';

    const response = await fetch(`http://www.omdbapi.com/?s=${searchInput}&apikey=${API_KEY}`);
    const data = await response.json();

    console.log(data);

    if (data.Response === "True") {
        moviesData = data.Search;
        filterSection.style.display = 'flex';
        document.getElementById('sort-filter').value = 'default';
        displayMovies(moviesData);
    } else {
        moviesData = [];
        filterSection.style.display = 'none';
        movieListEl.innerHTML = `<p class="error-message">${data.Error}</p>`;
    }
}

function displayMovies(movies) {
    const movieListEl = document.querySelector(".movie-list");
    movieListEl.innerHTML = movies.map((movie) => movieHTML(movie)).join("");
}
function applySorting() {
    const sortValue = document.getElementById('sort-filter').value;
    let sortedMovies = [...moviesData];

    switch(sortValue) {
        case 'a-z':
            sortedMovies.sort((a, b) => a.Title.localeCompare(b.Title));
            break;
        case 'z-a':
            sortedMovies.sort((a, b) => b.Title.localeCompare(a.Title));
            break;
        case 'newest':
            sortedMovies.sort((a, b) => parseInt(b.Year) - parseInt(a.Year));
            break;
        case 'oldest':
            sortedMovies.sort((a, b) => parseInt(a.Year) - parseInt(b.Year));
            break;
    }

    displayMovies(sortedMovies);
}


function showMovieDetails(imdbID) {
    localStorage.setItem("imdbID", imdbID);
    window.location.href = `${window.location.origin}/movie.html`;
}

function movieHTML(movie) {
    const poster = movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450?text=No+Poster";

    return `<div class="movie-card" onclick="showMovieDetails('${movie.imdbID}')">
        <div class="movie-card__container">
            <img src="${poster}" alt="" class="movie-poster" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22300%22 height=%22450%22%3E%3Crect fill=%22%23ddd%22 width=%22300%22 height=%22450%22/%3E%3Ctext fill=%22%23999%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dy=%22.3em%22 font-family=%22Arial%22 font-size=%2220%22%3ENo Poster%3C/text%3E%3C/svg%3E';">
            <h3>${movie.Title}</h3>
            <p><b>Year:</b> ${movie.Year}</p>
            <p><b>Type:</b> ${movie.Type}</p>
        </div>
    </div>`;
}
