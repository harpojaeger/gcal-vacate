// Get data from the form and run the search
function prepareSearch() {
  var start_date = $("#start").val();
  var end_date = $("#end").val();
  calendar_ID = $("#calendar-select").val();
  if ($('#calendar-select').val().length && start_date.length && end_date.length) {
    start_date += "T00:00:00" + timezoneSuffix;
    end_date += "T00:00:00" + timezoneSuffix;
    console.log("Search for repeating events from " + start_date + " to " + end_date + " in calendar " + calendar_ID);
    listUpcomingEvents(start_date, end_date);
    instancesController.clear();
    eventsController.div.show();
    eventsController.ul.clear();
    instancesController.div.hide();
  } else {
    console.log("Requisite data not present for search.");
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
  //Create a function to process each of the returned events and return it, using closures so it has access to the right event data.
  function instancesRespProcessor(event) {
    var f = function(instances_resp) {
      if (instances_resp.code) {
        console.log("Error " + instances_resp.code + ": " + instance_resp.message);
        console.log(instances_resp);
      } else {
        var status_string = ('Found ' + instances_resp.items.length + ' instances of ' + event.summary);
        if (instances_resp.items.length > 0) {
          new BaseEvent(event, instances_resp);
          //Hide the 'no events found' message only if an event we actually want to see shows up.  Otherwise, it stays there.
          eventsController.msg.hide();
        } else {
          status_string += " - skipping.";
        }
        console.log(status_string);
      }
    }
    return f;
  }

  events_request.execute(function(events_resp) {
    var events = events_resp.items;
    //Set the 'no events found message' and show it.  Note that the main event div is still hidden, so this has no effect the first time a search is run.
    eventsController.msg.set('No events found.');
    eventsController.msg.show();
    if (events.length > 0) {
      for (i = 0; i < events.length; i++) {
        var event = events[i];
        //This is where the action happens.  We can't filter on these attributes in the API call so it has to happen here.
        if (event.status == "confirmed" && typeof(event.recurrence) !== 'undefined') {
          //Set up an API call to get the instances of the event we've now determined should actually be output.  Todo: do this with a batch instead.
          var instances_request = gapi.client.calendar.events.instances({
            "calendarId": calendar_ID,
            "eventId": event.id,
            "timeMin": $("#start").val() + "T00:00:00" + timezoneSuffix,
            "timeMax": $("#end").val() + "T00:00:00" + timezoneSuffix,
          });
          //Make a function that has access to the event information
          this_func = instancesRespProcessor(event);
          //Run the instances request using this new function.
          instances_request.execute(this_func);
        }
      }
      eventsController.div.show();
    } else {
      console.log('No upcoming events found.');
      eventsController.ul.clear();
    }
  });
}


// Set up the datepickers
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