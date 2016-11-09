$(function() {

  function updateList() {
    $.get("/tasks", function(data) {
      $("#task-list").html("");
      for (var i = 0; i < data.length; i++) {
        $("#task-list").append('<li><input type="checkbox" class="done" id="' + data[i].id + '"> ' + data[i].description + '</li>');
      }
    });
  }

  updateList();

  $("#form").on("submit", function(e) {
    e.preventDefault();

    $.post({
      type: "POST",
      url: "/add_task",
      data: $("#form").serialize(),
      success: successData
    })
    updateList();
  });

  var successData = function(results) {

  }

  $("#task-list").on("click", '.done', function() {
    var data = {
      id: $(this).attr('id'),
      done: $(this).prop('checked')
    }
    $.post('/mark_task', data, function(){})
  })

});
