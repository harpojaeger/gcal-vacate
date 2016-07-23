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
        $('#calendar-select').selectmenu({
            renderItem: coloredItem
        });
        $('#submit').button();
        $('#search_content').show();
        $("#calendar-div").show();
    });


    $.widget("ui.selectmenu", $.ui.selectmenu, {
        options: {
            renderItem: null,
            renderMenu: null
        },

        _renderItem: function(ul, item) {
            if ($.isFunction(this.options.renderItem))
                return this.options.renderItem(ul, item);
            else
                return this._super(ul, item);
        },


    });

    coloredItem = function(ul, item) {
        var li = $('<li>');
        var div = $('<div>');
        $(div).css({
            'background-color': item.element.data('backgroundColor'),
            'display': 'inline'
        });
        $(div).html('&nbsp;');
        var a = $('<a>').html(item.label)
        $(li).append(div).append(a);

        return $(li).appendTo(ul);
    };


}

function Calendar(c) {
    var o = document.createElement("option");
    $(o).text(c.summary);
    $(o).attr("value", c.id);
    $(calendar_select).append(o);
    $(o).data({
        'backgroundColor': c.backgroundColor,
        'foregroundColor': c.foregroundColor
    });
}