/** Get data from the form and run the search **/
function prepareSearch() {
    var start_date = $("#start").val();
    var end_date = $("#end").val();
    calendar_ID = $("#calendar-select").val();
    if ($('#calendar-select').val().length && start_date.length && end_date.length) {
        start_date += "T00:00:00Z";
        end_date += "T00:00:00Z";
        debug("Search for repeating events from " + start_date + " to " + end_date + " in calendar " + calendar_ID);
        listUpcomingEvents(start_date, end_date);
        instances.clear();
        events.title.show();
        events.clear();
        instances.title.hide();
        instances.deleteAllLink.hide();
    } else {
        debug("Requisite data not present for search.");
        $("#error-div").attr("title", "Error").text("Please choose a calendar and enter both start and end dates.").dialog({
            buttons: [{
                text: "OK",
                click: function() {
                    $(this).dialog("close");
                }
            }]
        });
    }

}

function listUpcomingEvents(start_date, end_date) {
    var request = gapi.client.calendar.events.list({
        'calendarId': calendar_ID,
        'timeMin': start_date,
        'timeMax': end_date,
        'showDeleted': false,
        'singleEvents': false,
        'maxResults': 2500
    });

    request.execute(function(resp) {
        var events = resp.items;
        if (events.length > 0) {
            var n = 0;
            for (i = 0; i < events.length; i++) {
                var event = events[i];
                var recurs = !((typeof event.recurrence) == "undefined");
                if (event.status == "confirmed" && recurs) {
                    n++;
                    v = new Event(event)
                }
            }

            console.log("Retrieved " + n + " repeating events.");
            $("#events_title").text("Events");
        } else {
            debug('No upcoming events found.');
        }
    });
}


var datepickerOptions = {
    dateFormat: 'yy-mm-dd',
    changeMonth: true,
    changeYear: true,
    showOtherMonths: true,
    selectOtherMonths: true,
};

$(function() {
    var dateFormat = "yy-mm-dd",
        from = $("#start")
        .datepicker(datepickerOptions)
        .on("change", function() {
            to.datepicker("option", "minDate", getDate(this));
        }),
        to = $("#end").datepicker(datepickerOptions)
        .on("change", function() {
            from.datepicker("option", "maxDate", getDate(this));
        });

    function getDate(element) {
        var date;
        try {
            date = $.datepicker.parseDate(dateFormat, element.value);
        } catch (error) {
            date = null;
        }

        return date;
    }
});