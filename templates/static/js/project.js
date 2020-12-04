$('[data-target="#exampleModalCenter"]').on("click", function(){
	$(".js-newClone").attr("data-api",$(this).attr("data-api"));
	if($(this).attr("data-api")== "suscripciones"){
		apis_getReferenceProduct($(this).attr("value"));
	}
	else if(($(this).attr("data-api")== "descuentos")){
		apis_getDiscountsReference($(this).attr("value"));
	}
});

$(".js-totalIva").on("keyup", function() {
	var precio = $('#precio').val();
	var iva = $('#iva').val();
	var total = Number(parseInt(precio)+(precio) * ((iva)/100)).toFixed(0);
	$('#itotal').val(total);
	$('.form-control').each(function(){
		changeState($(this));
	});	
});

$(".js-newClone").on("click", function(){
	if($(this).attr("data-api")== "suscripciones"){
		custom_generalClone("referenceNew", "fatherModal1", true);
	}
	else if(($(this).attr("data-api")== "descuentos")){
		custom_generalClone("discountsNew", "fatherModal1", true);
	}
});

$(".js-postClone").on("click", function(){
	var temporalR=$(this).attr("id").split("_");
	if($(this).attr("data-api")== "suscripciones"){
		apis_post_put_Reference(temporalR[1], "POST");
	}
	else if(($(this).attr("data-api")== "descuentos")){
		console.log(temporalR[1]);
		apis_post_put_Discounts(temporalR[1], "POST");
	}
});

$(".js-putClone").on("click", function(){
	var temporalR=$(this).attr("id").split("_");
	if($(this).attr("data-api")== "suscripciones"){
		apis_post_put_Reference(temporalR[1], "PUT");
	}
	else if(($(this).attr("data-api")== "descuentos")){
		apis_post_put_Discounts(temporalR[1], "PUT");
	}
});

function menuOcultar(){
	var grupo=$("#group_user_id").val();
	console.log(grupo);
 	switch (grupo) {
 		case '1':
 			console.log("permisos por definir al rol "+grupo);	
 		break;
 		case '2':
 			console.log("permisos por definir al rol "+grupo);
 			$("#suscripcion_rol").removeClass("d-none");
 			$("#referencia_rol").removeClass("d-none");
 			$("#suscripcion2_rol").removeClass("d-none");
 			$("#descuento_rol").removeClass("d-none");
 			$("#promocion_rol").removeClass("d-none");
 			$("#user_rol").removeClass("d-none");
 			$("#domiciliario_rol").removeClass("d-none");
 			$("#reportes_rol").removeClass("d-none");
 			$("#empresario_reporte_rol").removeClass("d-none");
 			$("#domiciliario_reporte_rol").removeClass("d-none");
 		break;
 		case '3':
 			console.log("permisos por definir al rol "+grupo);
 		break;
 		case '4':
 			console.log("permisos por definir al rol "+grupo);
 			$("#configuracion_rol").removeClass("d-none");
 			$("#pais_rol").removeClass("d-none");
 			$("#departamento_rol").removeClass("d-none");
 			$("#ciudad_rol").removeClass("d-none");
 			$("#banco_rol").removeClass("d-none");
 			$("#suscripcion_rol").removeClass("d-none");
 			$("#categoria_rol").removeClass("d-none");
 			$("#subcategoria_rol").removeClass("d-none");
 			$("#referencia_rol").removeClass("d-none");
 			$("#suscripcion2_rol").removeClass("d-none");
 			$("#descuento_rol").removeClass("d-none");
 			$("#promocion_rol").removeClass("d-none");
 			$("#tiempo_rol").removeClass("d-none");
 			$("#frecuencia_rol").removeClass("d-none");
 			$("#banner_rol").removeClass("d-none");
 			$("#user_rol").removeClass("d-none");
 			$("#empresario_rol").removeClass("d-none");
 			$("#suscriptor_rol").removeClass("d-none");
 			$("#domiciliario_rol").removeClass("d-none");
 			$("#usuarios_rol").removeClass("d-none");
 			$("#reportes_rol").removeClass("d-none");
 			$("#empresario_reporte_rol").removeClass("d-none");
 			$("#referencia_reporte_rol").removeClass("d-none");
 			$("#domiciliario_reporte_rol").removeClass("d-none");
 			$("#zonas_rol").removeClass("d-none");
 			$("#pagos_rol").removeClass("d-none");
 			$("#pagos2_rol").removeClass("d-none");	
 			$("#bancos_rol").removeClass("d-none");	
 		break;
 		case '5':
 			console.log("permisos por definir al rol "+grupo);
 			$("#suscripcion_rol").removeClass("d-none");
 			$("#pais_rol").removeClass("d-none");
 			$("#departamento_rol").removeClass("d-none");
 			$("#ciudad_rol").removeClass("d-none");
 			$("#banco_rol").removeClass("d-none");
 			$("#categoria_rol").removeClass("d-none");
 			$("#subcategoria_rol").removeClass("d-none");
 			$("#referencia_rol").removeClass("d-none");
 			$("#suscripcion2_rol").removeClass("d-none");
 			$("#descuento_rol").removeClass("d-none");
 			$("#promocion_rol").removeClass("d-none");
 			$("#tiempo_rol").removeClass("d-none");
 			$("#frecuencia_rol").removeClass("d-none");
 			$("#banner_rol").removeClass("d-none");
 			$("#user_rol").removeClass("d-none");
 			$("#empresario_rol").removeClass("d-none");
 			$("#suscriptor_rol").removeClass("d-none");
 			$("#domiciliario_rol").removeClass("d-none");
 			$("#reportes_rol").removeClass("d-none");
 			$("#empresario_reporte_rol").removeClass("d-none");
 			$("#referencia_reporte_rol").removeClass("d-none");
 			$("#domiciliario_reporte_rol").removeClass("d-none");
 			$("#zonas_rol").removeClass("d-none");
 			$("#pagos_rol").removeClass("d-none");
 			$("#pagos2_rol").removeClass("d-none");	
 			$("#bancos_rol").removeClass("d-none");	
 		break;
 		case '6':
 			console.log("permisos por definir al rol "+grupo);
 			$("#configuracion_rol").removeClass("d-none");
 			$("#pais_rol").removeClass("d-none");
 			$("#departamento_rol").removeClass("d-none");
 			$("#ciudad_rol").removeClass("d-none");
 			$("#banco_rol").removeClass("d-none");
 			$("#suscripcion_rol").removeClass("d-none");
 			$("#categoria_rol").removeClass("d-none");
 			$("#subcategoria_rol").removeClass("d-none");
 			$("#referencia_rol").removeClass("d-none");
 			$("#suscripcion2_rol").removeClass("d-none");
 			$("#descuento_rol").removeClass("d-none");
 			$("#promocion_rol").removeClass("d-none");
 			$("#tiempo_rol").removeClass("d-none");
 			$("#frecuencia_rol").removeClass("d-none");
 			$("#banner_rol").removeClass("d-none");
 			$("#user_rol").removeClass("d-none");
 			$("#empresario_rol").removeClass("d-none");
 			$("#suscriptor_rol").removeClass("d-none");
 			$("#domiciliario_rol").removeClass("d-none");
 			$("#usuarios_rol").removeClass("d-none");
 			$("#reportes_rol").removeClass("d-none");
 			$("#empresario_reporte_rol").removeClass("d-none");
 			$("#referencia_reporte_rol").removeClass("d-none");
 			$("#domiciliario_reporte_rol").removeClass("d-none");
 			$("#zonas_rol").removeClass("d-none");
 			$("#pagos_rol").removeClass("d-none");
 			$("#pagos2_rol").removeClass("d-none");	
 			$("#bancos_rol").removeClass("d-none");	
 		break;
 		default:
 			window.open("https://eurekadms.com/proyectos-actuales/");
    		$("#suscripcion_rol").remove();
 			$("#user_rol").remove();
 			$("#reportes_rol").remove();
 			$("#zonas_rol").remove();
 			$("#pagos_rol").remove();

 	}
 }

 $("#editarPerfil").on("click", function(){
 	console.log("Probando");
	apis_post_put_Usuarios();
});
