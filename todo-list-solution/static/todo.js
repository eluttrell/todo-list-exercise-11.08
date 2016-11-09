$(function() {

  function updateList() {
    $('#task-list').empty();
    // $('#task-list').html('');
    $.get('/tasks', function(tasks) {
      tasks.forEach(function(task) {
        var li = '<li id="32"><input class="checkbox" type="checkbox">' + task.description + '</li>';
        $('#task-list').append(li);
      });
    });
  }

  updateList();

  $('#form').submit(function(event) {
    event.preventDefault();
    var task = $('#new-task').val();
    var data = {
      task: task
    };
    console.log('data', data);
    $.post('/add_task', data, function(result) {
      updateList();
    });
  });

  // This won't work for checkboxes that are
  // dynamically generated after the fact
  // $('#task-list .checkbox').click(function() {
  //   console.log('checkbox clicked');
  // });

  $('#task-list').on('click', '.checkbox', function() {
    console.log('checkbox clicked');
    var $li = $(this).closest();
    var data = {
      id: $li.attr('id'),
      done: $(this).prop('checked')
    };
    $.post('/mark_task', data, function() {
      console.log('Marked the task');
    });
  });

});
