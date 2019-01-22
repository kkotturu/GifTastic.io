// Click the presented buttons to see related gifs or
// Enter a term into the search box an click Submit.
// The searched term is added as a button above and clicking the new button will present related gifs below.

$(document).ready(function () {

    var topics = ["Eiffel Tower", "Taj Mahal", "Colosseum"];

    //Get the topics from local storage
    let current = JSON.parse(localStorage.getItem("topics"))

    //If it isn't there, set it to the original array
    if (!Array.isArray(current)) {

        localStorage.setItem("topics", JSON.stringify(topics))
    }

    function displayImg() {

        $("#display-images").empty();
        var input = $(this).attr("data-name");
        var limit = 10;
        var apiKey = "&api_key=S1xmwXZkxF0eh3ARd1V5QN5C5621EYj4";
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + input + "&limit=" + limit + apiKey;

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {

                for (var i = 0; i < limit; i++) {

                    // create <div>, assign class to hold images

                    var displayDiv = $("<div>");
                    displayDiv.addClass("holder");

                    var image = $("<img>");
                    var imgOrig = response.data[i].images.original.url;
                    var imgStatus = response.data[i].images.original_still.url;

                    image.attr("src", imgStatus).attr("data-still", imgStatus);
                    image.attr("data-animate", imgOrig).attr("data-state", "still");
                    image.attr("class", "gif");
                    displayDiv.append(image);

                    var rating = response.data[i].rating;
                    console.log(response);

                    var pRating = $("<p>").text("Rating: " + rating);
                    displayDiv.append(pRating)

                    $("#display-images").append(displayDiv);
                }
            });
    }

    function renderButtons() {

        $("#display-buttons").empty();

            let buttons = JSON.parse(localStorage.getItem("topics"))

            buttons.forEach(choice => {

            var newButton = $("<button>");
            newButton.attr("class", "btn btn-default");
            newButton.attr("id", "input");
            newButton.attr("data-name", choice);
            newButton.text(choice);
            $("#display-buttons").append(newButton);
        })
    }

    function imageChangeState() {

        var state = $(this).attr("data-state");
        var animateImage = $(this).attr("data-animate");
        var stillImage = $(this).attr("data-still");

        if (state == "still") {
            $(this).attr("src", animateImage);
            $(this).attr("data-state", "animate");
        }
        else if (state == "animate") {
            $(this).attr("src", stillImage);
            $(this).attr("data-state", "still");
        }
    }

    $("#submit").on("click", function () {

        var input = $("#user-input").val().trim();
        form.reset();
        topics.push(input);

        let top = JSON.parse(localStorage.getItem("topics"))
        top.push(input)
        //Re-set the topics of local storage to the new array
        localStorage.setItem("topics", JSON.stringify(top))
        renderButtons();
        return false;
    })

    renderButtons();

    $(document).on("click", "#input", displayImg);
    $(document).on("click", ".gif", imageChangeState);
});