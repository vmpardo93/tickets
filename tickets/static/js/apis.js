//ID CLIENTE GOOGLE SIGN IN DIANA 54807823596-qd3oseomemastj497d6t46h2p6s03ckm.apps.googleusercontent.com
//S E C R E T D I A N A G O O G L E: BV3VaZorIgc9bQk-bpL0WpIf
// ruta de cors *://*/*
/**
	* @fileoverview		{@link apis}
	* @version			0.1
	* @author			Alexander.Martinez<alexander@eurekadms.com>
	* @copyright		www.eurekadms.co
	* @requires			jQuery
	* @file
	* La fuente (o el archivo) apis contiene todas las funciones
	* relacionadas con la consulta desde la web al servidor.
	* <br>
	
*/

/*
	* Declaracion de variables y constantes
*/
/**
	* 	@const {string} URLAPIS Dirección del servidor remoto con los API.
*/
// const URLAPIS='http://104.198.130.158:8007';
const URLAPIS='http://78.46.69.39:8007';
var useruid;
var userpk;
var tokenreset;

/**
 	* @function sendToApi: 
 	* 
*/

//obtiene el token
function csrfSafeMethod(method) {
    // these HTTP methods do not require CSRF protection
    return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

var csrftoken = getCookie('csrftoken');

//funcion general para llamar apis
function api_sendToApi(filters,sendFunction,sendErrorFunction){
	var method='';
	var async='';
	if (filters.method!=null){
		method=filters.method;
	}else{
		method='GET';
	}
	if (filters.cache!=null){
		cache=filters.cache;
	}else{
		cache=true;
	}
	if (sendErrorFunction==null){
		errorFunction=apis_failed;
	}else{
		errorFunction=sendErrorFunction;
	}
	if (filters.async!=null){
		async=filters.async;
	}else{
		async=true;
	}
	$.ajax({
		dataType:'json',
	    method: method,
	    async: async,
	    cache:cache,
	    data: filters.data,
	    url: filters.url,
	    //headers: filters.headers,
        beforeSend: function(xhr, settings) {
        	xhr.url = settings.url;
            if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
                xhr.setRequestHeader("X-CSRFToken", csrftoken );
            }
        }, 
	    success: function(response){ sendFunction(response, filters.parameter); }
    }).fail(errorFunction);
}

function apis_failed(response){
    let AlertText='';
    let Obj= response.responseJSON;
    if(response.status != 0){
        for (var key in Obj){
            if (String(Obj[key]).includes('This field may not be blank.') || String(Obj[key]).includes('Este campo no puede estar en blanco.')) {
                AlertText += ' * ' + key + ' : ' + 'Este campo no puede estar vacio. ' + "\n";
            }
            else {
                AlertText += JSON.stringify(Obj);
            }

        }
        alert(AlertText);
    }
    else{
        alert("Error por favor revise su conexión con internet");
    }

    if (response.url.indexOf("/api-usuarios/sendCodeSMS") >= 0){
        $("#btnreset_master").prop('disabled', false);
        $("#btnreset_master").children('span').addClass('d-none');
    }
    else if (response.url.indexOf("/api-usuarios/validateCodeSMS") >= 0){
        $("#btncodereset_master").prop('disabled', false);
        $("#btncodereset_master").children('span').addClass('d-none');
    }
    else if (response.url.indexOf('/rest-auth/password/reset/confirm/') >= 0){
        $("#btnconfirm_master").prop('disabled', false);
        $("#btnconfirm_master").children('span').addClass('d-none');
    }
}
$(document).ready(function(){
	menuOcultar();
	if(window.location.pathname==""){
		console.log("entro")
		infoToSend = {
			url:URLAPIS+'/api-categorias/subcategorias/'+$("#category").val(),
			cache: false,
		};
		api_sendToApi(infoToSend,apisShowSubcategory,apis_failed);
	 }
});

$("#category").on('change', function(){
    infoToSend = {
		url:URLAPIS+'/api-categorias/subcategorias/'+$(this).val(),
		cache: false,
	};
    api_sendToApi(infoToSend,apisShowSubcategory,apis_failed);
});

function apisGetSubcategory(response){
	infoToSend = {
		url:URLAPIS+'/api-categorias/subcategorias/'+$(this).val(),
		cache: false,
	};
    api_sendToApi(infoToSend,apisShowSubcategory,apis_failed);
}

function apisShowSubcategory(response){
    $("#subcategory").html("");
    $("#subcategory").append('<option value="0">Seleccionar</option>');
    for(let i = 0; i<response.length;i++){
       $("#subcategory").append('<option value="'+response[i].id+'">'+response[i].nombre+'</option>');
    }
}

$("#subcategory").on('change', function(){
    infoToSend = {
        url:URLAPIS+'/api-referencias/referencias/'+$(this).val(),
        cache: false,
    }
    api_sendToApi(infoToSend,apisShowReferences,apis_failed);
})

function apisShowReferences(response){
    $("#reference-promotion").html("");
    $("#reference-promotion").append('<option value="0">Seleccionar</option>');
    for(let i = 0; i<response.length;i++){
        $("#reference-promotion").append('<option value="'+response[i].id+'">'+response[i].nombre+'</option>');
    }
}

$("#reference-promotion").on('change', function(){
    infoToSend = {
        url:URLAPIS+'/api-suscripciones/suscripciones/'+$(this).val(),
        cache: false,
    }
    api_sendToApi(infoToSend,apisShowSuscriptions,apis_failed);
})

function apisShowSuscriptions(response){
    $("#suscription").html("");
    $("#suscription").append('<option value="0">Seleccionar</option>');
    for(let i = 0; i<response.length;i++){
        $("#suscription").append('<option value="'+response[i].id+'">'+response[i].nombre+'</option>');
    }
}

$("#empresario").on('change', function(){
    infoToSend = {
        url:URLAPIS+'/api-empresarios/empresarioProductosFilter/'+$(this).val(),
        cache: false,
    }
    api_sendToApi(infoToSend,referencias_select,apis_failed);
})

function referencias_select(response){
    $(".js-not-reference").html("");
    $(".js-not-reference").append('<option value="0">Seleccionar</option>');
    for(let i = 0; i<response.referencia.length;i++){
        $(".js-not-reference").append('<option value="'+response.referencia[i].id+'">'+response.referencia[i].nombre+'</option>');
    }
}

$("#reference").on('change', function(){
    infoToSend = {
        url:URLAPIS+'/api-empresarios/empresarioProductosFilter/'+$(this).val(),
        cache: false,
    }
    api_sendToApi(infoToSend,references,apis_failed);
})

function references(response){
    $("#empresario").html("");
    $("#empresario").append('<option value="0">Seleccionar</option>');
    for(let i = 0; i<response[0].referencia.length;i++){
        $("#empresario").append('<option value="'+response[0].referencia[i].id+'">'+response[0].referencia[i].nombre+'</option>');
    }
}

function deleteAlert(response){
	alert("record deleted successfully");
	location.reload();
}

$(".js-eliminarCrud").on('click', function(){
	console.log(URLAPIS+$(this).attr("valor"));
    infoToSend = {
		url:URLAPIS+$(this).attr("valor"),
		cache: false, 
	};
    api_sendToApi(infoToSend,deleteAlert,apis_failed);

});

function apis_getReferenceProduct(response){
	$("#fatherModal").html("");
	$("#fatherModal1").html("");
	$("#idproduc").val(response);
	infoToSend = {
        url:URLAPIS+'/api-suscripciones/suscripciones/'+response+'/',
		cache: false,
	};
    api_sendToApi(infoToSend,apisShowReferenceProduct,apis_failed);
}

function apisShowReferenceProduct(response){
	$('[valueClone]').attr("valueClone", 0);
	console.log("entro");
	console.log(response)
	for (var i = 0; i < response.length; i++){
		custom_generalClone("referenceProduct", "fatherModal",false,response[i].id);
		$("#nameRef_clone"+response[i].id).val(response[i].nombre);
		$("#price_clone"+response[i].id).val(response[i].precio);
		$("#stock_clone"+response[i].id).val(response[i].stock);
		//$("#estado_clone"+response[i].id + "[value="+ response[i].estado +"]").attr("selected",true);
		$("#estado_clone"+response[i].id+" [value="+response[i].estado +"]").attr("selected",true);
		console.log(response[i].estado)
	}
	effectFocusInput();
}

function apis_post_put_Reference(response, method){
	var url= URLAPIS+'/api-suscripciones/suscripcion/';
	var estado= $('#estado_'+response).val(); 
	console.log(estado)
	if(method== "PUT"){
		url= url+response.split("clone")[1]+"/";
	}
	if(method== "DELETE"){
		url= url+response.split("clone")[1]+"/";
		method = "PUT";
		estado = 10;
	}
	infoToSend = {
        url:url,
        method:method,
        data:{
			'nombre': $('#nameRef_'+response).val(),
			'precio': $('#price_'+response).val(),
			'stock': $('#stock_'+response).val(),
			'estado': estado,
			'referencia': $("#idproduc").val(),
		},
		cache: false,
	};
    api_sendToApi(infoToSend,apisAddReference,apis_failed);
}

function apisAddReference(response){
	alert("guardo con exito");
	apis_getReferenceProduct($("#idproduc").val());
}


$(".js-eliminarCrud").on('click', function(){
	console.log(URLAPIS+$(this).attr("valor"));
    infoToSend = {
		url:URLAPIS+$(this).attr("valor"),
		cache: false, 
	};
    api_sendToApi(infoToSend,apisShowAlertDelete,apis_failed);

});

function effectFocusInput(){
 $('.form-control').on('focusout',function(){
      changeState($(this));
    });	
 $('.form-control').each(function(){
      changeState($(this));
    });
}
function apis_getDiscountsReference(response){
	console.clear();
	console.log(response);
  $("#fatherModal").html("");
  $("#fatherModal1").html("");
  $("#idSuscrip").val(response);
  console.log($("#idSuscrip").val(response));
  infoToSend = {
        url:URLAPIS+'/api-descuentos/descuentosAll/'+response+'/',
    cache: false,
  };
    api_sendToApi(infoToSend,apisShowDiscountsReference,apis_failed);
}
function apisShowDiscountsReference(response){
	console.log(response)
  $('#discountsNew').attr("valueClone", 0);
  for (var i = 0; i < response.length; i++){
    custom_generalClone("discounts", "fatherModal",false,response[i].id);
    //console.log(response[i].valor);
    $("#valueDis_clone"+response[i].id).val(response[i].valor);
    $("#periodsDis_clone"+response[i].id+" [value="+response[i].periodoSuscripcion +"]").attr("selected",true);

  }
  effectFocusInput();
}
function apis_post_put_Discounts(response, method){
  var url= URLAPIS+'/api-descuentos/descuentos/';
  if(method == "PUT"){
    url= url+response.split("clone")[1]+"/";
  }
	console.log($('#valueDis_'+response).val());
	console.log(parseInt($('#periodsDis_'+response).val()));
	console.log($("#idSuscrip").val());
  infoToSend = {
        url:url,
        method:method,
        data:{
      		'valor': $('#valueDis_'+response).val(),
      		'periodoSuscripcion': parseInt($('#periodsDis_'+response).val()),
      		'suscripcion':$("#idSuscrip").val(),
      		'estado': 1,
    	},
    cache: false,
  };
    api_sendToApi(infoToSend,apisAddDiscount,apis_failed);
}
function apisAddDiscount(response){
	alert("guardo con exito");
	apis_getDiscountsReference($("#idSuscrip").val());
}

$("#btnreset_master").on("click", function(){
    $(this).prop('disabled', true);
    $(this).children('span').removeClass('d-none');
    data = {
        "email" : $("#email_reset_master").val(),
    }
    infoToSend = {
        url:URLAPIS+'/api-usuarios/sendCodeSMS',
        method:"POST",
        data:data,
        cache: false,
    };
    api_sendToApi(infoToSend, save_data_reset_email, apis_failed);
});

function save_data_reset_email(response){
    $("#btnreset_master").prop('disabled', false);
    $("#btnreset_master").children('span').addClass('d-none');
    userpk= response.usuario;
    alertboostrap('alert-success', response.Mensaje, "alert-boostrap", "alert-generalmodal")
    $("#btncodereset_master").prop('disabled', false);
}

$("#btncodereset_master").on("click", function(){
    $(this).prop('disabled', true);
    $(this).children('span').removeClass('d-none');
    data = {
        "user" : userpk,
        "code": $("#code_reset_master").val()
    }
    infoToSend = {
        url:URLAPIS+'/api-usuarios/validateCodeSMS',
        method:"POST",
        data:data,
        cache: false,
    };
    api_sendToApi(infoToSend, save_data_reset_code, apis_failed);
});

function save_data_reset_code(response){
    $("#btncodereset_master").prop('disabled', false);
    $("#btncodereset_master").children('span').addClass('d-none');
    useruid= response.uid;
    tokenreset = response.token;
    alertboostrap('alert-success', response.Mensaje, "alert-boostrap", "alert-generalmodal");
    $("#formResetPassword").addClass("d-none");
    $("#formResetConfirm").removeClass("d-none");
}

$("#btnconfirm_master").on("click", function(){
    $(this).prop('disabled', true);
    $(this).children('span').removeClass('d-none');
    data = {
        "uid": useruid,
        "token": tokenreset,
        "new_password1": $("#new_password_master").val(),
        "new_password2": $("#new2_password_master").val()
    }
    infoToSend = {
        url:URLAPIS+'/rest-auth/password/reset/confirm/',
        method:"POST",
        data:data,
        cache: false,
    };
    api_sendToApi(infoToSend, save_data_confirm_code, apis_failed);
});

function save_data_confirm_code(response){
    
    if(window.location.pathname.indexOf("/accounts/login") >= 0){
        $(".js-succes2").removeClass("d-none");
        setTimeout(function() {location.reload();}, 3000);
    }
    else{
        alertboostrap('alert-success', response.detail, "alert-boostrap", "alert-generalmodal");
        $("#login").click();
    }
}

function alertboostrap(color, message, son, father){
 custom_generalClone(son, father, true, 1);
 $("#"+son+"_clone1").addClass(color);
 $("#alert-reset-master_clone1").html(message);
}