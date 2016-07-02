// Your Client ID can be retrieved from your project in the Google
// Developer Console, https://console.developers.google.com
var CLIENT_ID = '223934007308-ldle11sd1bl1udh6gaq14d604q5lu4jf.apps.googleusercontent.com';

var SCOPES = ["https://www.googleapis.com/auth/calendar"];

/** Temp: use a particular ID (my sandbox calendar).  Will ultimately be switched over to some kind of picker. */
var calendar_ID = "ckqdcpe80jbu7f5sa72nukc6fo@group.calendar.google.com"


/**
 * Check if current user has authorized this application.
 */
function checkAuth() {
    gapi.auth.authorize({
        'client_id': CLIENT_ID,
        'scope': SCOPES.join(' '),
        'immediate': true
    }, handleAuthResult);
}

/**
 * Handle response from authorization server.
 *
 * @param {Object} authResult Authorization result.
 */
function handleAuthResult(authResult) {
    var authorizeDiv = document.getElementById('authorize-div');
    if (authResult && !authResult.error) {
        // Hide auth UI, then load client library.
        authorizeDiv.style.display = 'none';

        loadCalendarApi();
    } else {
        // Show auth UI, allowing the user to initiate authorization by
        // clicking authorize button.
        authorizeDiv.style.display = 'inline';
    }
}

/**
 * Initiate auth flow in response to user clicking authorize button.
 *
 * @param {Event} event Button click event.
 */
function handleAuthClick(event) {
    gapi.auth.authorize({
            client_id: CLIENT_ID,
            scope: SCOPES,
            immediate: false
        },
        handleAuthResult);
    return false;
}

/**
 * Load Google Calendar client library. List upcoming events
 * once client library is loaded.
 */
function loadCalendarApi() {
    gapi.client.load('calendar', 'v3', listUpcomingEvents);
}


/** Function to delete a particular event **/
function deleteThisEvent(calendar_id, event_id) {
    console.log("Attempting to delete event " + event_id + " cal ID " + calendar_id);
    var delete_request = gapi.client.calendar.events.delete({
        'calendarId': calendar_id,
        'eventId': event_id
    });
    delete_request.execute(function(resp) {

        console.log(resp);
        var code = resp.code;
        if (resp.code) {
            console.log("Error " + resp.code + ": " + resp.message);

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
    div.setAttribute("id", "event-" + event_id)
}





/**
 * Print the summary and start datetime/date of the next ten events in
 * the authorized user's calendar. If no events are found an
 * appropriate message is printed.
 */
function listUpcomingEvents() {
    var request = gapi.client.calendar.events.list({
        'calendarId': calendar_ID,
        'timeMin': (new Date()).toISOString(),
        'showDeleted': false,
        'singleEvents': true,
        'maxResults': 15,
        'orderBy': 'startTime'
    });



    request.execute(function(resp) {
        var events = resp.items;
        appendPre('Upcoming events:');

        if (events.length > 0) {
            for (i = 0; i < events.length; i++) {
                var event = events[i];
                var isRepeating = event.recurringEventId;
                console.log(event.summary + " has repeating ID " + isRepeating);
                if (isRepeating) {
                    var when = event.start.dateTime;
                    if (!when) {
                        when = event.start.date;
                    }

                    var output_div = document.getElementById("output");
                    var s = document.createElement("div");
                    var c = document.createTextNode(event.summary + ' (' + when + ') ');
                    s.appendChild(c)
                    output_div.appendChild(s);
                    buildDeleteLink(s, calendar_ID, event.id);

                }
            }
        } else {
            appendPre('No upcoming events found.');
        }


    });

}

/**
 * Append a pre element to the body containing the given message
 * as its text node.
 *
 * @param {string} message Text to be placed in pre element.
 */
function appendPre(message) {
    var pre = document.getElementById('output');
    var textContent = document.createTextNode(message + '\n');
    pre.appendChild(textContent);
}