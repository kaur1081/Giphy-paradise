$(document).ready(function(){
    populateButtons(searchChanell,'searchButton',"#buttonArea");

});
var searchChanell = ['PBS kids','espn','cartoon-Network','History'];

function populateButtons(searchChanell,classToAdd,areaToAddTo){

    $(areaToAddTo).empty();
    for(var i=0;i<searchChanell.length;i++){
        var a = $('<button>');
        a.addClass(classToAdd);
        a.attr('data-type',searchChanell[i]);
        a.text(searchChanell[i]);
        $(areaToAddTo).append(a);
    }

}


$(document).on('click','.searchButton',function(){
   var type = $(this).data('type');
 
    var queryURL ="https://api.giphy.com/v1/gifs/search?q=" +type+"&api_key=5kdXTs8Kg9VipXKtT5cp770orDHmJ0we&limit=15";
    $.ajax({
    url: queryURL,
    method: "GET"
    })
    .done(function(response){
    for(var i=0;i<response.data.length;i++){
        var searchDiv = $('<div class="search-item">');
        var rating = response.data[i].rating;
        var p = $('<p>').text('Rating:'+rating);
        var animated = response.data[i].images.fixed_height.url;
        var still = response.data[i].images.fixed_height_still.url;
        var image=$('<img>');
        image.attr('src',still);
        image.attr('data-still',still);
        image.attr('data-animated',animated);
        image.attr('data-state','still');
        image.addClass('searchImage');
        searchDiv.append(p);
        searchDiv.append(image);
        $('#searches').append(searchDiv);
    }
})
})
$(document).on('click','.searchImage',function(){
    var state = $(this).attr('data-state');
    if(state == 'still'){
        $(this).attr('src',$(this).data('animated'));
        $(this).attr('data-state','animated');
    } else{
        $(this).attr('src',$(this).data('still'));
        $(this).attr('data-state','still');
    }
})
$('#addSearch').on('click',function(){
    var newSearch =$('input').eq(0).val();
    searchChanell.push(newSearch);
    populateButtons(searchChanell,'searchButton',"#buttonArea");
    return false;
})