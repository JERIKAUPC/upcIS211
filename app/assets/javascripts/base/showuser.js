function cargar_usuario(id_u){
    var url="/api/v1/users/"+id_u;
    $( "#dat-user" ).fadeIn("fast");
    //document.getElementById("dat-user").style.display = "block";
    $.ajax({
          type: "GET",
          url: url,
          data: {},
          success: function(response){
              if (response.status == "SUCCESS") {
                 document.getElementById('dat-user-cont').innerHTML=""+bloque_ficha(response.data);
              } else {
                 document.getElementById('dat-user-cont').innerHTML="ERROR";
              }
              
          }
      });
}

function cerrar_ficha() {
    $( "#dat-user" ).fadeOut("slow");
}

function bloque_ficha(data){
    if ((data.picture=="") || (data.picture==null)){
        var imagen="/assets/welcome/usuario.png";
    } else {
        var imagen=data.picture;
    }
    return "<div class='tarjeta-datos'><p>Nombre: "+data.name+"</P><p>Nombre: "+data.phone+"</P><p>Correo: "+data.email+"</P></div><img class='show-avatar resize' src='"+imagen+"' />";
}

function cambiar_estado(did,ea){
    idpro="#load-cancel"+did;
    $(idpro).fadeIn("fast");
    var url="/api/v1/deals/"+did;
    var data = {};
 $.ajax({
          type: "PUT",
          url: url,
          data: data,
          success: function(response){
              if (response.status == "SUCCESS") {
                if (response.data.canceled == 0){
                    var nc="<i class='fa fa-square-o' aria-hidden='true'></i>";
                    }   else {
                    var nc="<i class='fa fa-check-square' aria-hidden='true'></i>";
                }
                 document.getElementById("load-cancel"+response.data.id).style.display = "none";
                 document.getElementById("est-cancelado"+response.data.id).innerHTML=""+nc;
              } else {
                 document.getElementById("est-cancelado"+response.data.id).innerHTML="ERROR";
              }
              
          }
      });
}
