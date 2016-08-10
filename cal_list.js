function list_calendars() {
  debug("Listing calendars");
  var request = gapi.client.calendar.calendarList.list({
    "minAccessRole": "writer"
  });

  request.execute(function(resp) {
    var calendars = resp.items;
    calendar_select = $("#calendar-select");
    for (i = 0; i < calendars.length; i++) {
      var calendar = calendars[i];
      new Calendar(calendar);
    }
    debug("Retrieved " + calendars.length + " calendars.");
    $('#calendar-select').coloredMenu({
      renderItem: coloredItem
    });
    $('#submit')
      .button( {icon: 'ui-icon-search'} )
      .click(prepareSearch);
    containerController.div.show();
    searchController.div.show();
  });


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
  
  coloredItem = function(ul, item) {
    var wrapper_div = $('<div>');
    var color_div = $('<div>')
    .addClass('cal-select-color-box')
    .css({
        'background-color': item.element.data('backgroundColor'),
      })
      .html('&nbsp;&nbsp;&nbsp;&nbsp;');
    var a = $('<a>').html(item.label)
    $(wrapper_div).append(color_div,a);
    var li = $('<li>').append(wrapper_div);
    return $(li).appendTo(ul);
  };


}

function Calendar(c) {
  var o = $	('<option>')
    .text(c.summary)
    .attr("value", c.id)
    .data({
      'backgroundColor': c.backgroundColor,
      'foregroundColor': c.foregroundColor
    })
    .appendTo(calendar_select);
}