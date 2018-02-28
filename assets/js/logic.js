var annimalArray = [];
var animalArray = ["cat", "dog", "bird", "cow", "monkey", "rat", "turtle", "fish", "lion", "elephant", "horse"];

function originalButtonLoad() {

    // Empties out the button div so only the updated array is displayed
    // otherwise the original buttons will keep displaying over and over along with new buttons
    $("#buttonDiv").empty();

    for (var i=0; i < animalArray.length; i++) {

        var originalButton = $("<button>");
        originalButton.attr("data-animal", animalArray[i]);
        originalButton.addClass("animal");
        originalButton.text(animalArray[i]);
        originalButton.prependTo("#buttonDiv");
    };
};

originalButtonLoad();

$("#add-animal").on("click",function(event) {
    
    event.preventDefault();

    var animal = $("#animal").val().trim();
    console.log(animal);

    animalArray.push(animal);
    console.log(animalArray);

    $("#animal").val("");
    
    originalButtonLoad();

});

$(document.body).on("click", "button", function() {
    
    var animal = $(this).attr("data-animal");

    // Constructing a URL to search Giphy for the name of the animal who said the quote
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animal + "&api_key=dc6zaTOxFJmzC&limit=10";

    // Performing our AJAX GET request
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    // After the data comes back from the API
    .then(function(response) {
        // Storing an array of results in the results variable
        var results = response.data;

        // Looping over every result item
        for (var i = 0; i < results.length; i++) {

        // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
                // Creating a div with the class "item"
                var gifDiv = $("<div class='item'>");

                // Storing the result item's rating
                var rating = results[i].rating;

                // Creating a paragraph tag with the result item's rating
                var p = $("<p>").text("Rating: " + rating);

                // Creating an image tag
                var animalImage = $("<img>");

                // Giving the image tag an src attribute of a proprty pulled off the result item
                animalImage.attr("src", results[i].images.fixed_height.url);

                // Giving the image a data-still and data-animate url
                // This will be used later for pausing the gifs
                animalImage.attr("data-still",results[i].images.fixed_height_still.url);
                animalImage.attr("data-animate",results[i].images.fixed_height.url);

                // data-state is equal to animate because the orignal source for the img is the animate URL
                animalImage.attr("data-state", "animate");
                animalImage.addClass("gif");

                // Appending the paragraph and animalImage we created to the "gifDiv" div we created
                gifDiv.append(p);
                gifDiv.append(animalImage);

                // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
                $("#gifs-appear-here").prepend(gifDiv);
            };
        };
    });
});


// Need to code for pausing and starting the gif
$(document.body).on("click", ".gif", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");

    // changing from the 'still' URL to the 'animate' URL and vice versa
    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }   

});