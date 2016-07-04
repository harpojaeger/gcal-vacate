
var eventList = {

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

    }


};