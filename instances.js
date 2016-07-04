function buildInstancesLink(div, calendar_id, event_id, recurring_id) {
    a = document.createElement("a");
    function_call = "javascript:listInstances('" + calendar_id + "','" + recurring_id + "');"
    a.setAttribute("href", function_call);
    t = document.createTextNode("(list instances)");
    a.appendChild(t);
    a.setAttribute("id", "instances-event-" + event_id)
    div.appendChild(a);
    


}

function listInstances(calendar_id, recurring_id) {
    debug("Instances of " + recurring_id + " from calendar " + calendar_id + ":");


}