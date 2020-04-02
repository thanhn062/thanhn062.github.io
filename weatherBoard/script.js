$(".btn").press()
searchID(searchQuery) {
  $.ajax({
    url: "https://raw.githubusercontent.com/thanhn062/thanhn062.github.io/master/weatherBoard/us-city-code.json",
    method: "GET"
  }).then(function(response) {
    // search for city's name
    for (var i = 0; i < response.length; i++) {
      if (response[i].name.indexOf(searchQuery) >= 0) {
        var id = response[i].id;
        showResults(id);
        break;
      }
    }
  });
}

showResults(id) {
  
}
