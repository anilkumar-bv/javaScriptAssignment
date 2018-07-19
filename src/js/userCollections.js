// Get the User Collection Movies
var urlForUserCollections = "http://localhost:3000/userCollections";

console.log(urlForUserCollections);

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
    var response = JSON.parse(responseText);
    console.log(response);
    var data = {};

    //console.log(response.results[0]);
    if (response.length > 0) {
        var selectList = document.getElementById('collectionsList');
        var button = document.getElementById('displayCollection');

        // Loop through all the movies to fetch unique genre
        for (var i = 0; i < response.length; i++) {
            var movie = response[i];

            //Add the first genre to the collection
            if (i == 0) {
                data[movie.genre] = movie.genre;
                continue;
            }

            for (var key in data) {
                if (!data.hasOwnProperty(movie.genre)) {
                    data[movie.genre] = movie.genre;
                }
            }
        }

        //Create and append the options
        for (var key in data) {
            if (data.hasOwnProperty(key)) {
                var option = document.createElement("option");
                option.value = key;
                option.text = data[key];
                selectList.appendChild(option);
            }
        }

        // Add click function
        button.addEventListener('click', displayMoviesOfCollection);
    }
}

function displayMoviesOfCollection() {
    var selectList = document.getElementById('collectionsList');
    var collection = selectList.options[selectList.selectedIndex].value;
    if (collection === 'Select') {
        alert('Please select a Collection');
        return false;
    }

    window.location.href = '../src/userCollection.html?collection=' + collection;
}

// GET the Movies
httpGetAsync(urlForUserCollections, getDifferentCollections);

var addCollectionButton = document.getElementById('addCollectionButton');
addCollectionButton.addEventListener('click', addCollection);

var sampleMovie = {
    "vote_count": 81,
    "id": 999999,
    "video": false,
    "vote_average": 3.3,
    "title": "Sample Movie",
    "popularity": 4.471,
    "poster_path": "/48zZhMQ7HABuHrgQL1dD4CipywF.jpg",
    "original_language": "de",
    "original_title": "Sample Title",
    "genre": "Horror",
    "backdrop_path": "/iSbEhQMcQWvJeR32AWbWmcX5aVJ.jpg",
    "adult": false,
    "overview": "Inspired by actual events, a group of 12 year old girls face a night of horror when the compulsive addiction of an online social media game turns a moment of cyber bullying into a night of insanity.",
    "release_date": "2015-11-20"
};

function addCollection() {
    var collectionInput = document.getElementById('addCollectionInput');
    var inputText = collectionInput.value;
    sampleMovie.genre = inputText;
    sampleMovie.id = getRandomInt(0,999999)
    
    var url = 'http://localhost:3000/userCollections';

    // create a Post Request
    var json = JSON.stringify(sampleMovie);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');
    xhr.onload = function () {
        var response = JSON.parse(xhr.responseText);
        if (xhr.readyState == 4 && xhr.status == "201") {
            console.table(response);
        } else {
            console.error(response);
        }
    }
    xhr.send(json);

    // Reload the page to get the updated Collections
    location.reload();
}

// Returns a random number between min (inclusive) and max (exclusive)
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}