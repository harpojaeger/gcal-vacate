var VEvents = {

    append: function(o) {
        debug("Appending.");
        document.getElementById("output").appendChild(o)
    },
    clear: function() {
        document.getElementById("output").innerHTML = ""
    },

    delete: function(id) {
        event_div = document.getElementById("event-" + id)
        event_div.parentNode.removeChild(event_div);

    },

    new: function(event) {

        debug(event)

    },


};

function Event(id, recurringId, summary, start, end) {
    this.id = id;
    this.recurringId = recurringId;
    this.summary = summary;
    this.start = start;
    this.end = end;
}