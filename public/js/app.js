// Grab the articles as a json
$.getJSON("/articles", function (data) {
  // For each one
  for (var i = 0; i < data.length; i++) {
    // Display the apropos information on the page

    var artCard = $("<div>")
      .addClass("col-3 artCard")
      .attr("data-id", data[i]._id);

    var title = $("<div>")
      .text(data[i].title);

    var link = $("<button>")
      .addClass("btn btn-sm btn-primary");

    var linkbut = $("<a>")
      .attr('href', data[i].link)
      .text('Source');

    var noteBut = $("<button>")
      .addClass("btn btn-sm btn-success noteBtn")
      .attr("data-target", "#notes")
      .attr("data-toggle", "modal")
      .attr("data-id", data[i]._id)
      .text("Add Note");

    var noteView = $("<button>")
      .addClass("btn btn-sm btn-danger noteView")
      //.attr("href", "/articles/" + data[i]._id)
      .attr("data-id", data[i]._id)
      .attr("data-target", "#notes")
      .attr("data-toggle", "modal")
      .text("Notes");

    var noteAuthor = $("<div>")
      .attr("id", "noteAuthor")
      .text("Posted on: " + data[i].date);

    link.append(linkbut);
    noteView.append(noteView);
    artCard.append(title, noteAuthor, link, noteBut, noteView);

    $("#articles").append(artCard);
  }
});

$(document).on("click", ".noteView", function () {
  // Empty the notes from the note section
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  $(".modal-body").empty();
  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    .then(function (data) {

      //console.log(data);

      var title = $("<h5>")
        .addClass("col-12")
        .text(data.title);

      var modContainer = $("<div>")
        .addClass("container-fluid");
      
      var notes = $("<div>")
        .addClass("row");

      for (var i = 0; i < data.note.length; i++) {

        var noteCard = $("<div>")
          .attr("data-id", data.note[i]._id)
          .addClass("noteCards col-6")

        var noteHead = $("<h6>")
          .text(data.note[i].title + " ")

        var xButt = $("<button>")
          .addClass("btn btn-sm btn-danger")
          .attr("id", "deleteNote")
          .text("x");

        var noteBod = $("<div>")
          .text(data.note[i].body)

        noteHead.append(xButt);
        noteCard.append(noteHead, noteBod)

          notes.append(noteCard);
      }

      $("#title").html(title)
      modContainer.append(notes);
      $(".modal-body").append(modContainer);

    });
});

$(document).on("click", "#scrapeNow", function () {
  $.ajax({
    method: "GET",
    url: "/scrape"
  })
});


// Whenever someone clicks a .noteBtn button
$(document).on("click", ".noteBtn", function () {
  // Empty the notes from the note section
  // Save the id from the p tag
  var thisId = $(this).attr("data-id");

  $(".modal-body").empty();
  // Now make an ajax call for the Article
  $.ajax({
    method: "GET",
    url: "/articles/" + thisId
  })
    // With that done, add the note information to the page
    .then(function (data) {

      var title = $("<h5>")
        .addClass("col-12")
        .text(data.title);

      var noteHead = $("<input>")
        .attr("id", "titleinput")
        .attr("name", "title")
        .attr("placeholder", "Note Name");

      var noteBod = $("<textarea>")
        .attr("id", "bodyinput")
        .attr("name", "body")
        .attr("placeholder", "Enter note information here...");

      $("#title").html(title)
      $(".modal-body").append(noteHead, noteBod);
      $("#savenote").attr("data-id", data._id);

    });
});

// When you click the savenote button
$(document).on("click", "#savenote", function () {
  // Grab the id associated with the article from the submit button
  var thisId = $(this).attr("data-id");

  // Run a POST request to change the note, using what's entered in the inputs
  $.ajax({
    method: "POST",
    url: "/articles/" + thisId,
    data: {
      // Value taken from title input
      title: $("#titleinput").val(),
      // Value taken from note textarea
      body: $("#bodyinput").val()
    }
  })
    // With that done
    .then(function (data) {
      // Log the response
      //console.log(data);
    });
});
