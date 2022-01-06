// Create a namespace object (MovieFinder)
const movieApp = {};

movieApp.init = () => {
    // call our getData method
    movieApp.getData();
}

movieApp.key = '1a6e23d16ad2ac274c9fef47acd3b5ff';
// Initialize preset data in the dedicated properties
// - apiURL
// - apiKey
// - userQuery

movieApp.getData = () => {
    const url = new URL('https://api.themoviedb.org/3/search/movie');
    url.search = new URLSearchParams({
        api_key: movieApp.key,
        query: 'Comedy'
    })

    fetch(url)
        .then((response) => response.json())
        .then((jsonResult) => {
            movieApp.displayData(jsonResult);
    });
}

// Methods > Search function
// Create a method to update the variable (userQuery) based on user keyword input
// Create a method to generate a random movie id based on random function

movieApp.displayData = (jsonData) => {
    console.log(jsonData);
    // display data method
    const randomIndex = Math.floor(Math.random() * jsonData.results.length);
    // console.log(randomIndex);
    // console.log(jsonData.results[randomIndex].title);
    // console.log(jsonData.results[randomIndex].overview);

    // get main element from page 
    const mainContainer = document.querySelector('main');
    const mainSection = document.createElement('section');    
    mainSection.classList.add('mainSection');
    
    const imageDiv = document.createElement('div');
    const imageElement = document.createElement('img');
    imageElement.src = jsonData.results[randomIndex].poster_path;
    // create div to hold description 

    // append results to page
    mainSection.appendChild(imageDiv);
    imageDiv.appendChild(imageElement);
}

// Use API endpoint/search/movie, apply the query parameter for closest match
// When the API call is successful, display the result by appending the data to the results div
// If the API call fails, display an error message

// Call init
movieApp.init();
    

    


