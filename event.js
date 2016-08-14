function BaseEvent(event, instances_resp) {
  //These are attached to the event list item later on, allowing the function that lists instances to access them and output the instances.
  this.baseEventData = event;
  this.instances_resp = instances_resp;

  //Create the list item
  var event_list_item = $('<li>');

  //Create the triangle list marker
  var triangle = $('<span>').addClass('event-list-triangle ui-icon ui-icon-triangle-1-e');

  //Create the instances div
  var event_instances_div = $('<div>')
    .addClass('event-instances-div');
  var event_instances_ul = $('<ul>')
    .addClass('instances-ul')
    .appendTo(event_instances_div);

  //Create the deletion controls, which will include the selection controls.
  var event_deletion_controls = $('<div>')
    .addClass('event-deletion-controls');

  //Create the instance selection controls
  var select_all_link = $('<span>')
    .addClass('action-link instance-select-all')
    .text('all')
    .click(function() {
      console.log('Select all instances for deletion.');
      $(event_list_item)
        .find('span.ui-icon-minus')
        .click();
    });
  var select_none_link = $('<span>')
    .addClass('action-link instance-select-none')
    .text('none')
    .click(function() {
      console.log('Deselect all instances for deletion.');
      $(event_list_item)
        .find('span.ui-icon-check')
        .click();
    });
  //Put all the selection controls together
  var instance_selection_controls = $('<span>')
    .addClass('instance-selection')
    .append(
      'select (',
      select_all_link,
      ' | ',
      select_none_link,
      ')')
    .appendTo(event_deletion_controls);
  //Create the deletion link
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

  //Fetch recurrence information for the tooltip
  var RRule = rrulestr(this.baseEventData.recurrence[0]);
  var repeat_desc = RRule.toText();

  // Create the summary.  Clicking it reveals the events' instances.
  var summary = $("<span>")
    .text(this.baseEventData.summary)
    .prepend(triangle)
    .addClass('action-link')
    .click(function() {
      $('div.event-instances-div')
        .not($(this)
          .siblings('div.event-instances-div'))
        .slideUp();
      //Toggle the triangle and set any other open triangles to be closed.  This can probably be made cleaner.
      $('span.event-list-triangle').not(triangle)
        .removeClass('ui-icon-triangle-1-s')
        .addClass('ui-icon-triangle-1-e');
      $(triangle).toggleClass('ui-icon-triangle-1-e ui-icon-triangle-1-s');
      //Toggle the event instances div.
      $(event_instances_div).slideToggle();
      //Fade out the other events' deletion controls.
      $('#events-div ul li div.event-deletion-controls').not(event_deletion_controls).fadeOut();
      $(event_deletion_controls).fadeToggle()
        //Todo: is there any reason this can't be moved to where the controls are originally created?  Or to main.css?
        .css('display', 'inline');
    })
    //Create the tooltip with repeat information.
    .attr('title', repeat_desc)
    .tooltip({
      show: {
        duration: 500,
        delay: 500
      },
      tooltipClass: 'rrule-tooltip',
      track: true
    });

  // Attach all children to the list item and add it to the events ul
  $(event_list_item)
    .data('eventObject', this)
    .append(summary, event_deletion_controls, event_instances_div)
    //Todo: replace this with the variable from main.js
    .appendTo('#events_ul');
  //Create the instances listing for the event.  The instance request itself has already been run.
  listInstances(event_list_item);

  function listInstances(event_li) {
    //Retrieve the instances API response.
    var instances_resp = $(event_li).data('eventObject').instances_resp;
    //Retrieve the basic info for the base event.
    var baseEventData = $(event_li).data('eventObject').baseEventData;
    var instances = instances_resp.items;
    //Todo: check ui.js and other files to see if this can be deleted entirely (instances no longer have their own section).
    instancesController.clear();
    for (i = 0; i < instances.length; i++) {
      var instance = instances[i];
      new Instance(instance, event_instances_ul)
    }
    //Todo: check this for deletion.
    $("#deleteall").unbind("click").click(delete_all_instances);
    //Todo: check these for deletion as well.
    instancesController.deleteAllLink.show();
    instancesController.title.show();
    instancesController.div.show();
  }
}