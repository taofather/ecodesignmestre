$( document ).ready(function() {

    $body = $("body")
    $mainMenuContainer = $("#mainMenu-trigger");
    $header = $('#header')

    closeMenu = function () {
        if ($body.hasClass("mainMenu-open")) {
            $mainMenuContainer.find("button").toggleClass("toggle-active");
            $header.find("#mainMenu").css("max-height", 0);
            $body.removeClass("mainMenu-open")
        }
    };

    $(document).on("click", function(event){
        if(!$(event.target).closest("#mainMenu-trigger").length){
            closeMenu();
        }
    });


});