// function to check if whole page is loaded
$(document).ready(function () {
    // function for stylish scrollbar
    $("#sidebar").mCustomScrollbar({
        theme: "minimal"
    });

    // function for deactivating the sidebar on click of dismiss button
    $('#dismiss, .overlay').on('click', function () {
        $('#sidebar').removeClass('active');
        $('.overlay').removeClass('active');
    });

    // function to display or activate sidebar on click of menu button
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').addClass('active');
        $('.overlay').addClass('active');
        $('.collapse.in').toggleClass('in');
        $('a[aria-expanded=true]').attr('aria-expanded', 'false');
    });
});
