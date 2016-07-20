function list_calendars(){
	debug("Listing calendars");
	var request = gapi.client.calendar.calendarList.list({
	"minAccessRole" : "writer"
	});
	
	request.execute(function(resp){
		calendars = resp.items;
		for (i = 0; i < calendars.length; i++) {
    		var calendar = calendars[i];
	    	new Calendar(calendar);
    	}
    	
		$("#calendar-div").show();
	});
	
	$("#search_content").show();
}

function Calendar(c){
	var calendar_select = $("#calendar-select");
	var o = document.createElement("option");
	$(o).text(c.summary);
	$(o).attr("value",c.id);
	$(calendar_select).append(o);
		
	$(o).css("background",c.backgroundColor);
	$(o).css("color",c.foregroundColor);
}