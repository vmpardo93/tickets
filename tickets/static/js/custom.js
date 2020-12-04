$(document).ready(function () {
  var table=$("#myTable");
  /*cuando se havcce click en el boton del menu cuando esta en dispositivos moviles colapsa el menu  que esta a la izquierda*/
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
        $('#Content-C').toggleClass('active');
        //setTimeout(function(){ $('#sidebar').toggleClass('d-none'); }, 1);
        $(this).toggleClass('active');
    });
    $("#sidebar ul li").on('click', function(){
     toggleClassF(this , 'active'); 
    });
    $(".pagination a").on('click', function(){
     toggleClassF(this , 'active'); 
    });
    function toggleClassF(objeto, clase, bandera){
     if(bandera){
        $(objeto).toggleClass('active');
     }
     else{
       $(objeto).siblings().removeClass('active');
       $(objeto).addClass('active');
     }
    }

    $(".js-closeCrud").on('click', function(){

      if ($(this).attr('data-closeCrud')) {
        window.location.replace($(this).attr('data-closeCrud'));
      }
      else {
        $('#crudCollapse1').collapse('hide');
      }

    });
    $('.form-control').on('focusout',function(){
      changeState($(this));
    });
    $('.form-control').each(function(){
      changeState($(this));
    });
    $(function () {
        $('[data-toggle="popover"]').popover({
          trigger: 'hover',
          placement: 'bottom',
          delay: { "show": 1000, "hide": 200 }
        })
      });

    $( "#sidebar ul li ul").on('show.bs.collapse', function () {
      let idSubmenu=$(this).attr('id');
      $('[aria-controls = '+idSubmenu+'] .fa-chevron-down').removeClass('fa-chevron-down').addClass('fa-chevron-up');
    });

    $( "#sidebar ul li ul").on('hide.bs.collapse', function () {
      let idSubmenu=$(this).attr('id');
      console.log(idSubmenu);
      $('[aria-controls = '+idSubmenu+'] .fa-chevron-up').removeClass('fa-chevron-up').addClass('fa-chevron-down');
    });

    $('input[type="text"]').blur(function(event) {
        if(typeof $(this).attr("data-normaltext") === typeof undefined || $(this).attr("data-normaltext") === false){
          var capitalizeI=toTitleCase($(this).val());
          $(this).val(capitalizeI);
        }
    });

    function toTitleCase(str) {
      return (str ? str.toLowerCase() : str).replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
    }

    $(".js-orderColumn").on('click', function() {
      var rows, switching, i, x, y, td,shouldSwitch, dir, switchcount = 0;
      switching = true;
      //Set the sorting direction to ascending:
      dir = "asc"; 
      /*Make a loop that will continue until
      no switching has been done:*/
      while (switching) {
        //start by saying: no switching is done:
        switching = false;
        rows = table.children('tr');
        /*Loop through all table rows (except the
        first, which contains table headers):*/
        for (i = 0; i < (table.children('tr').length - 1); i++) {
          //start by saying there should be no switching:
          shouldSwitch = false;
          /*Get the two elements you want to compare,
          one from current row and one from the next:*/
          x = rows[i].getElementsByTagName("td")[$(this).attr('valor')];
          y = rows[i + 1].getElementsByTagName("td")[$(this).attr('valor')];
          /*check if the two rows should switch place,
          based on the direction, asc or desc:*/
          if (dir == "asc") {
            if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
              //if so, mark as a switch and break the loop:
              shouldSwitch= true;
              break;
            }
          } else if (dir == "desc") {
            if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
              //if so, mark as a switch and break the loop:
              shouldSwitch = true;
              break;
            }
          }
        }
        if (shouldSwitch) {
          /*If a switch has been marked, make the switch
          and mark that a switch has been done:*/
          rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
          switching = true;
          //Each time a switch is done, increase this count by 1:
          switchcount ++;      
        } else {
          /*If no switching has been done AND the direction is "asc",
          set the direction to "desc" and run the while loop again.*/
          if (switchcount == 0 && dir == "asc") {
            dir = "desc";
            switching = true;
          }
        }
      }
    });

  $("#mySearch").on("keyup", function() {
      if ( $(this).val().length > 2 || $(this).val().length == 0 ){
        var value = $(this).val().toLowerCase();
        table.children('tr').filter(function() {
           if($(this).text().toLowerCase().indexOf(value) > -1){
            $(this).removeClass('d-none').addClass('js-flag');
           }
           else{
            $(this).addClass('d-none').removeClass('js-flag');
           }
          // $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
        });
      }
  });

  $('#mySearch').on('focusout',function(){
        pageQuantity();
      });

  $("#maxRows").on('change', function () {
        pageQuantity();
      });

  function pageQuantity(){
      $(".pagination").html('');
      var trNum=0;
      var maxRows=parseInt($( "select#maxRows option:checked" ).val());
      var totalRows=table.children('tr.js-flag').length;
      if(maxRows == 0 ){
        $("#myTable tr.js-flag").removeClass('d-none');
      }
      else {
        table.children("tr.js-flag").each(function() {
          trNum++;

          if(trNum > maxRows) {
            $(this).addClass('d-none');      
          }
          if(trNum <= maxRows) {
            $(this).removeClass('d-none');
          }
        });
        if(totalRows >  maxRows){
          var pageNum= Math.ceil(totalRows/maxRows);
          $("#bloque").attr('max',Math.ceil(pageNum));
          $("#bloque").val(2);
          for(var i=1; i<= pageNum; i++){
            if(i <= 10){
              $(".pagination").append('<a href="#" class="rounded-circle m-1" data-page="'+i+'">'+i+'</a>');
            }
            else{
             $(".pagination").append('<a href="#" class="rounded-circle m-1 d-none" data-page="'+i+'">'+i+'</a>');
            }
          }
          if(pageNum > 10){
            $(".pagination").prepend('<a href="#" class="rounded-circle m-1" data-changeP="menos">&laquo;</a>');
            $(".pagination").append('<a href="#" class="rounded-circle m-1" data-changeP="mas">&raquo;</a>');
          }
        }
        $('[data-page="1"]').addClass('active');
        $(".pagination a").on('click',function(){
          if($(this).attr('data-page')){
            var pageNum=$(this).attr('data-page');
            var trIndex=0;
            $(".pagination a").removeClass('active');
            $(this).addClass('active');
            table.children("tr.js-flag").each(function() {
              trIndex++;
              if(trIndex > (maxRows*pageNum)|| trIndex <= ((maxRows*pageNum)-maxRows)){
                $(this).addClass('d-none');
              }
              else{
               $(this).removeClass('d-none'); 
              }
            });
          }
          else{
            var range1=0;
            var range2=0;
            console.log($(this).attr('data-changeP'));
             if($(this).attr('data-changeP') == 'mas'){
               range1=parseInt($("#bloque").val())+10;
             }
             else if($(this).attr('data-changeP') == 'menos'){
              range1=parseInt($("#bloque").val())-10;
             }
             if( range1 > 0  &&  range1-2 <  parseInt($("#bloque").attr('max'))){
                range2=range1+9;
               $("[data-page]").addClass('d-none');
               $('.pagination a:nth-child(n+'+range1+'):nth-child(-n+'+range2+')').removeClass('d-none');
               $("#bloque").val(range1);
             }
          }
        });
      }
    }

  $('.js-changePage').on('click', function () {
        var page=parseInt($("#actualPage").val()) + parseInt($(this).attr("value"));
        if( page > 0 && page <= parseInt($("#actualPage").attr('max')) ){
          changePage(page);
        }
    });

  $('[data-circlePage]').on('click', function () {
      var page =parseInt($(this).attr('data-circlePage'));
      changePage(page);
    });

  $('#login_password').mousedown(function() {
    $('#password').removeAttr('type');
    $('#login_password').addClass('fa-eye-slash').removeClass('fa-eye');
  });

  $('#login_password').mouseup(function() {
    $('#password').attr('type','password');
    $('#login_password').addClass('fa-eye').removeClass('fa-eye-slash');
  });

  $(".js-redirect").on("click", function(){
      location.href=$(this).data("redirect")
    });

  function changePage(page){
      $('[data-circlePage='+page+']').addClass("active").siblings().removeClass('active');
      $('[data-blockPage='+page+']').removeClass("d-none").siblings().addClass('d-none');
      $("#actualPage").val(page);
      $('.js-changePage').each(function(){
        if (page == parseInt($("#actualPage").attr('max'))) {
          if(parseInt($(this).attr("value")) == 1){
            $(this).addClass("d-none").siblings().removeClass('d-none');
          }
        }
        else{
          $(this).removeClass('d-none').siblings().addClass("d-none");
        }
      });
  }

  $('.js-modalValue').on('click', function () {
    $('.js-eliminarCrud').attr("valor",$(this).attr("value"));
  });

  $('[value="None"]').attr("value","");
});

function custom_generalClone(idChild, idFather, flagClone, idClone){
    var clone = $("#"+idChild).clone(true);
    var nameClone="_clone";
    if(idClone==null){
      idClone=parseInt($("#"+idChild).attr("valueClone"))+1;
      $("#"+idChild).attr("valueClone", idClone);
      nameClone=nameClone+"new";
    }
    $("*", clone).add(clone).each(function() {
      if (this.id) {
        this.id = this.id + nameClone + idClone;
      }
      if($(this).attr("for")){
        let temporalfor= $(this).attr("for");
        $(this).attr("for", temporalfor + nameClone + idClone);
      }
    });
    if(flagClone==true) {
      $("#"+idFather).html(clone);
    }
    else {
      $("#"+idFather).append(clone);
    }
    idChild= idChild+nameClone+idClone;
    $("#"+idChild).removeClass("d-none");
}

function changeState($formControl){
  if($formControl.val().length > 0){
    $formControl.addClass('has-value');
    console.log("entro acaY");
  }
  else{
    $formControl.removeClass('has-value'); 
    console.log("entro aca elseY");
  }
}

