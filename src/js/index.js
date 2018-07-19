var mostPopularList = document.getElementById('mostPopularList');
var searchButton = document.getElementById('search');

// Filter event
searchButton.addEventListener('click', filterItems);

// Get the Popular Movies
var urlForPopular = "https://api.themoviedb.org/3/movie/popular?api_key=8ea0aad7a07343596262232e43a21cda&language=en-US&page=1";
var urlForUserCollections = "http://localhost:3000/userCollections";

console.log(urlForPopular);

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

function clearChildNodes(div) {
    while (div.firstChild) {
        div.removeChild(div.firstChild);
    }
}

// process the Response
function processResponseForPopular(responseText) {
    var response = JSON.parse(responseText);
    console.log(response);

    //console.log(response.results[0]);
    if (response.results.length > 0) {
        var movieDiv1 = document.getElementById('popularCardGroup1');
        var movieDiv2 = document.getElementById('popularCardGroup2');
        var movieDiv3 = document.getElementById('popularCardGroup3');
        var movieDiv4 = document.getElementById('popularCardGroup4');


        // Clear the contents, if already loaded
        clearChildNodes(movieDiv1);
        clearChildNodes(movieDiv2);
        clearChildNodes(movieDiv3);
        clearChildNodes(movieDiv4);

        console.log(movieDiv1);
        console.log(movieDiv2);
        for (var i = 0; i < 12; i++) {
            var movie = response.results[i];
            /*
            <div class="card">
                <div class="card-body">
                    <h2>Jurassic World: Fallen Kingdom</h2>
                    <img src="/c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg" alt="Jurassic World: Fallen Kingdom">
                    <p>Vote Average: 6.6</p>
                    <a href="../src/movie.html?movieId=351286">Jurassic World: Fallen Kingdom</a>
                </div>
            </div>
            */
            var cardDiv = document.createElement('div');
            cardDiv.className = 'card';

            var cardBodyDiv = document.createElement('div');
            cardBodyDiv.className = 'card-body';
            //cardBodyDiv.id = 'movie' + i;

            var h3 = document.createElement('h3');
            var img = document.createElement('img');
            var voteAverage = document.createElement('p');
            var descriptionTag = document.createElement('p');
            var anchorTag = document.createElement('a');
            //anchorTag.href = 'https://api.themoviedb.org/3/movie/' + movie.id +'?api_key=8ea0aad7a07343596262232e43a21cda&language=en-US';
            anchorTag.href = '../src/movie.html?movieId=' + movie.id;
            //anchorTag.textContent = movie.title;

            h3.textContent = movie.title;
            img.src = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + movie.poster_path;
            img.alt = movie.title;
            voteAverage.textContent = 'Vote Average: ' + movie.vote_average;
            descriptionTag = movie.overview;

            anchorTag.appendChild(img);
            cardBodyDiv.appendChild(h3);
            cardBodyDiv.appendChild(anchorTag);
            cardBodyDiv.appendChild(voteAverage);
            //cardBodyDiv.appendChild(descriptionTag);

            cardDiv.appendChild(cardBodyDiv);

            if (i <= 2)
                movieDiv1.appendChild(cardDiv);
            else if (i > 2 && i <= 5)
                movieDiv2.appendChild(cardDiv);
            else if (i > 5 && i <= 8)
                movieDiv3.appendChild(cardDiv);
            else if (i > 8 && i <= 11)
                movieDiv4.appendChild(cardDiv);
        }
    }
}

function processResponseForUserCollections(responseText) {
    var response = JSON.parse(responseText);
    console.log(response);
    var actionCount = 0;
    var thrillerCount = 0;
    var comedyCount = 0;
    var scienceFictionCount = 0;
    var horrorCount = 0;

    //console.log(response.results[0]);
    if (response.length > 0) {
        var actionDiv = document.getElementById('userCardAction');
        var thrillerDiv = document.getElementById('userCardThriller');
        var comedyDiv = document.getElementById('userCardComedy');
        var scienceFictionDiv = document.getElementById('userCardScienceFiction');
        var horrorDiv = document.getElementById('userCardHorror');


        // Clear the contents, if already loaded
        clearChildNodes(actionDiv);
        clearChildNodes(thrillerDiv);
        clearChildNodes(comedyDiv);
        clearChildNodes(scienceFictionDiv);
        clearChildNodes(horrorDiv);

        console.log(actionDiv);
        for (var i = 0; i < response.length; i++) {
            var movie = response[i];
            /*
            <div class="card">
                <div class="card-body">
                    <h2>Jurassic World: Fallen Kingdom</h2>
                    <img src="/c9XxwwhPHdaImA2f1WEfEsbhaFB.jpg" alt="Jurassic World: Fallen Kingdom">
                    <p>Vote Average: 6.6</p>
                    <a href="../src/movie.html?movieId=351286">Jurassic World: Fallen Kingdom</a>
                </div>
            </div>
            */
            var cardDiv = document.createElement('div');
            cardDiv.className = 'card';

            var cardBodyDiv = document.createElement('div');
            cardBodyDiv.className = 'card-body';
            //cardBodyDiv.id = 'movie' + i;

            var h3 = document.createElement('h3');
            var img = document.createElement('img');
            var voteAverage = document.createElement('p');
            var descriptionTag = document.createElement('p');
            var anchorTag = document.createElement('a');
            //anchorTag.href = 'https://api.themoviedb.org/3/movie/' + movie.id +'?api_key=8ea0aad7a07343596262232e43a21cda&language=en-US';
            anchorTag.href = '../src/movie.html?movieId=' + movie.id;
            //anchorTag.textContent = movie.title;

            h3.textContent = movie.title;
            img.src = 'https://image.tmdb.org/t/p/w185_and_h278_bestv2' + movie.poster_path;
            img.alt = movie.title;
            voteAverage.textContent = 'Vote Average: ' + movie.vote_average;
            descriptionTag = movie.overview;

            anchorTag.appendChild(img);
            cardBodyDiv.appendChild(h3);
            cardBodyDiv.appendChild(anchorTag);
            cardBodyDiv.appendChild(voteAverage);
            //cardBodyDiv.appendChild(descriptionTag);

            cardDiv.appendChild(cardBodyDiv);

            if (movie.genre === 'Action' && actionCount < 4) {
                ++actionCount;
                actionDiv.appendChild(cardDiv);
            }
            else if (movie.genre === 'Thriller' && thrillerCount < 4) {
                ++thrillerCount;
                thrillerDiv.appendChild(cardDiv);
            }
            else if (movie.genre === 'Comedy' && comedyCount < 4) {
                ++comedyCount;
                comedyDiv.appendChild(cardDiv);
            }
            else if (movie.genre === 'Science Fiction' && scienceFictionCount < 4) {
                ++scienceFictionCount;
                scienceFictionDiv.appendChild(cardDiv);
            }
            else if (movie.genre === 'Horror' && horrorCount < 4) {
                ++horrorCount;
                horrorDiv.appendChild(cardDiv);
            }
        }
    }
}

// GET the Movies
httpGetAsync(urlForPopular, processResponseForPopular);
httpGetAsync(urlForUserCollections, processResponseForUserCollections);

function filterItems(e) {
    let filter = document.getElementById('filterMovies');

    // convert text to lowercase
    let text = filter.value.toLowerCase();

    if (text === '') {
        alert('please provide search value');
        return false;
    }

    // Redirect to the Search Screen to fetch Results
    window.location.href = '../src/moviesCollection.html?movieFilter=' + text;
}