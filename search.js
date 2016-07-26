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
    instancesController.clear();
    eventsController.div.show();
    eventsController.ul.clear();
    instancesController.div.hide();
  } else {
    debug("Requisite data not present for search.");
    $("#alert_div").attr("title", "Error").text("Please choose a calendar and enter both start and end dates.").dialog({
      modal: true,
      draggable: false,
      resizable: false,
      position: {
        my: "top",
        at: "center",
        of: window
      },
      buttons: [{
        text: "OK",
        icon: "ui-icon-check",
        click: function() {
          $(this).dialog("close");
        }
      }]
    });
  }

}

function listUpcomingEvents(start_date, end_date) {
  var events_request = gapi.client.calendar.events.list({
    'calendarId': calendar_ID,
    'timeMin': start_date,
    'timeMax': end_date,
    'showDeleted': false,
    'singleEvents': false,
    'maxResults': 2500
  });

  events_request.execute(function(events_resp) {
    debug("Executed events request.");

    var events = events_resp.items;
    console.log("Retrieved " + events.length + " repeating events.");
    if (events.length > 0) {
      var n = 0;
      for (i = 0; i < events.length; i++) {
        var event = events[i];
        var n = 0;
        if (event.status == "confirmed") {
          n++;
          debug('Running instances request for ' + event.summary);
          var instances_request = gapi.client.calendar.events.instances({
            "calendarId": calendar_ID,
            "eventId": event.id,
            "timeMin": $("#start").val() + "T00:00:00Z",
            "timeMax": $("#end").val() + "T00:00:00Z",
          });
          instances_request.execute(function(instances_resp) {
            if (instances_resp.code) {
              debug("Error " + instances_resp.code + ": " + instance_resp.message);
              debug(instances_resp);
            } else {
              if (instances_resp.items.length > 0) {
                debug(event.summary + ': ' + instances_resp.items.length + ' instances found.');
                /**new Event(event, instances_resp);**/
              }
            }
          });
        }

      }



      eventsController.div.show();
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