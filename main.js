/** Prep some jQuery stuff **/

$(document).ready(function() {
    debug("Document ready.")
    $("#submit").click(prepareSearch);
    $(".datepicker").datepicker({dateFormat: 'yy-mm-dd'});
});

/** Temp: use a particular ID (my sandbox calendar).  Will ultimately be switched over to some kind of picker. */
var calendar_ID = "ckqdcpe80jbu7f5sa72nukc6fo@group.calendar.google.com"

/** var calendar_ID = "primary" **/
