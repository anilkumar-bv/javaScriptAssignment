// function to get Parameter by Name
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

var collectionTypes = ['Select'];
var collectionsUrl = 'http://localhost:3000/userCollections';

// Get different Collections
httpGetAsync(collectionsUrl, getDifferentCollections);

// query string: ?movieFilter=filter
var filter = getParameterByName('movieId');
var source = getParameterByName('source');
var url;

if (source === 'popular')
    url = 'https://api.themoviedb.org/3/movie/' + filter + '?api_key=8ea0aad7a07343596262232e43a21cda&language=en-US&page=1';
else
    url = 'http://localhost:3000/userCollections/' + filter;

console.log(url);

// GET the Movies
httpGetAsync(url, processResponse);

// function to make the HTTP GET call
function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, true); // true for asynchronous 
    xmlHttp.send(null);
}

function getDifferentCollections(responseText) {
    var allMoviesFromCollections = JSON.parse(responseText);
    var movieGenre;
    if (allMoviesFromCollections.length > 0) {
        for (var i = 0; i <= allMoviesFromCollections.length; i++) {
            var localMovie = allMoviesFromCollections[i];
            if (localMovie) {
                movieGenre = localMovie.genre;
                if (collectionTypes.indexOf(movieGenre) === -1) {
                    collectionTypes.push(movieGenre);
                }
            }
        }
    }
}

var movie;
var userCollectionMovies;

// process the Response
function processResponse(responseText) {
    movie = JSON.parse(responseText);
    console.log(movie);

    var imageDiv = document.getElementById('imageDiv');
    var imageTag = document.createElement('img');
    imageTag.src = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + movie.poster_path;
    imageTag.alt = movie.title;

    imageDiv.appendChild(imageTag);

    var descriptionDiv = document.getElementById('descriptionDiv');
    var h3 = document.createElement('h3');
    h3.textContent = movie.title;
    var voterAvgTag = document.createElement('h5');
    voterAvgTag.textContent = 'user score: ' + movie.vote_average.toString().replace('.', '') + '%';
    var h5 = document.createElement('h5');
    h5.textContent = 'Overview';

    if (movie.genre) {
        var genreTag = document.createElement('h5');
        genreTag.textContent = 'Collection: ' + movie.genre;
        var spanTagForChangeCollection = document.createElement('span');
        spanTagForChangeCollection.textContent = 'Change Collection to: ';
        var selectForCollections = document.createElement('select');

        //Create and append the options
        for (var i = 0; i < collectionTypes.length; i++) {
            var option = document.createElement("option");
            option.value = collectionTypes[i];
            option.text = collectionTypes[i];
            selectForCollections.appendChild(option);
        }

        selectForCollections.addEventListener('change', updateCollection);
    }

    var descriptionTag = document.createElement('p');
    descriptionTag.textContent = movie.overview;

    descriptionDiv.appendChild(h3);
    descriptionDiv.appendChild(voterAvgTag);
    if (movie.genre) {
        descriptionDiv.appendChild(genreTag);
        descriptionDiv.appendChild(spanTagForChangeCollection);
        descriptionDiv.appendChild(selectForCollections);
    }
    descriptionDiv.appendChild(h5);
    descriptionDiv.appendChild(descriptionTag);
}

function updateCollection(e) {

    // Get the User Collection Movies
    var urlForUserCollectionsUpdate = "http://localhost:3000/userCollections/" + movie.id;
    var selectedCollection = e.target.value;
    movie.genre = selectedCollection;

    var json = JSON.stringify(movie);

    var xhr = new XMLHttpRequest();
    xhr.open("PUT", urlForUserCollectionsUpdate, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = function () {
        var updatedMovie = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            console.table(updatedMovie);
        } else {
            console.error(updatedMovie);
        }
    }
    xhr.send(json);
}