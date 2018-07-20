// Adding click event listen listener to all buttons
$('button').on('click', function() {
  $('#gifs-appear-here').html('');

  // Grabbing and storing the data-videogame property value from the button
  var videogame = $(this).attr('data-videogame');
  console.log('var videogame set');
  // Constructing a queryURL using the videogame name
  var queryURL =
    'https://api.giphy.com/v1/gifs/search?q=' +
    videogame +
    '&api_key=k57hF1C8XQZEgLOoyBIn2TgzKU72Gdzr&limit=10';

  // Performing an AJAX request with the queryURL
  $.ajax({
    url: queryURL,
    method: 'GET'
  })
    // After data comes back from the request
    .then(function(response) {
      console.log(queryURL);

      console.log(response);
      // storing the data from the AJAX request in the results variable
      var results = response.data;

      // Looping through each result item
      for (var i = 0; i < results.length; i++) {
        // Creating and storing a div tag
        var videogameDiv = $('<div>');

        // Creating a paragraph tag with the result item's rating
        var p = $('<p>').text('Rating: ' + results[i].rating);

        // Creating and storing an image tag
        var videogameImage = $('<img>');
        // Setting the src attribute of the image to a property pulled off the result item
        videogameImage.attr('src', results[i].images.fixed_height_still.url);

        // Appending the paragraph and image tag to the videogameDiv
        videogameDiv.append(p);
        videogameDiv.append(videogameImage);

        // Prependng the videogameDiv to the HTML page in the "#gifs-appear-here" div
        $('#gifs-appear-here').prepend(videogameDiv);
      }
    });
});
$('#gifs-appear-here').on('click', function() {
  console.log('clicked gif');
  var queryURL =
    'https://api.giphy.com/v1/gifs/search?q=' +
    videogame +
    '&api_key=k57hF1C8XQZEgLOoyBIn2TgzKU72Gdzr&limit=10';
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response) {
    var results = response.data;
    var still = results.images.fixed_height_still.url;
    var animate = results.images.fixed_heigh.url;
    var state = $(this).attr('src');
    console.log('State of GIF: ' + state);
    if (state == still) {
      this.attr('src', results.images.fixed_height.url);
    } else if (state == animate) {
      this.attr('src', results.images.fixed_height_still.url);
    }
  });
});
