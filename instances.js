function Instance(event){
    this.id = event.id
    /** debug("Created new instance with ID " + this.id) **/
    this.recurringEventId = event.recurringEventId;
    this.summary = event.summary;
    this.start = event.start;
    this.end = event.end;
    var when = event.start.dateTime;
    if (!when) {
        when = event.start.date;
        parsedDate = Date.parse(when);
        when = parsedDate.toString('M/d/yyyy');
    } else {
        parsedDate = Date.parse(when);
        when = parsedDate.toString('M/d/yyyy HH:mm tt');
    }
    var instance_list_item = document.createElement("li");
    var c = document.createTextNode(event.summary + ' (' + when + ') ');
    instance_list_item.appendChild(c)
    $("#instances").append(instance_list_item);
    $(instance_list_item).data({
        "id": this.id,
        "recurringEventId": this.recurringEventId,
        "calendarId": calendar_ID
    });
    $(instance_list_item).on("click",function(){
		delete_instance(this)
    });
    
    
    
    
    function delete_instance(instance) {
    	event = $(instance).data();
        debug("Attempting to delete event " + event.id + " cal ID " + event.calendarId);
        var delete_request = gapi.client.calendar.events.delete({
            'calendarId': event.calendarId,
            'eventId': event.id
        });
        delete_request.execute(function(resp) {
            if (resp.code) {
                debug("Error " + resp.code + ": " + resp.message);
                debug(resp);
            } else {
                debug("Deleted " + event.id + " successfully.")
                $(instance).slideUp(function() {
                        $(instance).remove();
                });
            }   
        });
    }
    
}


function delete_all_instances(){
        debug("Delete all shown instances.")
}