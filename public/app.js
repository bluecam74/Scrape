$.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      $("#articles").append(
          "<div class='item'> <p class ='itemTitle' data-id='"
           + data[i]._id + "'>" 
           + data[i].title + "</p> <p class = 'itemLink'>" 
           + data[i].link + "</p> <button type='button' data-id='"
           + data[i]._id + "' class='btn save'>Save Article</button> </div>"
          );
    }
  });
  $.getJSON("/articles", function(data) {
    // For each one
    for (var i = 0; i < data.length; i++) {
      // Display the apropos information on the page
      if (data[i].saved ===true) {
        $(".saved-articles-box").append(
          "<div class='item'> <p class ='itemTitle' data-id='"
           + data[i]._id + "'>" 
           + data[i].title + "</p> <p class = 'itemLink'>" 
           + data[i].link + "</p> <button type='button' data-id='"
           + data[i]._id + "' class='btn unsave'>Delete From Saved Articles</button><button type='button' data-id='"
           + data[i]._id + "' class='btn addNote'>Add/Edit Note</button> </div>"
          );
    }
      }
      
  });

  $(document).on("click", ".scrape", function() {
    location.href = "/scrape";
  });

  $(document).on("click", ".save", function(e) {
    e.preventDefault();
    var id = $(this).attr("data-id");
    console.log("id ", id);

    $.ajax({
      method: "PUT", 
      url: "/update/articles/" + id,
    })
    .then(function (data) {
      console.log(data);
    })
    
    })

    $(document).on("click", ".unsave", function(e) {
      e.preventDefault();
      var id = $(this).attr("data-id");
      $.ajax({
        method: "PUT", 
        url: "/unsave/articles/" + id,
      })
      .then(function (data) {
        console.log(data);
        window.location.href = "/saved.html";
      })
      
      })
  
  // Whenever someone clicks a p tag
  $(document).on("click", ".addNote", function() {
    // Empty the notes from the note section
    $("#notes").empty();
    // Save the id from the p tag
    var thisId = $(this).attr("data-id");
  
    // Now make an ajax call for the Article
    $.ajax({
      method: "GET",
      url: "/articles/" + thisId
    })
      // With that done, add the note information to the page
      .then(function(data) {
        console.log(data);
        // The title of the article
        $("#notes").append("<h3>" + data.title + "</h3>");
        // An input to enter a new title
        $("#notes").append("<input id='titleinput' name='title' >");
        // A textarea to add a new note body
        $("#notes").append("<textarea id='bodyinput' name='body'></textarea>");
        // A button to submit a new note, with the id of the article saved to it
        $("#notes").append("<button data-id='" + data._id + "' id='savenote'>Save Note</button>");
  
        // If there's a note in the article
        if (data.note) {
          // Place the title of the note in the title input
          $("#titleinput").val(data.note.title);
          // Place the body of the note in the body textarea
          $("#bodyinput").val(data.note.body);
        }
      });
  });
  
  // When you click the savenote button
  $(document).on("click", "#savenote", function() {
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
      .then(function(data) {
        // Log the response
        console.log(data);
        // Empty the notes section
        $("#notes").empty();
      });
  
    // Also, remove the values entered in the input and textarea for note entry
    $("#titleinput").val("");
    $("#bodyinput").val("");
  });
  