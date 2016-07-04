function Event(event) {
    debug("Creating new Event")
    this.id = event.id;
    this.recurringId = event.recurringId;
    this.summary = event.summary;
    this.start = event.start;
    this.end = event.end;

    var when = event.start.dateTime;
    if (!when) { when = event.start.date; }

    var s = document.createElement("div");
    var c = document.createTextNode(event.summary + ' (' + when + ') ');
    s.appendChild(c)
    s.setAttribute("id", "event-" + event.id)
    $("#output").append(s);
}