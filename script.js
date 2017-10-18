var apiKey = "&api_key=da3Cg92we9XXFA8jb3OKeRLWYChQ8Bho&limit=5";
var topics = ["kittens","puppies"];


//generates buttons on ready
  $(document).ready(pineapple());


//runs a function that generates gifs based on the respective buttons 'data-topic'
//GET SOMETHING MORE SPECIFIC THAN BUTTON
$(document).on("click",".gifTopic", function(){
var category= $(this).attr("data-topic");
var queryURL= "https://api.giphy.com/v1/gifs/search?q="+category+apiKey;
$("#gifHolder").html("");
  $.ajax({
    url:queryURL,
    method:"GET"
  })
  .done(function(response){
    console.log(response.data);
    var results = response.data;
    for (var j=0; j<results.length;j++){
      if(results[i].rating!=="r" && results[i].rating!=="pg-13"){
        var gifDiv =$("<div class='item'>");
        var rating=results[i].rating;
        var p =$("<p>").text("Rating: " + rating);
        var topicImage =$("<img>");
        topicImage.attr("class","gif");
        topicImage.attr("src", results[j].images.fixed_height.url);
        topicImage.attr("data-animate",results[j].images.fixed_height.url);
        topicImage.attr("data-still",results[j].images.fixed_height_still.url);
        gifDiv.append(p);
        gifDiv.append(topicImage);
        $("#gifHolder").prepend(gifDiv);
      }
    }

  });
});

//triggers gifs to animate and unanimate
$(document).on("click",".gif", function(){
  var state =$(this).attr("data-state");
  if(state==="still"){
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  }else{
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});



$("#gifGen").click(function(){
  var newButton = $("#input").val();
  topics.push(newButton);
  renderButtons();
});

function renderButtons(){
  $("#buttons").html("");
  pineapple();
}


function pineapple(){
  for(i=0; i<topics.length; i++){
    $("#buttons").append("<button class='gifTopic' data-topic="+topics[i]+" href=''>"+topics[i]+"</button>");
    // $("#buttons").append("<button href='"+queryURL+"'>"+topics[i]+"</button>");
  }
}
