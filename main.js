$(document).ready(function() {
  debug("Document ready.");
  eventsController = new eventsController();
  instancesController = new instancesController();
  searchController = new searchController();
  $('span.instance-toggle-all').click(function(){
    if($(this).attr('id') == 'select_all_instances') {
      debug('Select all instances for deletion.');
      $('.deleteThisInstanceCheckbox:not(:checked)').click();
    } else {
      $('.deleteThisInstanceCheckbox:checked').click();
      debug('Deselect all instances for deletion.');
    }   
  });

});