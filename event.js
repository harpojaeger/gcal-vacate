function BaseEvent(event, instances_resp) {
  this.eventData = event;

  /** Create the summary**/
  var summary = $("<span>")
    .text(this.eventData.summary)
    .addClass('action-link')
    .click(showInstances);

  /**Create the "further info" div**/
  var RRule = rrulestr(this.eventData.recurrence[0]);
  var repeat_desc = RRule.toText();
  var info_div = $('<div>')
    .addClass('info')
    .text(repeat_desc);

  /**Create the info toggle button **/
  var info_button = $('<span>')
    .addClass('ui-icon-info ui-icon event-action-button action-link')
    .click(function() {
      $('div.info').not($(this).siblings('div.info')).slideUp();
      $(info_div).slideToggle();
    });

  /** Create the list item, append children & add it to the DOM **/
  var event_list_item = $('<li>')
    .data('instancesObject', instances_resp)
    .data('eventObject', this)
    .append(summary, info_button, info_div)
    .appendTo('#events_ul');

  function showInstances() {
    var event_li = this.parentNode;
    var instances_resp = $(event_li).data('instancesObject');
    var baseEvent = $(event_li).data('eventObject').eventData;
    console.log("Displaying " + instances_resp.items.length + " instances of " + baseEvent.summary);
    var instances = instances_resp.items;
    instancesController.clear();
    for (i = 0; i < instances.length; i++) {
      var instance = instances[i];
      new Instance(instance)
    }
    $("#deleteall").unbind("click").click(delete_all_instances);
    instancesController.deleteAllLink.show();
    instancesController.title.show();
    instancesController.div.show();
    $('#events-div ul li').removeClass('event-active');
    $(event_li).addClass('event-active');
  }
}