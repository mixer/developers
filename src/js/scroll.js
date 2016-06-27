'use strict';

$(document).ready(function () {
    $('.rest-sidebar').each(function (i, el) {
        var json = el.dataset.scrollspy;
        var opts = json ? JSON.parse(json) : { container: 'body' };
        opts.target = '.rest-sidebar';
        $(opts.container).scrollspy(opts);
    });

    $('.rest-sidebar').each(function (i, el) {
        var json = el.dataset.scrollStick;
        var defaults = { parent: '.site-content', recalc_every: 500 };
        $(el).stick_in_parent(json ? JSON.parse(json) : defaults);
    });
});
