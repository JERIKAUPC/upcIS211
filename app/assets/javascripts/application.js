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

function save_deal(){
    var datosjs = {
        user_id: getCookie("userID"),
        offer_id: getCookie("offerID"),
        in_date: "2017-09-22",
        out_date: "2018-01-15"
    };
    var url="/api/v1/deals";
    $.ajax({
          type: "POST",
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


function save_offer(){
    var url="/api/v1/offers";
    var user_id = getCookie("userID");
    var address = document.forms[0]['address'].value;
    var latitude = document.forms[0]['lat'].value;
    var longitude = document.forms[0]['lng'].value;
    var quantity = document.forms[0]['quantity'].value;
    var days = document.forms[0]['days'].value;
    var check_in_time = document.forms[0]['check_in_time'].value;
    var check_out_time = document.forms[0]['check_out_time'].value;
    var is_independent = document.forms[0]['is_independent'].value;
    var leave_keys = document.forms[0]['leave_keys'].value;
    var move_car = document.forms[0]['move_car'].value;
    var image_1 = document.forms[0]['image_1'].value;
    var image_2 = document.forms[0]['image_2'].value;
    var image_entrance = document.forms[0]['image_entrance'].value;
    var price = document.forms[0]['price'].value;
    var access_form_id = document.forms[0]['access_form_id'].value;
    var property_type_id = document.forms[0]['property_type_id'].value;
    var vehicle_type_id = document.forms[0]['vehicle_type_id'].value;
    
    
    var datosjs = {
        user_id: user_id,
        address: address,
        latitude: latitude,
        longitude: longitude,
        quantity: quantity,
        days: days,
        check_in_time: check_in_time,
        check_out_time: check_out_time,
        is_independent: is_independent,
        leave_keys: leave_keys,
        move_car: move_car,
        image_1: image_1,
        image_2: image_2,
        image_entrance: image_entrance,
        price: price,
        access_form_id: access_form_id,
        property_type_id: property_type_id,
        vehicle_type_id: vehicle_type_id
        
      };
      document.getElementById("loading").style.display = "block";
      document.getElementById("error").style.display = "none";
      document.getElementById("ok").style.display = "none";
      $.ajax({
          type: "POST",
          url: url,
          data: datosjs,
          success: function(response){
              document.getElementById("loading").style.display = "none";
              if (response.status == "SUCCESS") {
                 document.getElementById("ok").style.display = "block"; 
              } else {
                  document.getElementById("error").style.display = "block";
              }
              
          },
          error: function(response){
              document.getElementById("loading").style.display = "none";
              document.getElementById("error").style.display = "block";
          }
      });

    
}
