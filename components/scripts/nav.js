/**
 * Created by heshamelmasry on 2017/05/26.
 */

var $;

$ = require('jquery');

var x = $("#myTopnav");

x.click(function () {

    if (x.hasClass("topnav")) {

        x.toggleClass("responsive");
    }
});




