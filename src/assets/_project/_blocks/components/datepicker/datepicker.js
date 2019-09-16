(function ($) {
    'use strict';
    var datepicker = {
        el: $('.qg-datepicker'),
        rules: { 
            maxD: 31, 
            maxM: 12, 
            maxY: 120, 
            months = [
                31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
            ]
        },
        dayField: $('.qg-datepicker-day'),
        monthField: $('.qg-datepicker-month'),
        yearField: $('.qg-datepicker-year'),
        template: '<input class="qg-datepicker-day" value="" size="2" minlength="2" maxlength="2" placeholder="DD" required>\
                   <input class="qg-datepicker-month" value="" size="2" minlength="2" maxlength="2" placeholder="MM" required>\
                   <input class="qg-datepicker-year" value="" size="4" minlength="4" maxlength="4" placeholder="YYYY" required>',

        init: function init() {
            if (datepicker.el.length) {
                $(this.el).empty().append(this.template);

                //Bind days and set custom validity
                datepicker.dayField.bind('change', function () {
                    if ($(this).val() !== '' || undefined) {
                        if ($(this).val() < datepicker.rules.maxD && $(this).val() > 0) {
                            return true;
                        }
                    } else {
                        $dayField[0].setCustomValidity('Must be a valid day.');
                        return false;
                    }
                });

                //Bind months and set custom validity
                datepicker.monthField.bind('change', function () {
                    if ($(this).val() !== '' || undefined) {
                        if ($(this).val() < datepicker.rules.maxM && $(this).val() > 0) {
                            return true;
                        }
                    } else {
                        $dayField[0].setCustomValidity('Must be a valid month.');
                        return false;
                    }
                }); 

                //Bind years and set custom validity
                datepicker.yearField.bind('change', function () {
                    if ($(this).val() !== '' || undefined) {
                        if ($(this).val() < datepicker.rules.maxY && $(this).val() > 0) {
                            return true;
                        }
                    } else {
                        $dayField[0].setCustomValidity('Must be a valid year.');
                        return false;
                    }
                });
            }
        }};
    datepicker.init();
})(jQuery);
  