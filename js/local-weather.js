$(document).ready(function(){

var latitude;
var longitude;
var storedWeatherJSON;
$.getJSON('http://ip-api.com/json',function(json){
  latitude = json.lat;
  longitude = json.lon;


  //JSON Weather API Call
$.getJSON('http://api.openweathermap.org/data/2.5/weather?lat=' + latitude + '&lon=' + longitude + '&units=imperial&APPID=7bf2bdf1357d9e6e810efd65dd1a4af9',function(json){
  storedWeatherJSON = json;

  $("#city").html(storedWeatherJSON.name + ", " + storedWeatherJSON.sys.country);
//  $("#latitude").html("(" + storedWeatherJSON.coord.lat + ",");
  //$("#longitude").html(storedWeatherJSON.coord.lon+ ")");
    $("#latitude").html('<iframe src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d13284.225132897795!2d' + longitude + '!3d' + latitude + '!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1466205428997" style="width:100%;height:120px;" frameborder="0" style="border:0" allowfullscreen></iframe>');
  $("#temp").html(Math.round(storedWeatherJSON.main.temp) + "&deg;F");
  $("#condition").html(storedWeatherJSON.weather[0].main);

  var temp = Math.round(storedWeatherJSON.main.temp);
  if(temp < 60) {
    $("#temp-square").css({'border-bottom-color':'blue','animation':'pulse-blue 1.5s ease-in-out 1s infinite alternate'});
  }
  else if(temp < 70) {
    $("#temp-square").css({'border-bottom-color':'#afeeee','animation':'pulse-teal 1.5s ease-in-out 1s infinite alternate'});
  }
  else if(temp < 80) {
    $("#temp-square").css({'border-bottom-color':'yellow','animation':'pulse-yellow 1.5s ease-in-out 1s infinite alternate'});
  }
  else if (temp < 90) {
    $("#temp-square").css({'border-bottom-color':'orange','animation':'pulse-orange 1.5s ease-in-out 1s infinite alternate'});
  }
  else if (temp >= 90) {
    $("#temp-square").css({'border-bottom-color':'#ff3030','animation':'pulse-red 1.5s ease-in-out 1s infinite alternate'});
  }

  switch(storedWeatherJSON.sys.country){
    case "Japan":
    $("#first-stripe").css('background-color','white');
    $("#second-stripe").css('background-color','#ff3030');
    $("#third-stripe").css('background-color','white');
    break;
    default:
  }

  switch(storedWeatherJSON.weather[0].main) {
    case "Clear":
    $("#icon i").addClass("fa-sun-o fa-2x");
    $("#condition-square").css('border-bottom-color','#afeeee');
    break;
    case "Rain":
    $("#icon i").addClass("fa-tint fa-tint fa-2x");
    $("#condition-square").css('border-bottom-color','blue');
    break;
    case "Thunderstorm":
    $("#icon i").addClass("fa-bolt fa-2x");
    $("#condition-square").css('border-bottom-color','yellow');
    break;
    case "Drizzle":
    $("#icon i").addClass("fa-tint fa-2x");
    $("#condition-square").css('border-bottom-color','lightblue');
    break;
    case "Snow":
    $("#icon i").addClass("fa-codepen fa-2x");
    $("#condition-square").css('border-bottom-color','white');
    break;
    case "Atmosphere":
    $("#icon i").addClass("fa-low-vision fa-2x");
    $("#condition-square").css('border-bottom-color','gray');
    break;
    case "Clouds":
    $("#icon i").addClass("fa-cloud fa-2x");
    $("#condition-square").css('border-bottom-color','darkgray');
    break;
    case "Extreme":
    $("#icon i").addClass("fa-exclamation-triangle fa-2x");
    $("#condition-square").css('border-bottom-color','#ff3030');
    break;
    default:


  }

});


});


//TESTING
//var storedWeatherJSON = {"coord":{"lon":-117.82,"lat":33.67},"weather":[{"id":800,"main":"Rain","description":"clear sky","icon":"01n"}],"base":"cmc stations","main":{"temp":80.78,"pressure":1017,"humidity":62,"temp_min":55,"temp_max":63},"wind":{"speed":2.3,"deg":189.5},"rain":{},"clouds":{"all":0},"dt":1466054995,"sys":{"type":3,"id":9110,"message":0.0049,"country":"Japan","sunrise":1466080838,"sunset":1466132629},"id":5359777,"name":"Irvine","cod":200};


$("#convert").on("click",function(){
  if($("#temp").html().indexOf("F") !== -1){
    $("#temp").html((Math.round((storedWeatherJSON.main.temp - 32)/1.8)) + "&deg;C");
  }
  else {
    $("#temp").html(Math.round(storedWeatherJSON.main.temp) + "&deg;F");
  }
});



//Logic for the info button and project description.
//Keep track of initialTop and currentTop for responsive design.
//$('#project-description').css('top') will vary depending on screen size.
var initialTop = $('#project-description').css('top').split("p")[0];
var currentTop = $('#project-description').css('top').split("p")[0];
$('#info-button').on('click',function(){
  if(currentTop <= -365){
    $('#project-description').css('top','0');
    currentTop = 0;
    $('#info-button').css({'background':'white','color':'#d9534f','transform':'rotate(90deg)'});
  }
  else {
    $('#project-description').css('top',initialTop + 'px');
    currentTop = initialTop;
    $('#info-button').css({'background':'#ff3030','color':'white','transform':'rotate(0deg)'});
    $('#info-button:hover').css('background','#7f52d2;')
  }
});


});
