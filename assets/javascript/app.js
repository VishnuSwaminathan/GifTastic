var games = [
  'Witcher',
  'Mario',
  'Legend of Zelda',
  'BioShock',
  'Skyrim',
  'Battlefield',
  'Mortal Kombat',
  'PUBG',
  'Fortnite',
  'GTA'
];
function renderButtons() {
  $('#buttons-place').html('');
  console.log('About to Render');

  for (var i = 0; i < games.length; i++) {
    var gameButton = $('<button>');
    gameButton.attr('data-videogame', games[i]);
    gameButton.text(games[i]);
    $('#buttons-view').append(gameButton);
    console.log('Button for: ' + games[i] + ' rendered');
  }
}

$('button').on('click', function() {
  $('#gifs-appear-here').html('');

  var videogame = $(this).attr('data-videogame');
  console.log('var videogame set');
  var queryURL =
    'https://api.giphy.com/v1/gifs/search?q=' +
    videogame +
    '&api_key=k57hF1C8XQZEgLOoyBIn2TgzKU72Gdzr&limit=10';

  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function(response) {
    console.log(queryURL);
    console.log(response);
    var results = response.data;

    for (var i = 0; i < results.length; i++) {
      var videogameDiv = $('<div>');
      var p = $('<p>').text('Rating: ' + results[i].rating);
      var videogameImage = $('<img>');
      videogameImage.attr('src', results[i].images.fixed_height_still.url);

      videogameDiv.append(p);
      videogameDiv.append(videogameImage);
      $('#gifs-appear-here').prepend(videogameDiv);
    }
    $('img').on('click', function() {
      var gifClicked = this;
      console.log('Gif Clicked: ' + gifClicked);

      var state = $(this).attr('src');
      var still = results.images.fixed_height_still.url;
      var animate = results.images.fixed_heigh.url;
      console.log('State of GIF: ' + state);

      if (state == still) {
        this.attr('src', results.images.fixed_height.url);
      } else if (state == animate) {
        this.attr('src', results.images.fixed_height_still.url);
      }
    });
  });
});

renderButtons();
