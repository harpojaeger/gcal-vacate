$(document).ready(function() {
    debug("Document ready.");
    eventsController = new eventsController();
    instancesController = new instancesController();
    searchController = new searchController();
	$("#submit").click(prepareSearch);
});