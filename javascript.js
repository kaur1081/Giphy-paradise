$(document).ready(function () {
    populateButtons(searchChannel, 'searchButton', "#buttonArea");

});
var searchChannel = ['PBS kids', 'Disney', 'cartoon-Network', 'nick jr.'];

function populateButtons(searchChannel, classToAdd, areaToAddTo) {
    $(areaToAddTo).empty();
    for (var i = 0; i < searchChannel.length; i++) {
        var a = $('<button>');
        a.addClass(classToAdd);
        a.attr('data-type', searchChannel[i]);
        a.text(searchChannel[i]);
        $(areaToAddTo).append(a);
    }

}


$(document).on('click', '.searchButton', function() {
    var type = $(this).data('type');

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=5kdXTs8Kg9VipXKtT5cp770orDHmJ0we&limit=10";
    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(response) {
            $('#searches').empty();
            for (var i = 0; i < response.data.length; i++) {
                var searchDiv = $('<div class="search-item col-md-6 giphyImage">');
                var rating = response.data[i].rating.toUpperCase();
                var p = $('<p>').text('Rating:' + rating);
                var animated = response.data[i].images.fixed_height.url;
                var still = response.data[i].images.fixed_height_still.url;
                var image = $('<img>');
                image.attr('src', still);
                image.attr('data-still', still);
                image.attr('data-animated', animated);
                image.attr('data-state', 'still');
                image.addClass('searchImage');
                searchDiv.append(p);
                searchDiv.append(image);
                $('#searches').append(searchDiv);
            }
        })
})
$(document).on('click', '.searchImage', function () {
    var state = $(this).attr('data-state');
    if (state == 'still') {
        $(this).attr('src', $(this).data('animated'));
        $(this).attr('data-state', 'animated');
    } else {
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
})
$('.submit').on('click', function () {
    event.preventDefault();
    console.log('here');
    var newSearch = $('input').eq(0).val();
    searchChannel.push(newSearch);
    populateButtons(searchChannel, 'searchButton', "#buttonArea");

    // return false;
    
})