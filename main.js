$(document).ready(function() {
  console.log("Document ready.");
  timezoneSuffix = calculateTimezone();
  containerController = new containerController();
  eventsController = new eventsController();
  instancesController = new instancesController();
  searchController = new searchController();
  authController = new authController();
  $('span.instance-toggle-all').click(function(){
    if($(this).attr('id') == 'select_all_instances') {
      console.log('Select all instances for deletion.');
      $('.deleteThisInstanceCheckbox:not(:checked)').click();
    } else {
      $('.deleteThisInstanceCheckbox:checked').click();
      console.log('Deselect all instances for deletion.');
    }   
  });

});