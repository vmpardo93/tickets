$(".js-delete").on("click", function(){
    var x=$(this).attr("valor");
    console.log($(this).attr("data-name"));
    var nombre=$(this).attr("data-name");
    $("#elemento").html(nombre);
    $(".js-deleteCrud").attr("valor",x);
    console.log($(this).attr("data-api"));
    if ($(this).attr("data-api")=="descuentos") {
        console.log("data api class");
        $("#hederModalCreate").removeClass("d-none");
        $("#bodyModalCreate").removeClass("d-none");
        $("#hederModalDelete").addClass("d-none");
        $("#bodyModalDelete").addClass("d-none");
        $("#footerModalDelete").addClass("d-none");
    }
    else if ($(this).attr("data-api")=="delete") {
        $("#hederModalCreate").addClass("d-none");
        $("#bodyModalCreate").addClass("d-none");
        $("#hederModalDelete").removeClass("d-none");
        $("#bodyModalDelete").removeClass("d-none");
        $("#footerModalDelete").removeClass("d-none");
    }
    else if ($(this).attr("data-api")=="zonas") {
        apis_get_zonas_x_empresarios($(this));
    }
});

function deleteAlert(response){
	location.reload();
}

$(".js-deleteCrud").on('click', function(){
  var url=URLAPIS+$(this).attr("valor");
    console.log(url);
    if ($(this).attr("valor").split("/")[2] == "descuentoDel"){
            infoToSend = {
        url:url,
        method:"DELETE",
        cache: false,
    };
    }
    else{
        infoToSend = {
        url:url,
        method:"PATCH",
        data:{
            'estado':"3",
        },
        cache: false,
    };    
    }
    api_sendToApi(infoToSend,deleteAlert,apis_failed);
});

function apis_Delete_Locations(response, method){
    var url= URLAPIS+'/api-destinos/destinos/'+response+'/';
    infoToSend = {
    url:url,
    method:method,
    data:{
        'direccion': $('#direccionNew_'+response).val(),
        'nombre': $('#valueNew_'+response).val(),
        'descripcion' : $('#valueNew_'+response).val(),
        'barrio': $('#barrioNew_'+response).val(),
        'tipoDestino' : 2,
        'estado' : 1,
        'pasajeroId':$("#idpassenger").val(),
        'claseDestinoId': $("#clase_"+response).val(),
        'aK': null,
        },
    cache: false,
    };
    api_sendToApi(infoToSend,apisAddLocations,apis_failed);
}
 
function apis_get_zonas_x_empresarios(response){
    $("#name_empresa").html(response.attr("data-name"));
    $("#fatherModal").html("");
    $("#fatherModal1").html("");
    infoToSend = {
        url:URLAPIS+'/api-empresarios/zonas/'+response.attr("data-empresario")+'/',
        cache: false,
    };
    api_sendToApi(infoToSend,apis_Show_zonas_x_empresario,apis_failed);
}
function apis_Show_zonas_x_empresario(response){
    $('[valueClone]').attr("valueClone", 0);
    console.log("entro");
    console.clear();
    console.log(response)
    for (var i = 0; i < response.length; i++){
        custom_generalClone("locations2", "fatherModal",false,response[i].id);
        $("#zona_name_clone"+response[i].id).html(response[i].ciudad);
        console.log(response[i].ciudad);
    }
    effectFocusInput();
}