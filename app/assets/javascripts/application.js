// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, or any plugin's
// vendor/assets/javascripts directory can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file. JavaScript code in this file should be added after the last require_* statement.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require rails-ujs
//= require jquery3
//= require turbolinks
//= require base/helper
//= require base/popup
//= require base/form

$.ajaxSetup( {
    beforeSend: function ( xhr ) {
        xhr.setRequestHeader( 'X-CSRF-Token', $( 'meta[name="csrf-token"]' ).attr( 'content' ) );
    }
});

Popup.init();
Form.init();

function show_a(element){
    if (document.getElementById(element).style.display == 'block'){
        element="#"+element;
        $(element).slideUp(500);
        //document.getElementById(element).style.display = 'none';
    } else {
        element="#"+element;
        //$(element).fadeIn(1500);
        $(element).slideDown(500);
        //document.getElementById(element).style.display = 'block';
    }
    
}