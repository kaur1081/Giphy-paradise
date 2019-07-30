$(document).ready(function(){
    populateButtons(searchArray,'searchButton',"#buttonArea");

});
var searchArray = ['PBS kids','espn','cartoon-Network','History'];

function populateButtons(searchArray,classToAdd,areaToAddTo){

    $(areaToAddTo).empty();
    for(var i=0;i<searchArray.length;i++){
        var a = $('<button>');
        a.addClass(classToAdd);
        a.attr('data-type',searchArray[i]);
        a.text(searchArray[i]);
        $(areaToAddTo).append(a);
    }

}


$('.searchButton').on('click', function(){
    console.log("i have been clicked");
//     var type = $(this).data('type');
// console.log(type);
// var queryURL ="https://api.giphy.com/v1gifs/search?q=" +type +"&api_key=5kdXTs8Kg9VipXKtT5cp770orDHmJ0we&limit=10";

})