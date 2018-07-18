var mostPopularList = document.getElementById('mostPopularList');
var searchButton = document.getElementById('search');

// Filter event
searchButton.addEventListener('click', filterItems);

var url = "https://api.themoviedb.org/3/movie/popular?api_key=8ea0aad7a07343596262232e43a21cda&language=en-US&page=1"
console.log(url);

// function to make the HTTP GET call
function httpGetAsync(theUrl, callback) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
            callback(xmlHttp.responseText);
    }
    xmlHttp.open("GET", theUrl, false); // true for asynchronous 
    xmlHttp.send(null);
}

// process the Response
function processResponse(responseText) {
    var response = JSON.parse(responseText);
    console.log(response);

    //console.log(response.results[0]);
    for (var i = 0; i < 1; i++) {
        var movie = response.results[i];
        var movieDiv1 = document.getElementById('popularCardGroup1');
        var movieDiv2 = document.getElementById('popularCardGroup2');

        console.log(movieDiv1);
     
        var cardDiv = document.createElement('div');
        cardDiv.className = 'card';

        var cardBodyDiv = document.createElement('div');
        cardBodyDiv.className = 'card-body';
        //cardBodyDiv.id = 'movie' + i;

        var h5 = document.createElement('h2');
        var img = document.createElement('img');
        var voteAverage = document.createElement('p');
        var description = document.createElement('p');
        var anchorTag = document.createElement('a');
        //anchorTag.href = 'https://api.themoviedb.org/3/movie/' + movie.id +'?api_key=8ea0aad7a07343596262232e43a21cda&language=en-US';
        anchorTag.href = '../src/movie.html?movieId=' + movie.id;
        anchorTag.textContent = movie.title;
        

        h5.textContent = movie.title;
        img.src = movie.poster_path;
        img.alt = movie.title;
        voteAverage.textContent = 'Vote Average: ' + movie.vote_average;
        description = movie.overview;

        cardBodyDiv.appendChild(h5);
        cardBodyDiv.appendChild(img);
        cardBodyDiv.appendChild(voteAverage);
        cardBodyDiv.appendChild(anchorTag);
        //cardBodyDiv.appendChild(description);

        cardDiv.appendChild(cardBodyDiv);

        //if (i <= 5)
            movieDiv1.appendChild(cardDiv);
        //else
          //  movieDiv2.appendChild(cardDiv);
    }
}

// GET the Movies
httpGetAsync(url, processResponse);

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

    // // Get list
    // //var items = itemList.getElementById('mostPopularList');

    // // Convert to an array
    // Array.from(mostPopularList).forEach(function (item) {
    //     console.log(item);
    //     var itemName = item.firstChild.textContent;
    //     if (itemName.toLowerCase().indexOf(text) != -1) {
    //         item.style.display = 'block';
    //     } else {
    //         item.style.display = 'none';
    //     }
    // });
}