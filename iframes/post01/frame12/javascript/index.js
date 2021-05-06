let numberPosts = 5; // Post’s number per page.
let page = 0; // Actual page on the pagination.
let posts_data_; // Posts list.

// A function that ran after the HTML page is loaded.
// All posts display will happen inside this function.
window.addEventListener("load", function () {
    
    // Fetching data from the server using Fetch API.
    // This function takes at least one parameter:
    //      URL: The URL to the file you want to fetch.
    // For more information see: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    fetch('/posts-json/posts-json.json') // Fetching the posts-json.json file. This return a promise.
    .then(function(response){ // When the previous promise is fulfilled, run this block.
        return response.json(); // Return the response in JSON format. This return a promise.
    })
    .then(function(json){ // When the previous promise is fulfilled, run this block.
        posts_data_ = json['posts']; // Get posts data.
        updatePosts(json['posts']); // Call updatePosts and pass the posts data as a parameter.
    })
    .catch(function(error){ // Catch any errors that occur.
        console.log(error); // Log the error on the browser console.
    });
    
});
    