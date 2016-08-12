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

  var instance_list_item = $('<li>');
  var checkbox = $('<input type="checkbox" class="deleteThisInstanceCheckbox" checked>')
    .change(function() {
      $(instance_list_item).data('shouldDelete', $(this).prop('checked'));
      debug($(instance_list_item).data('id') + ' has delete value: ' + $(instance_list_item).data('shouldDelete'));
    })
    .attr('id', this.id);

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
          debug("Clicked no.");
        }
      }, {
        text: "Yes",
        icon: 'ui-icon-circle-check',
        click: function() {
          $(this).dialog('close');
          debug("Clicked yes");
          delete_all_instances(event_li)

        }
      }]
    });
}

function delete_all_instances(event_li) {
  debug("Delete all shown instances.")
  var allInstancesDeleted = true;
  var batch = gapi.client.newBatch();
  $(event_li).find("li.instance").each(function(index) {
    var data = $(this).data();
    if (data.shouldDelete) {
      var deletionRequest = gapi.client.calendar.events.delete({
        'calendarId': data.calendarId,
        'eventId': data.id
      });
      batch.add(deletionRequest, {
        'id': data.id
      });
    } else {
      debug('Skipping ' + data.id);
      allInstancesDeleted = false;
    }
  });

  batch.then(function(resp) {
    debug(resp);
    debug("Deleted " + data.id + " successfully.")
    $(instance).slideUp(function() {
      $(instance).remove();
    });
  }, function(reason) {
    debug(reason);
  });
  if (allInstancesDeleted) {
    $(event_li).slideUp(function() {
      $(this).remove();
    });
  }
}