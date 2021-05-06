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

    // update Posts section
    // This function updates the posts in the posts section.
    // This function takes one parameter:
    //      posts_data: The posts' data
    function updatePosts(posts_data) {
        let posts = document.querySelector('.posts'); //Get div element with a class “.posts”, where we going to display the posts.
        posts.innerHTML = ""; // Clear all HTML elements inside this element.

        if(posts_data.length === 0){ // Check’s if the posts_data array is empty.
            let nothing = document.createElement('p'); // Create a paragraph.
            nothing.textContent = "Nothing found!"; // Set the paragraph’s text.
            posts.appendChild(nothing); // Appended the paragraph to the posts’ div.
            return // Return, so the updatePosts function execution is interrupted.
        }

        let start = page * numberPosts; // Pagination’s start index.
        let end = start + numberPosts; // Pagination’s end index.
        let slice_posts = posts_data.slice(start, end); // The posts’ slice to display on the current page.
        for(let i=0; i<slice_posts.length; i++) { // Iterate on the pagination slice over the posts.
            let post = document.createElement('div'); // Create a div element.
            post.classList.add('post'); // Add a class to it.

            let h3 = document.createElement('h3'); // Create a h3 element.
            h3.textContent = slice_posts[i]['name']; // Set its text as the post name.
            let a = document.createElement('a'); // Create an a element.
            a.href = slice_posts[i]['post_url']; // Set its ural as the post url.
            a.appendChild(h3); // Append the h3 to the a element.
            post.appendChild(a); // Append the a element to the post div.

            let date = document.createElement('p'); // Create a p element.
            date.textContent = "Date: "+ slice_posts[i]['date']; // Set its text content to the post's date.
            post.appendChild(date); // Append the date(paragraph) to the post div.

            let p = document.createElement('p'); // Create a paragraph element.
            p.textContent = slice_posts[i]['text']; // Set p text as the post description
            post.appendChild(p); // Append the p(paragrph) to the post div.

            let tags = document.createElement('p'); // Create a paragraph element.
            tags.classList.add("tags"); // Add a class "tags" to the tags(paragrapt) element.
            for(let j=0; j<slice_posts[i]['tags'].length; j++){ // Iterate over the tags list.
                let span = document.createElement('span'); // Create a span element.
                span.textContent = slice_posts[i]['tags'][j]; // Set span text.
                tags.appendChild(span); // Append the span element to the tags(paragraph).
            }
            post.appendChild(tags); // Append the tags(paragraph) to the post div.

            posts.appendChild(post); // Append the post div to the posts div.
        }
    }
    
});
    