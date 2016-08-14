function list_calendars() {
  console.log("Listing calendars");
  //We're only interested in calendars to which the user has write access.
  var request = gapi.client.calendar.calendarList.list({
    "minAccessRole": "writer"
  });

  request.execute(function(resp) {
    var calendars = resp.items;
    calendar_select = $("#calendar-select");
    for (i = 0; i < calendars.length; i++) {
      var calendar = calendars[i];
      //Add fetched calendars to the select.
      new Calendar(calendar);
    }
    console.log("Retrieved " + calendars.length + " calendars.");
    //Create the nicely-styled colored menu item using a custom widget.
    $('#calendar-select').coloredMenu({
      renderItem: coloredItem
    });
    $('#submit')
      .button({
        icon: 'ui-icon-search'
      })
      .click(prepareSearch);
    //Now that we've fetched the calendars and created the custom menu, show all the controls.
    containerController.div.show();
    searchController.div.show();
  });

  //Custom widget to make the select menu.
  $.widget("custom.coloredMenu", $.ui.selectmenu, {
    options: {
      renderItem: null
    },
    _renderItem: function(ul, item) {
      if ($.isFunction(this.options.renderItem))
        return this.options.renderItem(ul, item);
      else
        return this._super(ul, item);
    },
  });
  //Custom function to return a li styled the way we want.
  coloredItem = function(ul, item) {
    var wrapper_div = $('<div>');
    var color_div = $('<div>')
      .addClass('cal-select-color-box')
      //Here's the swatch: retrieve the calendar background color from the option menu.
      .css({
        'background-color': item.element.data('backgroundColor'),
      })
      .html('&nbsp;&nbsp;&nbsp;&nbsp;');
    var a = $('<a>').html(item.label)
    $(wrapper_div).append(color_div, a);
    var li = $('<li>').append(wrapper_div);
    return $(li).appendTo(ul);
  };
}
//Function to add calendars to the basic select.
function Calendar(c) {
  var o = $('<option>')
    .text(c.summary)
    .attr("value", c.id)
    //Attach data to the option, which the custom widget will later retrieve to make color swatches.
    .data({
      'backgroundColor': c.backgroundColor,
      'foregroundColor': c.foregroundColor
    })
    .appendTo(calendar_select);
}