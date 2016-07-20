function list_calendars(){
	debug("Listing calendars");
	var request = gapi.client.calendar.calendarList.list({
	"minAccessRole" : "writer"
	});
	request.execute(function(resp){debug(resp);});
/**$("#search_content").show();
**/
}
