function Event(event) {

    this.id = event.id;
    this.recurringEventId = event.recurringEventId;
    this.summary = event.summary;
    this.start = event.start;
    this.end = event.end;

    var when = event.start.dateTime;
    if (!when) {
        when = event.start.date;
    }

    var event_list_item = document.createElement("div");
    var c = document.createTextNode(event.summary + ' (' + when + ') ');
    event_list_item.appendChild(c)
    $("#output").append(event_list_item);
    $(event_list_item).data({
        "id": this.id,
        "recurringEventId": this.recurringEventId,
        "calendarId": calendar_ID
    });


    /**Create the delete button for the event **/
    delete_link = document.createElement("span");
    delete_link.setAttribute("class", "delete");
    delete_text = document.createTextNode("(delete)");
    delete_link.appendChild(delete_text);
    event_list_item.appendChild(delete_link);
    $(delete_link).click(deleteMe);



    function deleteMe() {
        var event_div = this.parentNode
        var event = $(event_div).data()
        debug(event);
        debug("Attempting to delete event " + event.id + " cal ID " + event.calendarId);
        var delete_request = gapi.client.calendar.events.delete({
            'calendarId': event.calendarId,
            'eventId': event.id
        });
        delete_request.execute(function(resp) {

            var code = resp.code;
            if (resp.code) {
                debug("Error " + resp.code + ": " + resp.message);
                debug(resp);
            } else {
                debug("Deleted " + event.id + " successfully.")
                $(event_div).fadeOut(100).fadeIn(100, function() {
                    $(event_div).slideUp(function() {
                        $(event_div).remove();
                    });
                });
            }
        });

    }


    /**Create the instances button **/
    var instance_link = document.createElement("a");
    instance_link.setAttribute("class", "instances");
    instance_text = document.createTextNode("(instances)");
    instance_link.appendChild(instance_text);
    event_list_item.appendChild(instance_link);

    $(instance_link).click(listInstances);

    function listInstances() {
        var event_div = this.parentNode
        var event = $(event_div).data()
        debug(event)
        var instances_request = gapi.client.calendar.events.instances({
            "calendarId" : event.calendarId,
            "eventId" : event.recurringEventId,
            "timeMin" : $("#start").val(),
            "timeMax" : $("#end").val()
        });
        instances_request.execute(function(resp) {

            var code = resp.code;
            if (resp.code) {
                debug("Error " + resp.code + ": " + resp.message);
                debug(resp);
            } else {
                var events = resp.items;
                if (events.length > 0) {
                    var n = 0;
                    $("#instances").empty();
                    for (i = 0; i < events.length; i++) {
                        var event = events[i];
                        v = new Instance(event)
                    }
                    console.log("Retrieved " + events.length + " instances");


                } else {
                    debug('No instances found (this is weird).');
                }
            }
        });
    }
}