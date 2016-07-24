$(document).ready(function() {
    debug("Document ready.");
    eventsController = new eventsController();
    instancesController = new instancesController();
    calendarController = new calendarController();
	$("#submit").click(prepareSearch);
});