(function ($) {
    'use strict';
    var datepicker = {
        component: $('.qg-datepicker'),
        rules: {
            maxM: 12, maxY: 120, 
            months = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
        },
        fields: {
            $dayField: $('.qg-datepicker-day'),
            $monthField: $('.qg-datepicker-month'),
            $yearField: $('.qg-datepicker-year') 
        },
        init: function init() {
            if (datepicker.component.length) {
                datepicker.fields.$dayField.bind('change', function () {
                    if ($(this).val() !== '' || undefined) {
                        if (!($(this).val() > datepicker.rules.maxD) && $(this).val() < 1) {
                            return true;
                        }
                    } else {
                        $dayField[0].setCustomValidity('Must be a valid day.');
                        return false;
                    }
                });
                datepicker.fields.$monthField.bind('change', function () {
                    if ($(this).val() !== '' || undefined) {
                        if () {
                            return true;
                        }
                    } else {
                        $dayField[0].setCustomValidity('Must be a valid day.');
                        return false;
                    }
                }); 
                datepicker.fields.$yearField.bind('change', function () {
                    if ($(this).val() !== '' || undefined) {
                        if (!($(this).val() < Date.now() + datepicker.rules.maxY)) {
                            return true;
                        }
                    } else {
                        $dayField[0].setCustomValidity('Must be a valid day.');
                        return false;
                    }
                });
            }
        }};
    datepicker.init();
})(jQuery);