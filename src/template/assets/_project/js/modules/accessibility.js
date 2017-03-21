/* ========================================================================
* Accessibility helpers
* ======================================================================== */

'use strict';

var accessibility = (function ($) {
    var $target = $('a[target=_blank]');

    if($('body').attr('data-qg-accessibility') !== false) {
        var $target = $('*[target=_blank]');
        if(!$target.hasClass('qg-accessibility-off')) {
            if($target.attr('href') !== undefined) {
                if($.contains('.sr-only', $target) === false) {
                    console.log('3');
                    $target.append(' <span class="sr-only">(Opens in new window)</span> ');
                }
                if($target.attr('title') === undefined) {
                    $target.attr('title', 'Opens in new window');
                }
            }
        }
    }
})(jQuery);

module.exports = accessibility;
