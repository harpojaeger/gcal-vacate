$(document).ready(function() {
  console.log("Document ready.");
  timezoneSuffix = calculateTimezone();
  containerController = new containerController();
  eventsController = new eventsController();
  searchController = new searchController();
  authController = new authController();
});