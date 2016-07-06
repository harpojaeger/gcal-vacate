/** Prep some jQuery stuff **/

$(document).ready(function() {
    debug("Document ready.")
    $("#submit").click(prepareSearch);
});

/** Temp: use a particular ID (my sandbox calendar).  Will ultimately be switched over to some kind of picker. */
var calendar_ID = "ckqdcpe80jbu7f5sa72nukc6fo@group.calendar.google.com"

/** var calendar_ID = "primary" **/

/** Get data from the form and run the search **/
function prepareSearch() {
    var start_date = document.getElementById("start").value;
    var end_date = document.getElementById("end").value;
    debug("Ready to search for repeating events from " + start_date + " to " + end_date);
    listUpcomingEvents(start_date, end_date);
    $("#output").empty();
}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents(start_date, end_date) {
    var request = gapi.client.calendar.events.list({
        'calendarId': calendar_ID,
        'timeMin': start_date,
        'timeMax': end_date,
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 2500,
        'orderBy': 'startTime'
    });
    request.execute(function(resp) {
        var events = resp.items;
        if (events.length > 0) {
            var n = 0;
            for (i = 0; i < events.length; i++) {
                var event = events[i];
                var isRepeating = event.recurringEventId;
                debug(event.summary + " has repeating ID " + isRepeating);
                if (isRepeating) {
                    n++;
                    v = new Event(event)
                }
            }
            console.log("Retrieved " + events.length + " events, of which " + n + " are repeating.");


        } else {
            debug('No upcoming events found.');
        }


    });

}