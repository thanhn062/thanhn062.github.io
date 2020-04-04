function submit() {
  var note = {
    title: $(".note-title").val(),
    text: $(".note-textarea").val()
  };
  $.ajax("/api/notes", {
    type: "POST",
    data: note
  }).then(function() {
    // Go back to main page
    location.replace("/");
  });
}

// Get note data
$.ajax({
  url: "localhost:8080/api/notes",
  method: "GET"
}).then(function(res) {
  var res = JSON.parse(res);
  for (var i = 0; i < res.length; i++) {
    var card = $("<div>", {class: "card"});
    var card_body =  $("<div>", {class: "card-body"});
    card.append(card_body);
    $(".notes").html("asdasdas");
    //res[i]
  }
})
