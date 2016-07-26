function Event(event, resp) {

  this.id = event.id;
  this.recurringEventId = event.recurringEventId;
  this.summary = event.summary;
  this.start = event.start;
  this.end = event.end;
  this.recurrence = event.recurrence;

  /** Create the list item  with summary**/
  var summary = $("<span>")
    .text(this.summary)
    .addClass('action-link')
    .click(showInstances);
  var event_list_item = $('<li>')
    .data('instancesObject', resp)
    .append(summary)
    .appendTo('#events_ul');

  /**Create the info button **/
  var info_button = $('<span>')
    .addClass('ui-icon-info ui-icon event-action-button action-link')
    .appendTo(event_list_item);

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

  function showInstances() {
    var event_li = this.parentNode;
    var resp = $(event_li).data('instancesObject');


    console.log("Displaying " + resp.items.length + " instances.");

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