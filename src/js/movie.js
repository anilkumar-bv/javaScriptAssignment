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

// query string: ?movieFilter=filter
var filter = getParameterByName('movieId');
var url = 'https://api.themoviedb.org/3/movie/' + filter +'?api_key=8ea0aad7a07343596262232e43a21cda&language=en-US&page=1';
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

// process the Response
function processResponse(responseText) {
    var movie = JSON.parse(responseText);
    console.log(movie);
    
    var imageDiv = document.getElementById('imageDiv');
    var imageTag = document.createElement('img');
    imageTag.src = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2' + movie.poster_path;
    imageTag.alt = movie.title;

    imageDiv.appendChild(imageTag);

    var descriptionDiv = document.getElementById('descriptionDiv');
    var h3 = document.createElement('h3');
    h3.textContent = movie.title;
    var h4 = document.createElement('h5');
    h4.textContent = 'Overview';
    var descriptionTag = document.createElement('p');
    descriptionTag.textContent = movie.overview;
    var voterAvgTag = document.createElement('h5');
    voterAvgTag.textContent = 'user score: ' + movie.vote_average.toString().replace('.', '') + '%';

    descriptionDiv.appendChild(h3);
    descriptionDiv.appendChild(voterAvgTag);
    descriptionDiv.appendChild(h4);
    descriptionDiv.appendChild(descriptionTag);
}