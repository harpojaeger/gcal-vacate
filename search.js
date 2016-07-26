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

  function instancesRespProcessor(event) {
    var f = function(instances_resp) {
      if (instances_resp.code) {
        debug("Error " + instances_resp.code + ": " + instance_resp.message);
        debug(instances_resp);
      } else {
        var status_string = ('Found ' + instances_resp.items.length + ' instances of ' + event.summary);
        if (instances_resp.items.length > 0) {
          new Event(event, instances_resp);
        } else {
          status_string += " - skipping.";
        }
        debug(status_string);
      }
    }
    return f;
  }

  events_request.execute(function(events_resp) {
    var events = events_resp.items;
    if (events.length > 0) {
      for (i = 0; i < events.length; i++) {
        var event = events[i];
        if (event.status == "confirmed") {
          var instances_request = gapi.client.calendar.events.instances({
            "calendarId": calendar_ID,
            "eventId": event.id,
            "timeMin": $("#start").val() + "T00:00:00Z",
            "timeMax": $("#end").val() + "T00:00:00Z",
          });
          this_func = instancesRespProcessor(event);
          instances_request.execute(this_func);
        }
      }
      eventsController.div.show();
    } else {
      debug('No upcoming events found.');
    }
  });
}


/** Set up the datepickers **/

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