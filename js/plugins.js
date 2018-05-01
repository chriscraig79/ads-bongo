// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// jQuery/helper plugins

// Datepicker
var now = Date.now();
var date = new Date();
var currMonth = date.getMonth();
var endDate = date.setMonth(currMonth + 2);

$('[data-toggle="datepicker"]').datepicker({
    format: 'dd-mm-yyyy',
    language: 'en-GB',
    inline: true,
    container: '.datepicker-wrapper',
    autoPick: true,
    startDate: now,
    endDate: new Date(endDate),
    filter: function(date) {
        if (date.getDay() === 6 || date.getDay() === 0 ) {
          return false; // Disable Saturdays & Sundays
        }
    }
});

// Form validator
$(function() {
    $.fn.validator.setDefaults({
        trigger: 'input change',
        success: function(e) {
            console.log(e.type, e.value, e.rule);
            $(this).closest('.form__field').removeClass('has-error').find('.help-block').empty();
        },
        error: function(e) {
            console.log(e.type, e.value, e.rule);
            $(this).closest('.form__field').addClass('has-error').find('.help-block').text(e.message);
        }
    });

    var $form = $('.has-form form');

    $.each($form, function() {
        var $form = $(this);
        var $inputs = $form.find('input');
        var $textarea = $form.find('textarea');
        var $submit = $form.find('button');

        $inputs.validator();
        $textarea.validator();

        $submit.click(function(e) {
            var validity = [];

            $inputs.each(function() {
                validity.push($(this).validator('isValid'));
            });

            $textarea.each(function() {
                validity.push($(this).validator('isValid'));
            });

            if ($.inArray(false, validity) !== -1) {
                e.preventDefault();
                return false;
            }
        });
    });


});
