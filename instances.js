function Instance(event, eventInstancesUl) {
  this.id = event.id
  this.recurringEventId = event.recurringEventId;
  this.summary = event.summary;
  this.start = event.start;
  this.end = event.end;
  var when = event.start.dateTime;
  if (!when) {
    when = event.start.date;
    parsedDate = Date.parse(when);
    when = parsedDate.toString('ddd MMM dd');
  } else {
    parsedDate = Date.parse(when);
    when = parsedDate.toString('ddd MMM dd, h:mm tt');
  }
  //Start assembling the HTML that represents each instance.
  var instance_list_item = $('<li>');
  var checkbox = $('<input type="checkbox" class="deleteThisInstanceCheckbox" checked>')
    .change(function() {
      //Keep track of whether each instance is slated for deletion or not and log it when it changes.
      $(instance_list_item).data('shouldDelete', $(this).prop('checked'));
      console.log($(instance_list_item).data('id') + ' has delete value: ' + $(instance_list_item).data('shouldDelete'));
    })
    .attr('id', this.id);
  //The label is what we actually interact with.  It contains the description/date of each instance, as well as a span that gets its icons from the jQuery UI.
  var checkbox_label = $('<label>')
    .attr('for', this.id)
    .click(function() {
      $(this).children('span.instance-deletion-checkbox-label')
        .toggleClass('ui-icon-check ui-icon-minus');
    })
    .text(event.summary + ' (' + when + ')')
    .prepend($('<span>')
      .addClass('instance-deletion-checkbox-label ui-icon ui-icon-check'));

  $(instance_list_item)
    .append(checkbox, checkbox_label)
    .addClass("instance")
    .appendTo(eventInstancesUl)
    .data({
      //Man, it'd be nice if I knew React, because this would be a lot cleaner.
      "id": this.id,
      "recurringEventId": this.recurringEventId,
      "calendarId": calendar_ID,
      'shouldDelete': true
    });
}

function displayDeleteConfirmation(event_li) {
  $('#alert_div')
    .attr("title", "Delete all instances?")
    .text("Are you sure you want to delete all selected instances of this event?  This cannot be undone.")
    .dialog({
      modal: true,
      draggable: false,
      resizable: false,
      position: {
        my: "top",
        at: "center",
        of: window
      },
      buttons: [{
        text: "No",
        icon: 'ui-icon-circle-close',
        click: function() {
          $(this).dialog('close');
          console.log("Clicked no.");
        }
      }, {
        text: "Yes",
        icon: 'ui-icon-circle-check',
        click: function() {
          $(this).dialog('close');
          console.log("Clicked yes");
          delete_all_instances(event_li)

        }
      }]
    });
}

function delete_all_instances(event_li) {
  console.log("Delete all shown instances.")
    //The boolean allInstancesDeleted defaults to true and will be set to false only if we encounter an instance that was *not* checked.
  var allInstancesDeleted = true;
  //Create a batch to put all the delete requests in.
  var batch = gapi.client.newBatch();
  //Iterate over all the list items in this particular event's li (var event_li)
  $(event_li).find("li.instance").each(function(index) {
    var data = $(this).data();
    //Has this instance been selected for deletion?
    if (data.shouldDelete) {
      //If so, make a deletion request...
      var deletionRequest = gapi.client.calendar.events.delete({
        'calendarId': data.calendarId,
        'eventId': data.id
      });
      //...and add it onto the batch.
      batch.add(deletionRequest, {
        'id': data.id
      });
    } else {
      //Otherwise, skip it and set the boolean to false.
      console.log('Skipping ' + data.id);
      allInstancesDeleted = false;
    }
  });
  //Run the batch with promises.
  batch.then(
    function(resp) {
      console.log('Batch status is ' + resp.status);
      //Iterate over the individual results from each deletion request.
      for (var id in resp.result) {
        thisResult = resp.result[id];
        thisStatus = thisResult.status;
        //Basic status message, which we can add to further down.
        var msg = thisStatus + ' ' + id + ' ';
        //By default, we'll want to remove the li representing this instance from the list.  deleteMe will only be set to false if there's some kind of error.
        var deleteMe = true;
        switch (thisResult.status) {
          case 410:
            msg += 'Event was already deleted.  No worries here!';
            break;
          case 401:
          case 403:
            msg += 'Authorization problem.  Try refreshing the page.';
            deleteMe = false;
            allInstancesDeleted = false;
            break;
            //Not clear to me if these will ever come up, but to be on the safe side, we'll keep this in here.
          case 404:
          case 409:
            msg += 'Resource changed or not found.  Run your search again.'
            deleteMe = false;
            allInstancesDeleted = false;
            break;
        }
        console.log(msg);
      }
      //Delete the instance list item if necessary.  This is kind of clunky.
      if (deleteMe) {
        $('#' + id).parent().slideUp(function() {
          $(this).remove();
        });
      }
    },
    //This is only if the batch request fails entirely.
    function(reason) {
      console.log('Big error.  Try refreshing the page.');
      console.log(reason);
    }
  );
  //Prettily remove the event list item if all of its instances were successfully deleted.
  if (allInstancesDeleted) {
    $(event_li).slideUp(function() {
      $(this).remove();
    });
  }
}