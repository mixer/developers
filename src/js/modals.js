'use strict';

$(document).ready(function () {
    // open modal on hashes like #_action_get
    var activeModalEl = null;
    $(window).bind('hashchange', function () {
        if (activeModalEl) {
            activeModalEl.modal('hide');
        }

        var anchorId = document.location.hash.substr(1); // strip #
        var element = $('#' + anchorId);

        // do we have such element + is it a modal?  --> show it
        if (element.length && element.hasClass('modal')) {
            element.modal('show');
            activeModalEl = element;
        }
        // for links to pages we should "flash" the highlighted region
        var panel = element.closest('.panel');
        if (panel.length > 0) {
            panel.addClass('panel-flash');

            setTimeout(function () {
                panel.removeClass('panel-flash');
            }, 3000);
        }
    });

    // execute hashchange on first page load
    $(window).trigger('hashchange');

    $('.modal').on('hidden.bs.modal', function () {
        try {
            if (history && history.replaceState) {
                history.replaceState({}, '', '#');
            }
        } catch (e) {
            /* Do Nothing */
        }
    });
});
