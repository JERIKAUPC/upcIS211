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
//= require base/map-icons
//= require turbolinks
//= require base/helper
//= require base/popup
//= require base/form
//= require base/google-map

$.ajaxSetup( {
    beforeSend: function ( xhr ) {
        xhr.setRequestHeader( 'X-CSRF-Token', $( 'meta[name="csrf-token"]' ).attr( 'content' ) );
    }
});

Popup.init();
Form.init();

function show_a(element){
    $("#"+ element).slideToggle("fast");
}

function change_params(){
    var url="/api/v1/users/"+getCookie("userID");
    var vname = document.forms[0]['name'].value;
    var vemail = document.forms[0]['email'].value;
    var vdni = document.forms[0]['dni'].value;
    var vphone = document.forms[0]['phone'].value;
    var vgender = document.forms[0]['gender'].value;
    var vbirthday = document.forms[0]['birthday'].value;
    var vpicture = document.forms[0]['picture'].value;

    var datosjs = {
        name: vname,
        email: vemail,
        dni: vdni,
        phone: vphone,
        gender: vgender,
        birthday: vbirthday,
        picture: vpicture
      };
      document.getElementById("loading").style.display = "block";
      document.getElementById("error").style.display = "none";
      document.getElementById("ok").style.display = "none";
      $.ajax({
          type: "PUT",
          url: url,
          data: datosjs,
          success: function(response){
              document.getElementById("loading").style.display = "none";
              if (response.status == "SUCCESS") {
                 document.getElementById("ok").style.display = "block"; 
              } else {
                  document.getElementById("error").style.display = "block";
              }
              
          }
      });

    
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function show_offer(n){
    setCookie("offerID",n,365);
}