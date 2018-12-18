$(document).ready(function () {
    function cleanUp(rollback = true) {
        $('.buttons').remove();
        $("[data-editable][contenteditable]").each(function () {
            if ($(this).attr('data-old-value') && rollback) $(this).html($(this).attr('data-old-value'));
            $(this).removeAttr('data-old-value').removeAttr('contenteditable');
        })
    }

    $('body').on("click", "[data-editable]", function () {

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

    $('body').on("click", ".skill-items>.skill-item>.cancel", function () {
        $(this).parents('.skill-item').remove();
    });
    $('body').on("click", '.add-skill .save', function () {
        var items = $('.skill-items');
        var skillInput = $(this).parents('.add-skill').find('input.add');
        var levelSelect = $(this).parents('.add-skill').find('select');
        var skill = skillInput.val().trim();
        var level = levelSelect.val().trim();
        var found = false;
        items.find('.skill-item').each(function (i) {
            if ($(this).data('skill') && $(this).data('skill').toString().toLowerCase() === skill.toLowerCase()) {
                found = true;
                $(this).attr('data-level', level);
            }
        });
        if (!found) {
            var skillNode = $('.skill-item-template').clone()
                .removeClass('skill-item-template')
                .addClass('skill-item')
                .attr('data-skill', skill)
                .attr('data-level', level);
            skillNode.find('span:first-child').html(skill);

            $('.skill-items').append(skillNode);
        }
        skillInput.val('');

    });

    $('body').on('click', '[data-action=print]', function () {
        if (window.print) {
            window.print();
        } else {
            var WebBrowser = '<OBJECT ID="WebBrowser1" WIDTH=0 HEIGHT=0 CLASSID="CLSID:8856F961-340A-11D0-A96B-00C04FD705A2"></OBJECT>';
            document.body.insertAdjacentHTML('beforeEnd', WebBrowser);
            WebBrowser1.ExecWB(6, 2);//Use a 1 vs. a 2 for a prompting dialog box WebBrowser1.outerHTML = "";
        }
    });

});
