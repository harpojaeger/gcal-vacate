function Instance(event) {
  this.id = event.id
  this.recurringEventId = event.recurringEventId;
  this.summary = event.summary;
  this.start = event.start;
  this.end = event.end;
  var when = event.start.dateTime;
  if (!when) {
    when = event.start.date;
    parsedDate = Date.parse(when);
    when = parsedDate.toString('MM/dd');
  } else {
    parsedDate = Date.parse(when);
    when = parsedDate.toString('MM/dd h:mm tt');
  }

  var instance_list_item = $('<li>')
  .text(event.summary + ' (' + when + ') ')
  .addClass("instance")
  .appendTo('#instances-ul')
  .data({
    "id": this.id,
    "recurringEventId": this.recurringEventId,
    "calendarId": calendar_ID
  });
  
  var checkbox = $('<input type="checkbox" class="deleteThisInstanceCheckbox" checked>')
  .change(function(){
    $(instance_list_item).data('shouldDelete',$(this).prop('checked'));
    debug($(instance_list_item).data('id') + ' has delete value: ' + $(instance_list_item).data('shouldDelete'));
  })
  .prependTo(instance_list_item);

  /**$(instance_list_item).on("click",function(){
		delete_instance(this)
    });**/
  $(instance_list_item).on("instance:delete", function() {
    delete_instance(this)
  });

  function delete_instance(instance) {
    event = $(instance).data();
    var delete_request = gapi.client.calendar.events.delete({
      'calendarId': event.calendarId,
      'eventId': event.id
    });
    delete_request.execute(function(resp) {
      if (resp.code) {
        debug("Error " + resp.code + ": " + resp.message);
      } else {
        debug("Deleted " + event.id + " successfully.")
        $(instance).slideUp(function() {
          $(instance).remove();
        });
      }
    });
  }

}

function delete_all_instances() {

  $('#alert_div')
    .attr("title", "Delete all instances?")
    .text("Are you sure you want to delete all instances of this event between the specificed dates?  This cannot be undone.")
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
          debug("Delete all shown instances.")
          $("li.instance").each(function(index) {
            debug(index + " " + $(this).data("id"));
            $(this).trigger("instance:delete");
          });
        }
      }]
    });

}