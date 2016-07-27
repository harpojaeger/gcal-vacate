function BaseEvent(event, instances_resp) {
  this.baseEventData = event;
  this.instances_resp = instances_resp;

  /**Create the instances div **/
  var event_instances_div = $('<div>')
    .addClass('event-instances-div');
  var event_instances_ul = $('<ul>')
    .addClass('instances-ul')
    .appendTo(event_instances_div);

  /**Fetch recurrence information for the tooltip**/
  var RRule = rrulestr(this.baseEventData.recurrence[0]);
  var repeat_desc = RRule.toText();

  /** Create the summary**/
  var summary = $("<span>")
    .text(this.baseEventData.summary)
    .addClass('action-link')
    .click(function() {
      $('div.event-instances-div').
      not($(this)
          .siblings('div.event-instances-div'))
        .slideUp();
      $(event_instances_div).slideToggle();
      $('#events-div ul li span').not(this).removeClass('event-active');
      $(this).toggleClass('event-active');
    })
    .attr('title', repeat_desc)
    .tooltip({
      show: {
        duration: 500,
        delay: 500
      },
      tooltipClass: 'rrule-tooltip',
      track: true
    });

  /** Create the list item, append children & add it to the DOM **/
  var event_list_item = $('<li>')
    .data('eventObject', this)
    .append(summary, event_instances_div)
    .appendTo('#events_ul');
  listInstances(event_list_item)

  function listInstances(event_li) {

    var instances_resp = $(event_li).data('eventObject').instances_resp;
    var baseEventData = $(event_li).data('eventObject').baseEventData;
    var instances = instances_resp.items;
    console.log("Displaying " + instances.length + " instances of " + baseEventData.summary);
    instancesController.clear();
    for (i = 0; i < instances.length; i++) {
      var instance = instances[i];
      new Instance(instance, event_instances_ul)
    }
    $("#deleteall").unbind("click").click(delete_all_instances);
    instancesController.deleteAllLink.show();
    instancesController.title.show();
    instancesController.div.show();
  }
}