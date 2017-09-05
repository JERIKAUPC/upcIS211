var Popup = {
    init: function() {
        this.open();
        this.close();
    },

    open: function( ) {
        $(document).on('click', '.popup-open', function(e) {
            e.preventDefault();
            $('.popup').removeClass('open');
            $('.popup-'+ $(this).data('popup')).addClass('open');
        });
    },

    close: function() {
        $(document).on('click', '.popup .close', function(e) {
            e.preventDefault();
            $(this).parent().parent().parent().removeClass('open');
        });
    }
}
