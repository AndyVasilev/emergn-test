$(document).ready(function () {
    function cleanUp(rollback = true) {
        $('.buttons').remove();
        $("[data-editable][contenteditable]").each(function () {
            if ($(this).attr('data-old-value') && rollback) $(this).html($(this).attr('data-old-value'));
            $(this).removeAttr('data-old-value').removeAttr('contenteditable');
        })
    }

    $("[data-editable]").on("click", function () {

        if ($(this).attr('contenteditable')) return;
        cleanUp();
        var buttons = $('body>.buttons-template').clone().removeClass('buttons-template').addClass('buttons');
        $(this).attr('data-old-value', $(this).text()).attr('contenteditable', 'true').after(buttons);

        $(buttons).on('click', '.save', function (e) {
            cleanUp(false);
        });

        $(buttons).on('click', '.cancel', function (e) {
            cleanUp();
        });
    });

});
