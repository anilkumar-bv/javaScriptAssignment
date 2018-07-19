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
var collection = getParameterByName('collection');
var span = document.getElementById('searchFilterText');
if (collection)
    span.innerHTML = '<em>' + collection + '</em>';

var urlForUserCollections = "http://localhost:3000/userCollections";
console.log(urlForUserCollections);

// GET the Movies
httpGetAsync(urlForUserCollections, processResponse);

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
    if (response.length > 0) {
        var movieCounter = 0;
        var group1Tag = document.getElementById('group1');
        var group2Tag = document.getElementById('group2');
        var group3Tag = document.getElementById('group3');
        var group4Tag = document.getElementById('group4');

        for (var i = 0; i <= response.length; i++) {
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
            var movie = response[i];
            if (movie && movie.genre.toLowerCase() === collection.toLowerCase()) {
                ++movieCounter;
                var cardDivTag = document.createElement('div');
                cardDivTag.className = "card";
                cardDivTag.id = movie.id;
                var cardBodyDivTag = document.createElement('div');
                cardBodyDivTag.className = "card-body";
                var h5 = document.createElement('h5');
                h5.className = "card-title";
                h5.textContent = movie.title;
                var imgTag = document.createElement('img');
                imgTag.src = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + movie.poster_path;
                imgTag.alt = movie.title;
                var anchorTag = document.createElement('a');
                anchorTag.href = '../src/movie.html?movieId=' + movie.id + '&source=userCollection';
                anchorTag.appendChild(imgTag);
                var pTag = document.createElement('p');
                if (movie.overview.length > 100)
                    pTag.textContent = movie.overview.substring(0, 100) + '...';
                else
                    pTag.textContent = movie.overview;

                var deleteButton = document.createElement('button');
                deleteButton.className = 'btn btn-danger btn-sm float-center delete';
                deleteButton.value = movie.id;
                deleteButton.textContent = 'Delete';
                deleteButton.addEventListener('click', removeMovie);

                cardBodyDivTag.appendChild(h5);
                cardBodyDivTag.appendChild(anchorTag);
                cardBodyDivTag.appendChild(pTag);
                cardBodyDivTag.appendChild(deleteButton);
                cardDivTag.appendChild(cardBodyDivTag);

                if (movieCounter <= 3)
                    group1Tag.appendChild(cardDivTag);
                else if (movieCounter > 3 && movieCounter <= 6)
                    group2Tag.appendChild(cardDivTag);
                else if (movieCounter > 6 && movieCounter <= 9)
                    group3Tag.appendChild(cardDivTag);
                else if (movieCounter > 10 && movieCounter <= 12)
                    group4Tag.appendChild(cardDivTag);
            }
        }
    }
}

function removeMovie(e) {
    if (e.target.classList.contains('delete')) {
        if (confirm('Are You Sure?')) {
            var movieId = e.target.value;
            alert('movieId: ' + movieId);
            var divCardToDelete = document.getElementById(movieId);
            var divCardParent = divCardToDelete.parentElement;
            divCardParent.removeChild(divCardToDelete);
            removeFromStorage(movieId);
        }
    }
}

// function to Delete the movie from the Storage
function removeFromStorage(movieId) {
    var url = "http://localhost:3000/userCollections/" + movieId;
    var xhr = new XMLHttpRequest();
    xhr.open("DELETE", url, true);
    xhr.onload = function () {
        var users = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "200") {
            console.table(users);
        } else {
            console.error(users);
        }
    }
    xhr.send(null);
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