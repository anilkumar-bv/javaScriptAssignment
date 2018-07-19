
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

var searchButton = document.getElementById('search');

// Filter event
searchButton.addEventListener('click', filterItems);

// query string: ?movieFilter=filter
var filter = getParameterByName('movieFilter');
var span = document.getElementById('searchFilterText');
if (filter)
    span.innerHTML = '<em>' + filter + '</em>';
var url = "https://api.themoviedb.org/3/search/movie?api_key=8ea0aad7a07343596262232e43a21cda&language=en-US&query=" + filter + "&page=1&include_adult=false";
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
    var response = JSON.parse(responseText);
    console.log(response);
    if (response.total_results > 0) {
        var group1Tag = document.getElementById('group1');
        var group2Tag = document.getElementById('group2');
        var group3Tag = document.getElementById('group3');
        var group4Tag = document.getElementById('group4');

        for (var i = 0; i <= 12; i++) {
            /*
            <div class="card">
                <div class="card-body" id="movie1">
                    <h5 class="card-title">Most Popular</h5>
                    <a href="">
                        <img src="" alt="" />
                    </a>
                    <p>Movie Description</p>
                </div>
            </div>
            */
            var movie = response.results[i];
            var cardDivTag = document.createElement('div');
            cardDivTag.className = "card";
            var cardBodyDivTag = document.createElement('div');
            cardBodyDivTag.className = "card-body";
            var h5 = document.createElement('h5');
            h5.className = "card-title";
            h5.textContent = movie.title;
            var imgTag = document.createElement('img');
            imgTag.src = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + movie.poster_path;
            imgTag.alt = movie.title;
            var anchorTag = document.createElement('a');
            anchorTag.href = '../src/movie.html?movieId=' + movie.id + '&source=search';
            anchorTag.appendChild(imgTag);
            var pTag = document.createElement('p');
            if (movie.overview.length > 100)
                pTag.textContent = movie.overview.substring(0, 100) + '...';
            else
                pTag.textContent = movie.overview;
            cardBodyDivTag.appendChild(h5);
            cardBodyDivTag.appendChild(anchorTag);
            cardBodyDivTag.appendChild(pTag);
            cardDivTag.appendChild(cardBodyDivTag);

            if (i <= 2)
                group1Tag.appendChild(cardDivTag);
            else if (i > 2 && i <= 5)
                group2Tag.appendChild(cardDivTag);
            else if (i > 5 && i <= 8)
                group3Tag.appendChild(cardDivTag);
            else if (i > 9 && i <= 12)
                group4Tag.appendChild(cardDivTag);
        }
    }
}

function filterItems(e) {
    let filter = document.getElementById('filter');

    // convert text to lowercase
    let text = filter.value.toLowerCase();

    if (text === '') {
        alert('please provide search value');
        return false;
    }

    // Redirect to the Search Screen to fetch Results
    window.location.href = '../src/moviesCollection.html?movieFilter=' + text;
}