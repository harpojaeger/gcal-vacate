function Event(event) {

    this.id = event.id;
    this.recurringEventId = event.recurringEventId;
    this.summary = event.summary;
    this.start = event.start;
    this.end = event.end;
    this.recurrence = event.recurrence;



    /** Create the list item  with summary**/
    var event_list_item = document.createElement("li");
    var summary = document.createElement("span");
    $(summary).text(this.summary);
    event_list_item.appendChild(summary)
    $("#output").append(event_list_item);
    $(event_list_item).data({
        "id": this.id,
        "recurringEventId": this.recurringEventId,
        "calendarId": calendar_ID
    });

    /**Create the instances button **/
    var instance_link = document.createElement("span");
    instance_link.setAttribute("class", "instances");
    instance_text = document.createTextNode("(instances)");
    instance_link.appendChild(instance_text);
    event_list_item.appendChild(instance_link);
    $(instance_link).click(listInstances);



    /**Create the "further info" div **/
    var info = document.createElement("div");
    $(info).attr("class", "info");
    var RRule = rrulestr(this.recurrence[0]);
    var repeat_desc = RRule.toText();
    $(info).text(repeat_desc).hide();
    event_list_item.appendChild(info);
    $(summary).click(function() {
        $(info).slideToggle();
    });


    

    function listInstances() {
        var event_div = this.parentNode
        var event = $(event_div).data()
        var instances_request = gapi.client.calendar.events.instances({
            "calendarId": event.calendarId,
            "eventId": event.id,
            "timeMin": $("#start").val() + "T00:00:00Z",
            "timeMax": $("#end").val() + "T00:00:00Z",

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
                    instances.clear();
                    for (i = 0; i < events.length; i++) {
                        var event = events[i];
                        v = new Instance(event)
                    }
                    console.log("Retrieved " + events.length + " instances");
                    $("#deleteall").unbind("click").click(delete_all_instances);
                    instances.deleteAllLink.show();
                    instances.title.show();
                } else {
                    debug('No instances found (this is weird).');
                }
            }
        });
    }
}