function Event(event, resp) {

  this.id = event.id;
  this.recurringEventId = event.recurringEventId;
  this.summary = event.summary;
  this.start = event.start;
  this.end = event.end;
  this.recurrence = event.recurrence;

  /** Create the list item  with summary**/
  var event_list_item = document.createElement("li");
  var summary = $("<span>")
    .text(this.summary)
    .addClass('action-link')
    .click(showInstances)
    .appendTo(event_list_item);
  $("#events_ul").append(event_list_item);
  $(event_list_item).data('instancesObject', resp);

  /**Create the info button **/
  var info_button = $('<span>')
    .addClass('ui-icon-info ui-icon event-action-button action-link')
    .appendTo(event_list_item);

  /**Create the instances button 
    var instance_link = $('<span>')
    .addClass('ui-icon ui-icon-arrow-1-e event-action-button')
    .click(listInstances);
    $(event_list_item).append(instance_link);
	**/

  /**Create the "further info" div**/
  var RRule = rrulestr(this.recurrence[0]);
  var repeat_desc = RRule.toText();
  var info_div = $('<div>')
    .addClass('info')
    .text(repeat_desc);
  $(event_list_item).append(info_div);

  $(info_button).click(function() {
    $('div.info').not($(this).siblings('div.info')).slideUp();
    $(info_div).slideToggle();

  });
  /**
  The gameplan: split this listInstances function into two: retrieveInstances and listInstances.  The first one will actually run the query, the second will create the Instance objects (thereby outputting them to the page).  That way, we can filter out repeating events if retrieveInstances doesn't return anything (i.e. those that span the time period of interest but whose instances have been deleted).**/

  function showInstances() {
    var event_li = this.parentNode;
    var resp = $(event_li).data('instancesObject');


    console.log("Have " + resp.items.length + " instances to display.");

    var events = resp.items;
    instancesController.clear();
    for (i = 0; i < events.length; i++) {
      var event = events[i];
      new Instance(event)
    }
    $("#deleteall").unbind("click").click(delete_all_instances);
    instancesController.deleteAllLink.show();
    instancesController.title.show();
    instancesController.div.show();
    $('#events-div ul li').removeClass('event-active');
    $(event_li).addClass('event-active');

  }


}