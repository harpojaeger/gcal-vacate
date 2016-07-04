
/** Temp: use a particular ID (my sandbox calendar).  Will ultimately be switched over to some kind of picker. */
var calendar_ID = "ckqdcpe80jbu7f5sa72nukc6fo@group.calendar.google.com"

/** var calendar_ID = "primary" **/


/** Get data from the form and run the search **/
function prepareSearch(){
    var start_date = document.getElementById("start").value;
    var end_date = document.getElementById("end").value;
    console.log("Ready to search for repeating events from " + start_date + " to " + end_date);
    listUpcomingEvents(start_date, end_date);
}



/** Function to delete a particular event **/
function deleteThisEvent(calendar_id, event_id) {
    console.log("Attempting to delete event " + event_id + " cal ID " + calendar_id);
    var delete_request = gapi.client.calendar.events.delete({
        'calendarId': calendar_id,
        'eventId': event_id
    });
    delete_request.execute(function(resp) {

        var code = resp.code;
        if (resp.code) {
            console.log("Error " + resp.code + ": " + resp.message);
            console.log(resp);
        } else {
            console.log("Deleted " + event_id + "successfully.")
            var event_div = document.getElementById("event-" + event_id);
            event_div.parentNode.removeChild(event_div);
        }
    });
}

function buildDeleteLink(div, calendar_id, event_id) {
    a = document.createElement("a");
    function_call = "javascript:deleteThisEvent('" + calendar_id + "','" + event_id + "');"
    a.setAttribute("href", function_call);
    t = document.createTextNode("(delete)");
    a.appendChild(t);
    div.appendChild(a);
    
}

function buildInstancesLink(div, calendar_id, event_id, recurring_id) {
a = document.createElement("a");
function_call = "javascript:listInstances('" + calendar_id + "','" + recurring_id + "');"
a.setAttribute("href", function_call);
t = document.createTextNode("(list instances)");
a.appendChild(t);
div.appendChild(a);
a.setAttribute("id", "instances-event-" + event_id)


}

function listInstances(calendar_id, recurring_id){
console.log("Instances of " + recurring_id + " from calendar " + calendar_id + ":");


}

/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents(start_date,end_date) {
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
        document.getElementById("output").innerHTML = "";


        if (events.length > 0) {
        var n = 0;
        
            for (i = 0; i < events.length; i++) {
                var event = events[i];
                var isRepeating = event.recurringEventId;
                console.log(event.summary + " has repeating ID " + isRepeating);
                if (isRepeating) {
                    var when = event.start.dateTime;
                    n++;
                    if (!when) {
                        when = event.start.date;
                    }

                    var output_div = document.getElementById("output");
                    var s = document.createElement("div");
                    var c = document.createTextNode(event.summary + ' (' + when + ') ');
                    s.appendChild(c)
                    output_div.appendChild(s);
                    s.setAttribute("id", "event-" + event.id)
                    buildDeleteLink(s, calendar_ID, event.id);
					buildInstancesLink(s,calendar_ID,event.id,event.reucrringEventID);
                }
            }
            console.log ("Retrieved " + events.length + " events, of which " + n + " are repeating.");
        } else {
            console.log('No upcoming events found.');
        }


    });

}
