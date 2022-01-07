// Create a namespace object (MovieFinder)
const movieApp = {};

movieApp.init = () => {
    // call our getData method
    movieApp.formSubmit();
}

// api key
movieApp.key = '1a6e23d16ad2ac274c9fef47acd3b5ff';

// form submit event listener 
movieApp.formSubmit = () => {
    // get form element - to attach event listener
    const formElement = document.querySelector('form');
    formElement.addEventListener('submit', function(event){
        event.preventDefault(); 
        const userQuery = event.target[0].value;
        movieApp.getData(userQuery);
        const input = event.target[0];
        input.value = "";
        const mainContainer = document.querySelector('main');
        mainContainer.textContent = "";
    });
}

// First API call - GetData Function 
// - using apiURL, apiKey, pass in userQuery
movieApp.getData = (userQuery) => {
    const url = new URL('https://api.themoviedb.org/3/search/movie');
    url.search = new URLSearchParams({
        api_key: movieApp.key,
        query: userQuery
    })

    fetch(url)
        .then((response) => response.json())
        .then((jsonResult) => {
            movieApp.displayResult(jsonResult);
    });
}

// Second API - to create movie trailer
movieApp.getVideo = (randMovieId) => {     
        const urlVideo = new URL(
          `https://api.themoviedb.org/3/movie/${randMovieId}/videos`
        );
        urlVideo.search = new URLSearchParams({
          api_key: movieApp.key,
          append_to_response: "videos"
        });

    fetch(urlVideo)
        .then((response) => response.json())
        .then((jsonResult) => {
            // call trailer display function
            movieApp.displayVideo(jsonResult.results[0].key);
        })
}

movieApp.randomIndex = (movieArray) => {
  // random function - to use to pick movie
  const randomIndex = Math.floor(Math.random() * movieArray.length);
  return randomIndex;
}

// Create a method to generate a random movie id based on random function
movieApp.displayResult = (jsonData) => {
  const movieArray = jsonData.results;
  const randomIndex = movieApp.randomIndex(movieArray);
  // accessing movie object on array
  const randMovieObj = jsonData.results[randomIndex];
  
  // display additional assets - from object
  // get image from image storage endpoint
  const imgEndpoint = `http://image.tmdb.org/t/p/w185${randMovieObj.poster_path}`;
  
  // get video from API endpoint using generated object id
  movieApp.getVideo(randMovieObj.id);

  // get main element from page
  const mainContainer = document.querySelector("main");
  const mainSection = document.createElement("section");
  mainSection.classList.add("main-section");

  const imageDiv = document.createElement("div");
  const imageElement = document.createElement("img");
  imageElement.src = imgEndpoint;

  // create div to hold description
  const descripDiv = document.createElement("div");
  const header = document.createElement("h2");
  header.textContent = randMovieObj.title;

  // create p for rating
  const rating = document.createElement("p");
  rating.innerHTML = `<span>Rating</span> ${randMovieObj.vote_average} <span>/10</span>`;

  // create p for description
  const paragraph = document.createElement("p");
  paragraph.textContent = randMovieObj.overview;

  mainContainer.appendChild(mainSection);
  mainSection.appendChild(imageDiv);
  imageDiv.appendChild(imageElement);
  
  // append container
  mainSection.appendChild(descripDiv);
  
  // append results to page
  descripDiv.appendChild(header);
  descripDiv.appendChild(rating);
  descripDiv.appendChild(paragraph);
}

// displayVideo function - call after video API
movieApp.displayVideo = (linkId) => {
    // create trailerSection element
    const trailerSection = document.createElement("section");
    // trailer video div
    const videoDiv = document.createElement("div");
    const videoEl = document.createElement("iframe");
    videoEl.src = `https://www.youtube.com/embed/${linkId}`;
    videoEl.width = '560';
    videoEl.height = "315";
    videoEl.style.border = "0";
console.log(videoEl);
    // append videoEl to the mainContainer
    const mainContainer = document.querySelector("main");
    mainContainer.appendChild(trailerSection);
    trailerSection.appendChild(videoDiv);
    videoDiv.appendChild(videoEl); 
}

// error handling tasks
// When the API call is successful, display the result by appending the data to the results div
// If the API call fails, display an error message

// Call init
movieApp.init();
    

