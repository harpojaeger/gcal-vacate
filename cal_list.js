function list_calendars(){
	debug("Listing calendars");
	var request = gapi.client.calendar.calendarList.list({
	"minAccessRole" : "writer"
	});
	
	request.execute(function(resp){
		var calendars = resp.items;
		calendar_select = $("#calendar-select");
		for (i = 0; i < calendars.length; i++) {
    		var calendar = calendars[i];
	    	new Calendar(calendar);
    	}
    	debug("Retrieved " + calendars.length + " calendars.");
		$("#calendar-div").show();
	});
	
	$("#search_content").show();
}

function Calendar(c){
	
	var o = document.createElement("option");
	$(o).text(c.summary);
	$(o).attr("value",c.id);
	$(calendar_select).append(o);
		
	$('select#calendar-select option[val="'+c.id+'"]').css("background",c.backgroundColor);
	$(calendar_select).css("color",c.foregroundColor);
}