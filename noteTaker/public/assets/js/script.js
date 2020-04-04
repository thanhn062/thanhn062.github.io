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
