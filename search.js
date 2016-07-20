
/** Get data from the form and run the search **/
function prepareSearch() {
    var start_date = $("#start").val() + "T00:00:00Z";
    var end_date = $("#end").val() + "T00:00:00Z";
    debug("Ready to search for repeating events from " + start_date + " to " + end_date);
    listUpcomingEvents(start_date, end_date);
    $("#output").empty();
    $("#instances").empty();
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
        'singleEvents': false,
        'maxResults': 2500
    });
    request.execute(function(resp) {
        var events = resp.items;
        if (events.length > 0) {
            var n = 0;
            for (i = 0; i < events.length; i++) {
                var event = events[i];
                if (event.status == "confirmed" ) {
                    n++;
                    v = new Event(event)   
                }
            }
            console.log("Retrieved " + n + " repeating events.");
            $("#events_title").text("Events");
        } else {
            debug('No upcoming events found.');
        }
    });
}