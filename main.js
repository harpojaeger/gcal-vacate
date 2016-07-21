$(document).ready(function() {
    debug("Document ready.")
    $("#submit").click(prepareSearch);
    $(".datepicker").datepicker({dateFormat: 'yy-mm-dd'});
    events = new eventsController();
    instances = new instancesController();
});
