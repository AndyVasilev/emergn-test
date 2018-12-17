$(document).ready(function() {
    $(".content-edit").on("click", function() {
      $(this).find('.click').addClass('edit');
      $(this).find('.buttons').removeClass('hide');
    });

});
