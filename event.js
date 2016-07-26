function BaseEvent(event, instances_resp) {
  this.baseEventData = event;
  this.instances_resp = instances_resp;

  /** Create the summary**/
  var summary = $("<span>")
    .text(this.baseEventData.summary)
    .addClass('action-link')
    .click(showInstances);

  /**Create the "further info" div**/
  var RRule = rrulestr(this.baseEventData.recurrence[0]);
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
    .data('eventObject', this)
    .append(summary, info_button, info_div)
    .appendTo('#events_ul');

  function showInstances() {
    var event_li = this.parentNode;
    var instances_resp = $(event_li).data('eventObject').instances_resp;
    var baseEventData = $(event_li).data('eventObject').baseEventData;
    debug($(event_li).data());
    var instances = instances_resp.items;
    console.log("Displaying " + instances.length + " instances of " + baseEventData.summary);
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