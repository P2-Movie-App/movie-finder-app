// Create an app object (MovieFinder)

// Initialize preset data in the dedicated properties
// - apiURL
// - apiKey
// - userQuery

// Methods > Search function
// Create a method to update the variable (userQuery) based on user keyword input
// Create a method to generate a random movie id based on random function

// API Call
// Create a method (getMovies) to make API calls, which uses the user input as a parameter (userQuery)
// Use API endpoint/search/movie, apply the query parameter for closest match
// When the API call is successful, display the result by appending the date to the results div
// If the API call fails, display an error message

// Create an init method

// Call init



// <script>
//         // create a url variable using the new URL syntax
//     const url = new URL('https://api.themoviedb.org/3/search/movie');

//     url.search = new URLSearchParams({
//         api_key: '1a6e23d16ad2ac274c9fef47acd3b5ff',
//     query: 'Comedy'
//         })

//     // access api test 
//     fetch(url)
//             .then((response) => response.json())
//             .then((jsonResult) => {
//         console.log(jsonResult);
//             });
// </script>