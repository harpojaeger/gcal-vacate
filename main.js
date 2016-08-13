$(document).ready(function() {
  console.log("Document ready.");
  timezoneSuffix = calculateTimezone();
  containerController = new containerController();
  eventsController = new eventsController();
  instancesController = new instancesController();
  searchController = new searchController();
  authController = new authController();
});