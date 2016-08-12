function BaseEvent(event, instances_resp) {
  this.baseEventData = event;
  this.instances_resp = instances_resp;

  /**Create the list item **/
  var event_list_item = $('<li>');

  /**Create the triangle list marker **/
  var triangle = $('<span>').addClass('event-list-triangle ui-icon ui-icon-triangle-1-e');

  /**Create the instances div **/
  var event_instances_div = $('<div>')
    .addClass('event-instances-div');
  var event_instances_ul = $('<ul>')
    .addClass('instances-ul')
    .appendTo(event_instances_div);

  /** Create the deletion controls **/
  var event_deletion_controls = $('<div>')
    .addClass('event-deletion-controls');

  var select_all_link = $('<span>')
    .addClass('action-link instance-select-all')
    .text('all')
    .click(function() {
      debug('Select all instances for deletion.');
      $(event_list_item)
        .find('span.ui-icon-minus')
        .click();
    });
  var select_none_link = $('<span>')
    .addClass('action-link instance-select-none')
    .text('none')
    .click(function() {
      debug('Deselect all instances for deletion.');
      $(event_list_item)
        .find('span.ui-icon-check')
        .click();
    });

  var instance_selection_controls = $('<span>')
    .addClass('instance-selection')
    .append(
      'select (',
      select_all_link,
      ' | ',
      select_none_link,
      ')')
    .appendTo(event_deletion_controls);

  var delete_link = $('<span>')
    .addClass('action-link')
    .text('delete')
    .prepend(
      $('<span>')
      .addClass('ui-icon ui-icon-trash')
      .html('&nbsp;'))
    .appendTo(event_deletion_controls)
    .click(function() {
      displayDeleteConfirmation(event_list_item);
    });

  /**Fetch recurrence information for the tooltip**/
  var RRule = rrulestr(this.baseEventData.recurrence[0]);
  var repeat_desc = RRule.toText();

  /** Create the summary**/
  var summary = $("<span>")
    .text(this.baseEventData.summary)
    .prepend(triangle)
    .addClass('action-link')
    .click(function() {
      $('div.event-instances-div')
        .not($(this)
          .siblings('div.event-instances-div'))
        .slideUp();

      $('span.event-list-triangle').not(triangle)
        .removeClass('ui-icon-triangle-1-s')
        .addClass('ui-icon-triangle-1-e');
      $(triangle).toggleClass('ui-icon-triangle-1-e ui-icon-triangle-1-s');

      $(event_instances_div).slideToggle();
      $('#events-div ul li span').not(this).removeClass('event-active');

      $('#events-div ul li div.event-deletion-controls').not(event_deletion_controls).fadeOut();
      $(event_deletion_controls).fadeToggle()
        .css('display', 'inline');
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

  /** Append children to the list item & add it to the DOM **/
  $(event_list_item)
    .data('eventObject', this)
    .append(summary, event_deletion_controls, event_instances_div)
    .appendTo('#events_ul');
  listInstances(event_list_item);

  function listInstances(event_li) {

    var instances_resp = $(event_li).data('eventObject').instances_resp;
    var baseEventData = $(event_li).data('eventObject').baseEventData;
    var instances = instances_resp.items;
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