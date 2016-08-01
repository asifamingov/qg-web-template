"use strict";
var mobileNav = (function () {
    var $sitenav = $("#qg-site-nav");
    var $br = $("#qg-breadcrumb>.qg-inner");
    var $tools = $(".qg-tools");

    function interactions() {
        $("#qg-show-menu").on("click" , function () {
            $("#qg-breadcrumb>.qg-inner , #qg-site-nav").slideToggle("fast");
        });
        $("#qg-show-search").on("click" , function () {
            $(".qg-tools").slideToggle("fast");
        });
        $(window).resize(function () {
            if ($(window).width() < 768) {}
            else if ($(window).width() >= 768 &&  $(window).width() <= 992) {
                if($tools.is(":visible")){
                    $tools.hide("fast");
                }
            }
            else  {
                if($sitenav.is(":hidden")){
                    $sitenav.slideToggle("fast");
                    $br.slideToggle("fast");
                }
                if($tools.is(":hidden")){
                    $tools.slideToggle("fast");
                }
            }
        });
    }
    return {
        interactions : interactions
    }
})();

module.exports = mobileNav;