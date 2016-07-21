$(document).ready(function() {
    debug("Document ready.")
    $("#submit").click(prepareSearch);
    var datepickerOptions = {
        dateFormat: 'yy-mm-dd',
        changeMonth: true,
        changeYear: true,
        showOtherMonths: true,
        selectOtherMonths: true,
    };
    $(function() {
        var dateFormat = "yy-mm-dd",
            from = $("#start")
            .datepicker(datepickerOptions)
            .on("change", function() {
                to.datepicker("option", "minDate", getDate(this));
            }),
            to = $("#end").datepicker(datepickerOptions)
            .on("change", function() {
                from.datepicker("option", "maxDate", getDate(this));
            });

        function getDate(element) {
            var date;
            try {
                date = $.datepicker.parseDate(dateFormat, element.value);
            } catch (error) {
                date = null;
            }

            return date;
        }
    });
    events = new eventsController();
    instances = new instancesController();

});