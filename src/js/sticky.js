$(document).ready(function () {
    $('[data-scroll-stick]').each(function (i, el) {
        var opts = el.dataset.scrollStick;
        var defaults = { parent: '.site-content', recalc_every: 500 };
        $(el).stick_in_parent(opts ? JSON.parse(opts) : defaults);
    });
});
