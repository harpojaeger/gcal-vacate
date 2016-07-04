/** Function to delete a particular event **/
function deleteThisEvent(calendar_id, event_id) {
    debug("Attempting to delete event " + event_id + " cal ID " + calendar_id);
    var delete_request = gapi.client.calendar.events.delete({
        'calendarId': calendar_id,
        'eventId': event_id
    });
    delete_request.execute(function(resp) {

        var code = resp.code;
        if (resp.code) {
            debug("Error " + resp.code + ": " + resp.message);
            debug(resp);
        } else {
            debug("Deleted " + event_id + "successfully.")
            VEvents.delete(event_id)
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