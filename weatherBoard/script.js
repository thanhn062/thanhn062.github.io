var d = new Date();
var strDate = d.getFullYear() + "/" + (d.getMonth()+1) + "/" + d.getDate();
// Default area
showResult(5389489);
  $(".btn").click(function() {
    event.preventDefault();
    var searchQuery = $("#search").val();
    searchID(searchQuery);
  });
  function searchID(searchQuery) {
    $.ajax({
      url: "https://raw.githubusercontent.com/thanhn062/thanhn062.github.io/master/weatherBoard/us-city-code.json",
      method: "GET"
    }).then(function(response) {
      var response = JSON.parse(response);
      var results_count = 0;
      $("#results").text("");
      $("#search").val("");
      for (var i = 0; i < response.length; i++) {
        var name = response[i].name.toLowerCase();
        if (name.indexOf(searchQuery.toLowerCase()) >= 0) {
          var id = response[i].id;
          var li = $("<li>",{onclick: "showResult("+id+")", text: response[i].name, class: "list-group-item"});
          $("#results").append(li);
          results_count++;
          if (results_count == 8)
            break;
        }
      }
    });
  }
function showResult(id) {
  var api_key = "11dcb17cd9b807474e443d51ee99f6f3";
  // Currrent weather
  var query = "https://api.openweathermap.org/data/2.5/weather?id=" + id + "&appid=" + api_key;
  $.ajax({
    url: query,
    method: "GET"
  }).then(function(res) {
    $(".city").text(res.name + " (" + strDate + ")");
    $(".temperature").text("Temperature: "+ Math.ceil((res.main.temp -273.15)*9/5+32) +"°F");
    $(".humidity").text("Humidity: " + res.main.humidity);
    $(".speed").text("Wind speed: " + res.wind.speed);
    query = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat="+res.coord.lat+"&lon="+res.coord.lon + "&appid=" + api_key;
    $.ajax({
      url: query,
      method: "GET"
    }).then(function(res) {
      $(".UV-index").text("UV Index: "+res[0].value);
    });
  });
  // UV today

  // 5-day-forecast
  query = "https://api.openweathermap.org/data/2.5/forecast?id=" + id + "&appid=" + api_key;
  $.ajax({
    url: query,
    methoid: "GET"
  }).then(function(res) {
    console.log(res);
    $(".day1").html(res.list[0].dt_txt.substr(0,10) + "<br><img src=http://openweathermap.org/img/wn/" + res.list[0].weather[0].icon +"@2x.png>" + "<br>Temp: "+ Math.ceil((res.list[0].main.temp -273.15)*9/5+32) + " °F<br>Humidity: " + res.list[0].main.humidity);
    $(".day2").html(res.list[7].dt_txt.substr(0,10) + "<br><img src=http://openweathermap.org/img/wn/" + res.list[7].weather[0].icon +"@2x.png>" + "<br>Temp: "+ Math.ceil((res.list[7].main.temp -273.15)*9/5+32) + " °F<br>Humidity: " + res.list[7].main.humidity);
    $(".day3").html(res.list[15].dt_txt.substr(0,10) + "<br><img src=http://openweathermap.org/img/wn/" + res.list[15].weather[0].icon +"@2x.png>" + "<br>Temp: "+ Math.ceil((res.list[15].main.temp -273.15)*9/5+32) + " °F<br>Humidity: " + res.list[15].main.humidity);
    $(".day4").html(res.list[23].dt_txt.substr(0,10) + "<br><img src=http://openweathermap.org/img/wn/" + res.list[23].weather[0].icon +"@2x.png>" + "<br>Temp: "+ Math.ceil((res.list[23].main.temp -273.15)*9/5+32) + " °F<br>Humidity: " + res.list[23].main.humidity);
    $(".day5").html(res.list[31].dt_txt.substr(0,10) + "<br><img src=http://openweathermap.org/img/wn/" + res.list[31].weather[0].icon +"@2x.png>" + "<br>Temp: "+ Math.ceil((res.list[31].main.temp -273.15)*9/5+32) + " °F<br>Humidity: " + res.list[31].main.humidity);

  });
}
