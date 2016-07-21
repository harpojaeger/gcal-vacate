/** Prep some jQuery stuff **/

$(document).ready(function() {
    debug("Document ready.")
    $("#submit").click(prepareSearch);
    $(".datepicker").datepicker({dateFormat: 'yy-mm-dd'});
    
    events = new eventsController();
    instances = new instancesController();
    
});

/** Temp: use a particular ID (my sandbox calendar).  Will ultimately be switched over to some kind of picker. */


/** var calendar_ID = "primary" **/
