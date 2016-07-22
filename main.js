$(document).ready(function() {
    debug("Document ready.");
    eventsController = new eventsController();
    instancesController = new instancesController();
	$("#submit").click(prepareSearch);
});