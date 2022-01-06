// Create a namespace object (MovieFinder)
const movieApp = {};

movieApp.init = () => {
    // call our getData method
    movieApp.formSubmit();
}

movieApp.key = '1a6e23d16ad2ac274c9fef47acd3b5ff';

// form submit event listener 
movieApp.formSubmit = () => {
    // get form element - to attach event listener
    const formElement = document.querySelector('form');
    formElement.addEventListener('submit', function(event){
        event.preventDefault(); 
        const userQuery = event.target[0].value;
        movieApp.getData(userQuery);
    });
}

// GetData Function
// - using apiURL, apiKey, userQuery
movieApp.getData = (userQuery) => {
    const url = new URL('https://api.themoviedb.org/3/search/movie');
    url.search = new URLSearchParams({
        api_key: movieApp.key,
        query: userQuery
    })

    fetch(url)
        .then((response) => response.json())
        .then((jsonResult) => {
            movieApp.displayData(jsonResult);
    });
}

// Create a method to generate a random movie id based on random function

movieApp.displayData = (jsonData) => {
  // display data method
  const randomIndex = Math.floor(Math.random() * jsonData.results.length);
  // get image from API endpoint
  const imgEndpoint = `http://image.tmdb.org/t/p/w185${jsonData.results[randomIndex].poster_path}`;

  // get main element from page
  const mainContainer = document.querySelector("main");
  const mainSection = document.createElement("section");
  mainSection.classList.add("mainSection");

  const imageDiv = document.createElement("div");
  const imageElement = document.createElement("img");
  imageElement.src = imgEndpoint;

  // create div to hold description
  const descripDiv = document.createElement("div");
  const header = document.createElement("h2");
  header.textContent = jsonData.results[randomIndex].title;

  mainSection.appendChild(descripDiv);
  descripDiv.appendChild(header);
  
  // append results to page
  mainContainer.appendChild(mainSection);
  mainSection.appendChild(imageDiv);
  imageDiv.appendChild(imageElement);
}

// error handling tasks
// When the API call is successful, display the result by appending the data to the results div
// If the API call fails, display an error message

// Call init
movieApp.init();
    

    


