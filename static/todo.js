$(function() {

  function updateList() {
    $.get("/tasks", function(data) {
      $("#task-list").html("");
      for (var i = 0; i < data.length; i++) {
        var checked = "";
        var strike = "";
        if (data[i].done) {
          checked = 'checked';
          strike = 'class="done"';
        }
        $("#task-list").append('<li ' + strike + '><input class="clicked" type="checkbox" ' + checked + ' id="' + data[i].id + '"> ' + data[i].description + '</li>');
      }
    });
  }

  updateList();

  $("#form").on("submit", function(e) {
    e.preventDefault();
    $.post({
      type: "POST",
      url: "/add_task",
      data: $("#form").serialize()
    });
    updateList();
    $('#new-task').val('');
  });

  $("#task-list").on("click", '.clicked', function() {
    var data = {
      id: $(this).attr('id'),
      done: $(this).prop('checked')
    };
    $(this).parent('li').toggleClass('done');
    $.post('/mark_task', data, function(){});
  });

  $('#remove-completed').on('click', function() {

  });

});
