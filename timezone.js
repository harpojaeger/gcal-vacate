function calculateTimezone() {
  var d = new Date()
  /** var offset = d.getTimezoneOffset();
  if (offset == 0) {

    return 'Z'
  } else if (offset > 0) {
    return offset / -60
  } else {
    return '+' + offset / -60

  }**/
  offset = d.getUTCOffset();
  return offset.slice(0,3)+":"+offset.slice(3);
}