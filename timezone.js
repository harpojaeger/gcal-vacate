function calculateTimezone() {
  var d = new Date();
  offset = d.getUTCOffset();
  return offset.slice(0,3)+":"+offset.slice(3);
}