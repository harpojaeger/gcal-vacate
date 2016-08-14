function calculateTimezone() {
  var d = new Date();
  offset = d.getUTCOffset();
  //Return a timezone offset the way the Google Calendar API likes it formatted.
  return offset.slice(0,3)+":"+offset.slice(3);
}