var dir='<?php print $fl?>/scripts';
var dat1='';
var dat2='';
var acc='';
var amt1='';
var amt2='';
var id_pay=0;
var dc='';
var oper='';
var lastSel='';
var right=0;
var FirmID=0;


   $(document).ready(function() {
    popupcalendar = new Epoch('cal','popup',document.getElementById('dateS'),false);
    popupcalendar = new Epoch('cal','popup',document.getElementById('dateF'),false);

  //  $("#dataout").datepicker();
  //  $("#datain").datepicker();

  //  $("#theft_data").datepicker();
    $("#tmc_data").datepicker();
    $("#labor_data").datepicker();
    $("#datain").datepicker();

    $("#timeout").timePicker();
    $("#timein").timePicker();

    $('#timein').val('00:00');
    $('#timeout').val('00:00');

    $("#dv_edit_sb").draggable();

    var now= new Date(); 
    var _day=now.getDate(); 
    var _month=(now.getMonth()); 
    var _year=(1900+now.getYear());    
    var date_now=((_day < 10) ? "0" : "") + _day +'-'+ ((_month < 10) ? "0" : "") + _month +'-'+ _year;
    
    
    var date_con                
    var date_con= new Date(); 
    var c_day=date_con.getDate(); 
    var c_month=(date_con.getMonth()); 
    var c_year=(1900+date_con.getYear());    
    var date_control=((c_day < 10) ? "0" : "") + c_day +'-'+ ((c_month < 10) ? "0" : "") + c_month +'-'+ c_year;
                
          //      alert(date_control);  
    
    
    
    $('#dateS').val(date_now);
    
    
    
    $('#dateF').val(DateNow());
 //   $("#datain").val(DateNow());
 //   $("#theft_data").val(DateNow());
    $("#tmc_data").val(DateNow());
 //   $("#labor_data").val(DateNow());

    $('#persona_kod1c').keyup(function(eObj) {
		persona_kod1c();
    });

    $('#persona_kod1c_theft').keyup(function(eObj) {
		persona_kod1c_theft();
    });

    $('#persona_kod1c_labor').keyup(function(eObj) {
		persona_kod1c_labor();
    });



     ListPay();
     SprFirmEdit();

    $('#butt_close_sb_not').click(function(){

                                 $('#dv_edit_sb').fadeOut(700);
	 	                         $('#list').fadeIn(700);
                                 $('#ListGroup').val('0');
                                 $('#firm_id').val('0');
	 	                     //    $('#loader').fadeIn(500);
				             //    $('#loader').fadeOut(700);
	                         });


    $('.butt_close').click(function(){

 		                         CloseDiv()
	                         });

    $('#butt_save_secure').click(function ()  {
                                 oper='add';
                                 SaveStatSecure();
                                 $('#list').trigger('reloadGrid');
                               //  CloseDiv();   - доделать сохранение без перезагрузки
                          } );

    $('#butt_save_secure_edit').click(function ()  {
    							 oper='edit';
                                 SaveStatSecure();
                                 $('#list').trigger('reloadGrid');
                          } );

	$('#butt_save_theft').click(function ()  {
		                         oper='add';
                                 SaveStatTheft();
                                 $('#list').trigger('reloadGrid');
	                      } );

    $('#butt_save_theft_edit').click(function ()  {
    							 oper='edit';
                                 SaveStatTheft();
                                 $('#list').trigger('reloadGrid');
                          } );

	$('#butt_save_tmc').click(function ()  {
	                             oper='add';
                                 SaveStatTmc();
                                 $('#list').trigger('reloadGrid');
	                      } );
	$('#butt_save_tmc_edit').click(function ()  {
	                             oper='edit';
                                 SaveStatTmc();
                                 $('#list').trigger('reloadGrid');
	                      } );

	$('#butt_save_labor').click(function ()  {
		                         oper='add';
                                 SaveStatLabor();
                                 $('#list').trigger('reloadGrid');
	                      } );
	$('#butt_save_labor_edit').click(function ()  {
    							 oper='edit';
                                 SaveStatLabor();
                                 $('#list').trigger('reloadGrid');
                          } );


	$("#ListGroup").click(function(){
 		                      //  alert(1); 
                                LG();
	                         });


	$('#but_send').click(function() {
	                			ListPay();
		                  } );


});

function ListPay(){


  $('#dv_list').html('<table id="list"></table><div id="pager"></div>');

        jQuery("#list").jqGrid({
            url:dir+'/sb_secure.php',
		    loadComplete:function(id){ $('#loader').fadeOut(1000); GPSrights(); },
            datatype: 'json',
            postData:{ 'dateS':$('#dateS').val(), 'dateF':$('#dateF').val() },
		    mtype: 'POST',
            width:'100%',
            height:'100%',


            colNames:[ 'Фирма', 'Мероприятия','Дата проверки','Примечания относительно проверки по мероприятию','Сотрудник/Фирма','' ],
            colModel :[
                  { name:'firm_id', index:'sec.firm_id', align:'left',  search:true, width:200,editable:true,
                            stype: 'select',
      						searchoptions: {
							defaultValue: "",
   							dataUrl:	dir+'/spr_firms.php?fl=1'
		   						}
		   						,edittype:'select',
		   					editoptions:{
		   								defaultValue: "",
		   								dataUrl: dir+'/spr_firms.php?fl=2',
		   								}

       			  }

                ,{ name:'object_id', index:'sec.object_id', align:'left',  search:true, width:200,editable:true,
                            stype: 'select',
      						searchoptions: {
							defaultValue: "",
   							dataUrl:	dir+'/sb_spr_object.php?fl=2'
		   						}
		   						,edittype:'select',
		   					editoptions:{
		   								defaultValue: "",
		   								dataUrl: dir+'/sb_spr_object.php?fl=2',
		   								}

       			  }
               	,{ name:'datain', index:'sec.datain', align:'center', width:110, sortable:true,editable:true, search:false, editrules:{date:true},formatter:'date', datefmt:'d.m.Y' }
               	,{ name:'notes', index:'sec.notes', align:'left', width:350, sortable:true,editable:false, search:false }
               	,{ name:'persona_kod1c', index:'sec.persona_kod1c', align:'left', width:300, sortable:true,editable:false, search:true }
                ,{ name:'obj_id', search:false,hidden:true }

                        ],
            pager: '#pager',
            rowNum:30,
            rowList:[5,10,20,30,50],
            sortname: 'datain',
            sortorder: "desc",
            viewrecords: true,
            caption: 'ОТЧЕТ ПО ЗАВОДИМЫМ ЗАЯВКАМ В ТЕЧЕНИИ ДНЯ',
			footerrow : false,
			userDataOnFooter : true,
			altRows : true,
			editurl:dir+'/edit_sb_secure_add.php',
            rownumbers: true,
            ondblClickRow: function (id) {
					           if(id) {
                                   $('object_id').val();  // Как передать значение object .... ?
									var object_id=$('#'+id).find('td').eq(6).text()*1;
                                   switch (object_id) {
                                       case 1: Dv_secure(id);  break;
                                       case 2: Dv_theft(id);  break;
                                       case 3: Dv_tmc(id);  break;
                                       case 4: Dv_labor(id);  break;
                                       default: return;
                                   }
                               }
                           },    // Заканчивается функция даблклик

            onSelectRow: function(id)
                            {
			                lastSel=id;
		                    },

        });

	    $("#list").jqGrid('destroyGroupHeader');
        $("#list").jqGrid('setGroupHeaders', {
		  useColSpanStyle: true,
		/*  groupHeaders:[
			{ startColumnName: 'timein', numberOfColumns: 7, titleText: 'Время проверки' }

		  ] */
		});
			    $("#list").jqGrid('navGrid','#pager',
				{ edit:false, add:false, del:true, search:false },
				{ height:200,width:350, reloadAfterSubmit:true,closeAfterAdd:true,closeAfterEdit:true }, //options
				{ height:200,width:350, reloadAfterSubmit:true,closeAfterAdd:true,closeAfterEdit:true }, // edit options
				{ height:200,width:350, reloadAfterSubmit:true,closeAfterAdd:true,closeAfterEdit:true }, // add options
				{ reloadAfterSubmit:true }, // del options
				{  } // search options
			);


		 $("#list").jqGrid('filterToolbar',{ autoseaach:true, searchOnEnter : false, stringResult: true, defaultSearch:'cn' });
         $('#list').setPostData({ 'dateS':$('#dateS').val(), 'dateF':$('#dateF').val() });
         $('#list').trigger('reloadGrid');
         $('#new').remove();
	     $("#list").jqGrid('navGrid','#pager').navButtonAdd('#pager',{
	        caption:"<b style=\"color:blue\">Добавить запись</b>",
	        id:'new',
	        buttonicon:"",
	        onClickButton: function(){
	        	$('#dv_edit_sb').fadeIn(1000);
	        	oper='add';
	          //  $('#datain').val(DateNow());
	            $('#check').val(0);
                $('#alcohol').val(0);
                $('#reaction').val(0);
                $('#tmc').val(0);
                $('#disturbance_type').val(0);
                $('#tmc_type').val(0);
                $('#type_labor').val(0);
                $('#reaction_labor').val(0);

	        },
	        position:"last",
	        title:'Добавить запись'
	});

}


// Функции right
function DateStart(){
var now= new Date(); var _day=now.getDate(); var _month=(now.getMonth()+1); var _year=(1900+now.getYear());
var _date="";

_date=((_day < 10) ? "0" : "") + _day;
_date+= '01-'+((_month < 10) ? "0" : "") + _month;
_date+= '01-01-'+_year;

return _date;
}
function DateNow(){
var now= new Date(); var _day=now.getDate(); var _month=(now.getMonth()+1); var _year=(1900+now.getYear());
var _date="";

_date=((_day < 10) ? "0" : "") + _day;
_date+= '-'+((_month < 10) ? "0" : "") + _month;
_date+="-"+_year;

return _date;
}


function GPSrights(){

    var url = dir+'/rights.php';
    $.post(url,
            { 'id':1 },
            function(data){
            	if(data=='1') {
           			$('.gps_edit').fadeIn(10);

                }else $('.gps_edit').fadeOut(1);
            },
            "html"
    );

}

// Функции сохранения данных через Аджакс и дивы

// Сохранение для дива Охрана

function SaveStatSecure(){
var id_zvit_prot=$('#id_zvit_prot').val();
var persona_kod1c=$('#persona_kod1c').val();
var persona_kod1c_add=$('#persona_kod1c_add').val();
var subject=$('#subject').val();
var alcohol=$('#alcohol').val();
var datain=$('#datain').val();
var check=$('#check').val();
var distance=$('#distance').val();
var notes=$('#notes').val();
var timein=$('#timein').val();
var timeout=$('#timeout').val();
var firm_id=$('#firm_id').val();
var datain=$('#datain').val();
var object_id=$('#ListGroup').val();



if(firm_id=='' )
		{ jAlert('Заполните поле "Фирма"','Ошибка !');
						return;
		}

if(datain=='' )
		{ jAlert('Поле "Дата проверки" обязательно для заполнения','Ошибка !');
						return;
		}


if(persona_kod1c=='' )
		{ jAlert('Заолните поле "ФИО сотрудника"','Ошибка !');
						return;
		}


if(check=='0')
		{ jAlert('Укажите вид проверки"','Ошибка !');
						return;
		}

if(timein=='00:00' )
		{ jAlert('Укажите время начала проверки','Ошибка !');
						return;
		}


if(timeout=='00:00' )
		{ jAlert('Укажите время окончания проверки"','Ошибка !');
						return;
		}

if(timeout<=timein )
		{ jAlert('Время окончания проверки должно быть больше времени начала проверки','Ошибка !');
						return;
		}


if(subject=='' )
		{ jAlert('Заполните поле "Охраняемый объект"','Ошибка !');
						return;
		}


if(distance=='' )
		{ jAlert('Заполните поле "Удаленность от офиса"','Ошибка !');
						return;
		}


if(alcohol=='0')
		{ jAlert('Укажите вид нарушения','Ошибка !');
						return;
		}


if(notes=='' )
		{ jAlert('Поле "Примечание" обязательно для заполнения','Ошибка !');
						return;
		}




$('#loader').fadeIn(100);
$('#dv_secure').fadeOut(100);



   $.ajax({
        type: 'POST',
        data: '&id='+id+'&id_zvit_prot='+id_zvit_prot+'&persona_kod1c='+persona_kod1c+
              '&subject='+subject+'&alcohol='+alcohol+'&datain='+datain+
              '&check='+check+'&distance='+distance+
              '&notes='+notes+'&timein='+timein+'&oper='+oper+
              '&firm_id='+firm_id+'&object_id='+object_id+'&datain='+datain+
              '&timeout='+timeout,
        url: dir+'/edit_sb_secure.php',
        success: function(answ){
        	var answ = eval("(" + answ + ")");
        	if(answ.status=='OK'){
				$('#dv_list').fadeIn(1000);
				$('#loader').fadeOut(100);
	        	$('#list').trigger('reloadGrid');
	        	$('#id_zvit_prot').val("");
	        	$('#persona_kod1c').val("");
	        	$('#subject').val("");
	        	$('#alcohol').val("");
	        	$('#datain').val("");
	        	$('#check').val("");
	        	$('#distance').val("");
	        	$('#notes').val("");
	        	$('#timein').val("00:00");
	        	$('#timeout').val("00:00");
	        	$('#persona_kod1c_add').val("");
                document.location.href=(url='/realagro/?fl=sb&action=sb_secure');
       	                   }
        	 else{
        		 jAlert(' Ошибка!','Обновите страницу');
 	        	 $('#loader').fadeOut(100);
				 $('#dv_edit_sb').fadeIn(100);
        	     }
		}});

}


// Функция сохранения для дива хищения

function SaveStatTheft(){
var id_zvit_theft=$('#id_zvit_theft').val();
var persona_kod1c=$('#persona_kod1c').val();
var persona_kod1c_add=$('#persona_kod1c_add').val();
var persona_kod1c_theft=$('#persona_kod1c_theft').val();
var reaction=$('#reaction').val();
var subject_theft=$('#subject_theft').val();
//var =$('#theft_data').val();
var summ=$('#summ').val();
var notes_theft=$('#notes_theft').val();
var summ_h=$('#summ_h').val();
var summ_d=$('#summ_d').val();
var tmc=$('#tmc').val();
var firm_id=$('#firm_id').val();
var datain=$('#datain').val();
var object_id=$('#ListGroup').val();


if(datain=='' )
		{ jAlert('Заолните поле "Дата хищения"','Ошибка !');
						return;
		}

if(persona_kod1c_theft=='' )
		{ jAlert('Заолните поле "ФИО фигуранта"','Ошибка !');
						return;
		}
/*if(theft_data=='' )
		{ jAlert('Заолните поле "Дата хищения"','Ошибка !');
						return;
		}   */

if(reaction=='0' )
		{ jAlert('Поле "Меры реагирования" обязательно для заполнения','Ошибка !');
						return;
		}

if(subject_theft=='' )
		{ jAlert('Заполните поле "Охраняемый объект"','Ошибка !');
						return;
		}

if(summ=='' )
		{ jAlert('Заполните поле "Сумма хищения"','Ошибка !');
						return;
		}

if(summ_h=='' )
		{ jAlert('Заполните поле "Сумма возмещения"','Ошибка !');
						return;
		}

if(summ_d=='' )
		{ jAlert('Заполните поле "Сумма депримирования", возможно ввести "0"','Ошибка !');
						return;
		}

if(tmc=='0' )
		{ jAlert('Поле "Вид ТМЦ" обязательно для заполнения','Ошибка !');
						return;
		}

if(notes_theft=='' )
		{ jAlert('Поле "Примечание" обязательно для заполнения','Ошибка !');
						return;
		}






   $.ajax({
        type: 'POST',
        data: '&id='+id+'&id_zvit_theft='+id_zvit_theft+'&persona_kod1c='+persona_kod1c+
              '&subject_theft='+subject_theft+'&reaction='+reaction+'&tmc='+tmc+
             /* '&theft_data='+theft_data+*/'&summ='+summ+'&summ_h='+summ_h+'&summ_d='+summ_d+
              '&firm_id='+firm_id+'&object_id='+object_id+'&datain='+datain+
              '&notes_theft='+notes_theft+'&persona_kod1c_theft='+persona_kod1c_theft+'&oper='+oper,
        url: dir+'/edit_sb_theft.php',
        success: function(answ){
        	var answ = eval("(" + answ + ")");
        	if(answ.status=='OK'){
				$('#dv_list').fadeIn(1000);
				$('#loader').fadeOut(100);
	        	$('#list').trigger('reloadGrid');
	        	$('#id_zvit_theft').val("");
	            $('#persona_kod1c').val("");
	        	$('#subject_theft').val("");
	        	$('#reaction').val("");
	        //    $('#theft_data').val("");
	        	$('#summ').val("");
	        	$('#summ_h').val("");
	        	$('#summ_d').val("");
	        	$('#notes_theft').val("");
	        	$('#persona_kod1c_add').val("");
                document.location.href=(url='/realagro/?fl=sb&action=sb_secure');
       	                   }
        	 else{
        		 jAlert(' Ошибка!','Обновите страницу');
 	        	 $('#loader').fadeOut(100);
				 $('#dv_edit_sb').fadeIn(100);
        	     }
		}});

}


// Функция сохранения для дива нарушение трудовой дисциплины

function SaveStatLabor(){
var id_zvit_labor=$('#id_zvit_labor').val();
var persona_kod1c=$('#persona_kod1c').val();
var persona_kod1c_add=$('#persona_kod1c_add').val();
var persona_kod1c_labor=$('#persona_kod1c_labor').val();
var reaction_labor=$('#reaction_labor').val();
var subject_labor=$('#subject_labor').val();
//var labor_data=$('#labor_data').val();
var notes_labor=$('#notes_labor').val();
var type_labor=$('#type_labor').val();
var summ_d_labor=$('#summ_d_labor').val();
var firm_id=$('#firm_id').val();
var datain=$('#datain').val();
var object_id=$('#ListGroup').val();



if(persona_kod1c_labor=='' )
		{ jAlert('Заолните поле "ФИО нарушителя"','Ошибка !');
						return;
		}

/*if(labor_data=='' )
		{ jAlert('Заолните поле "Дата нарушения"','Ошибка !');
						return;
		}      */


if(type_labor=='0' )
		{ jAlert('Заолните поле "Вид нарушения"','Ошибка !');
						return;
		}

if(reaction_labor=='0' )
		{ jAlert('Заолните поле "Меры реагирования"','Ошибка !');
						return;
		}


if(subject_labor=='' )
		{ jAlert('Заполните поле "Проверяемый объект"','Ошибка !');
						return;
		}


if(summ_d_labor=='' )
		{ jAlert('Заполните поле "Сумма депримирования"  (возможно ввести "0")','Ошибка !');
						return;
		}

if(notes_labor=='' )
		{ jAlert('Поле "Примечание" обязательно для заполнения','Ошибка !');
						return;
		}


$('#loader').fadeIn(100);
$('#dv_labor').fadeOut(100);

   $.ajax({
        type: 'POST',
        data: '&id='+id+'&id_zvit_labor='+id_zvit_labor+'&persona_kod1c='+persona_kod1c+'&persona_kod1c_labor='+persona_kod1c_labor+
              '&subject_labor='+subject_labor+'&reaction_labor='+reaction_labor+
            /*'&labor_data='+labor_data+*/'&summ_d_labor='+summ_d_labor+
              '&firm_id='+firm_id+'&object_id='+object_id+'&datain='+datain+
              '&notes_labor='+notes_labor+'&type_labor='+type_labor+'&oper='+oper,
        url: dir+'/edit_sb_labor.php',
        success: function(answ){
        	var answ = eval("(" + answ + ")");
        	if(answ.status=='OK'){
				$('#dv_list').fadeIn(1000);
				$('#loader').fadeOut(100);
	        	$('#list').trigger('reloadGrid');
	        	$('#id_zvit_labor').val("");
	            $('#persona_kod1c').val("");
	        	$('#subject_labor').val("");
	        	$('#reaction_labor').val("");
	         //   $('#labor_data').val("");
	        	$('#summ_d_labor').val("");
	           	$('#notes_labor').val("");
	        	$('#persona_kod1c_add').val("");
                document.location.href=(url='/realagro/?fl=sb&action=sb_secure');
       	                   }
        	 else{
        		 jAlert(' Ошибка!','Обновите страницу');
 	        	 $('#loader').fadeOut(100);
				 $('#dv_labor').fadeIn(100);
        	     }
		}});

}


// Функция сохранения для дива Приемка ТМЦ

function SaveStatTmc(){
var id_zvit_tmc=$('#id_zvit_tmc').val();
var firm_tmc=$('#firm_tmc').val();
var disturbance_type=$('#disturbance_type').val();
var subject_tmc=$('#subject_tmc').val();
var datain=$('#datain').val();
var summ_tmc_p=$('#summ_tmc_p').val();
var summ_tmc_n=$('#summ_tmc_n').val();
var notes_tmc=$('#notes_tmc').val();
var tmc_type=$('#tmc_type').val();
var firm_id=$('#firm_id').val();
var datain=$('#datain').val();
var object_id=$('#ListGroup').val();



if(firm_tmc=='' )
		{ jAlert('Заолните поле "Наименование компании поставщика ТМЦ"','Ошибка !');
						return;
		}

if(disturbance_type=='0' )
		{ jAlert('Заолните поле "Виды нарушений"','Ошибка !');
						return;
		}

if(tmc_type=='0' )
		{ jAlert('Заолните поле "Вид ТМЦ"','Ошибка !');
						return;
		}

if(subject_tmc=='' )
		{ jAlert('Заполните поле "Описание ТМЦ"','Ошибка !');
						return;
		}

if(summ_tmc_p=='' )
		{ jAlert('Заполните поле "Сумма поставки"','Ошибка !');
						return;
		}

if(summ_tmc_n=='' )
		{ jAlert('Заполните поле "Сумма недостачи"','Ошибка !');
						return;
		}


if(notes_tmc=='' )
		{ jAlert('Поле "Примечание" обязательно для заполнения','Ошибка !');
						return;
		}


$('#loader').fadeIn(100);
$('#dv_tmc').fadeOut(100);

   $.ajax({
        type: 'POST',
        data: '&id='+id+'&id_zvit_tmc='+id_zvit_tmc+'&firm_tmc='+firm_tmc+
              '&subject_tmc='+subject_tmc+'&disturbance_type='+disturbance_type+'&tmc_type='+tmc_type+
              '&summ_tmc_p='+summ_tmc_p+'&summ_tmc_n='+summ_tmc_n+
              '&firm_id='+firm_id+'&object_id='+object_id+'&datain='+datain+
              '&notes_tmc='+notes_tmc+'&oper='+oper,
        url: dir+'/edit_sb_tmc.php',
        success: function(answ){
        	var answ = eval("(" + answ + ")");
        	if(answ.status=='OK'){
				$('#dv_list').fadeIn(1000);
				$('#loader').fadeOut(100);
	        	$('#list').trigger('reloadGrid');
	        	$('#id_zvit_tmc').val("");
	            $('#firm_tmc').val("");
	        	$('#subject_tmc').val("");
	        	$('#disturbance_type').val("");
	           	$('#summ_tmc_p').val("");
	        	$('#summ_tmc_n').val("");
	        	$('#notes_tmc').val("");
                document.location.href=(url='/realagro/?fl=sb&action=sb_secure');

       	                   }
        	 else{
        		 jAlert(' Ошибка!','Обновите страницу');
 	        	 $('#loader').fadeOut(100);
				 $('#dv_tmc').fadeIn(100);
        	     }
		}});

}




// функции для мягкого поиска сотрудников



function persona_kod1c(){
	if($('#persona_kod1c').val()==' '){
		$('#persona_kod1c').val('');
		return;
	}
	if($('#persona_kod1c').val().length<3){ $('#persona_kod1c_add').html(''); return; }
		$.ajax({
		    type: 'POST',
		    data: '&name_secure='+$('#persona_kod1c').val(),
		    url: dir+'/persona_kod1c.php',
		    success: function(answ){

			$('#persona_kod1c_add').html(answ);

		 }
		});

}


function persona_kod1c_theft(){
	if($('#persona_kod1c_theft').val()==' '){
		$('#persona_kod1c_theft').val('');
		return;
	}
	if($('#persona_kod1c_theft').val().length<3){ $('#persona_kod1c_theft_add').html(''); return; }
		$.ajax({
		    type: 'POST',
		    data: '&name_theft='+$('#persona_kod1c_theft').val(),
		    url: dir+'/persona_kod1c_theft.php',
		    success: function(answ){

			$('#persona_kod1c_theft_add').html(answ);

		 }
		});

}

function persona_kod1c_labor(){
	if($('#persona_kod1c_labor').val()==' '){
		$('#persona_kod1c_labor').val('');
		return;
	}
	if($('#persona_kod1c_labor').val().length<3){ $('#persona_kod1c_labor_add').html(''); return; }
		$.ajax({
		    type: 'POST',
		    data: '&name_labor='+$('#persona_kod1c_labor').val(),
		    url: dir+'/persona_kod1c_labor.php',
		    success: function(answ){

			$('#persona_kod1c_labor_add').html(answ);

		 }
		});

}


function newtextdiv(obj){
$(obj).attr('class','blokPoint');
}


function backtextdiv(obj){
$(obj).attr('class','blok');
}


function selname(obj){
$('#persona_kod1c').val($(obj).text());
$('#persona_kod1c').attr('name',obj.inn).attr('disabled',false);
$('#persona_kod1c').hide('fast');


$('#persona_kod1c_theft').val($(obj).text());
$('#persona_kod1c_theft').attr('name',obj.inn).attr('disabled',false);
$('#persona_kod1c_theft').hide('fast');


$('#persona_kod1c_labor').val($(obj).text());
$('#persona_kod1c_labor').attr('name',obj.inn).attr('disabled',false);
$('#persona_kod1c_labor').hide('fast');


//$('#newseek').show('fast');
//$('#saverec').show('fast');
}


/*
function NewSeekStat(){
$('#newseek').hide('fast');
$('#persona_kod1c').val('');
$('#persona_kod1c').attr('disabled',0).focus();
$('#seeked_statya').html('').show('fast');
$('#saverec').hide('fast');
}
*/

// Функции кейапа для ввода символов  цифровых данных в дивах

function checkNum(id){
     var v = $(id).val();
	 $(id).val(v.replace(/[^1-9]/gi, ""));
	                };


function checkSumNum(id){
     var v = $(id).val();
	 $(id).val(v.replace(/[^0-9]/gi, ""));
	                };

function checkSumNumTmc(id){
     var v = $(id).val();
	 $(id).val(v.replace(/[^0-9]/gi, ""));
	                };


// Функции вызова разных дивов через swich

// Див охраны
function Dv_secure(id) {
    $.post (dir+'/edit_sb_secure.php',
		{ 'id': id, 'oper': 'get'},
		function (data) {
			var data = eval("(" + data + ")");
			if (data.status == 'OK') {                                            
                
				$('#dv_edit_sb').fadeIn(10);
				$('.dv_secure').fadeIn(10);
				$('#butt_close_sb').fadeOut(10);
				$('#butt_save_secure').fadeOut(10);                                
			    $('#datain').val(data.data.datain);
				$('#firm_id').val(data.data.firm_id);
				$('#notes').val(data.data.notes);
				$('#distance').val(data.data.distance);
				$('#persona_kod1c').val(data.data.persona_kod1c);
				$('#subject').val(data.data.subject);
				$('#timein').val(data.data.timein);
				$('#timeout').val(data.data.timeout);
				$('#alcohol').val(data.data.alcohol);
				$('#check').val(data.data.check);
				$('#ListGroup').val(data.data.object_id);
				//$('#persona_kod1c').attr("disabled","");
				//$('#notes').attr("disabled","");
				//$('#subject').attr("disabled","");
				$('#loader').fadeIn(300);
				$('#loader').fadeOut(500);
                $('#datain').attr('disabled',true);
                $('#firm_id').attr('disabled',true);
                $('#ListGroup').attr('disabled',true);
				//Block()      
               
    var now= new Date(); 
    var _month=(now.getMonth()); 
       
    var date_c = $('#datain').val(); 
      //  alert(_month);
    
    arr = date_c.split('-');
    dateObj=new Date(arr[0],arr[1],arr[2]);
        
    
    var month_oper = dateObj.getMonth();               
  //  alert(month_oper);                                        
              
                 
                   if(month_oper < _month)
                {
            
                    $('#butt_save_secure_edit').fadeOut(10);                     
                                                         
                }   
			}
		},
		"html"
	);
	// alert(lastSel);
	//$('#dv_secure').fadeIn(1000);
	//$('#dv_list').fadeOut(1000);
	oper='add';
	$('#id_zvit_prot').val(lastSel);
	// alert(lastSel);
};

// Див хищений
function Dv_theft (id) {
    $.post (dir+'/edit_sb_theft.php',
		{ 'id': id, 'oper': 'get'},
		function (data) {
			var data = eval("(" + data + ")");
			if (data.status == 'OK') {
				$('#dv_edit_sb').fadeIn(10);
				$('.dv_theft').fadeIn(10);
				$('#butt_close_sb').fadeOut(10);
				$('#butt_save_theft').fadeOut(10);
				$('#datain').val(data.data.datain);
				$('#firm_id').val(data.data.firm_id);
				$('#notes_theft').val(data.data.notes);
				$('#persona_kod1c_theft').val(data.data.persona_kod1c);
				$('#summ_d').val(data.data.summ_d);
				$('#subject_theft').val(data.data.subject_theft);
			//	$('#theft_data').val(data.data.theft_data);
				$('#summ').val(data.data.summ);
				$('#tmc').val(data.data.tmc);
				$('#reaction').val(data.data.reaction);
				$('#summ_h').val(data.data.summ_h);
				$('#ListGroup').val(data.data.object_id);
				//$('#persona_kod1c_theft').attr("disabled","");
				//$('#notes_theft').attr("disabled","");
				$('#loader').fadeIn(300);
				$('#loader').fadeOut(500);
                $('#datain').attr('disabled',true);
                $('#firm_id').attr('disabled',true);
                $('#ListGroup').attr('disabled',true);
				//Block()
    var now= new Date(); 
    var _month=(now.getMonth()); 
       
    var date_c = $('#datain').val(); 
      //  alert(_month);
    
    arr = date_c.split('-');
    dateObj=new Date(arr[0],arr[1],arr[2]);
        
    
    var month_oper = dateObj.getMonth();               
  //  alert(month_oper);                                        
              
                 
                   if(month_oper < _month)
                {
            
                    $('#butt_save_theft_edit').fadeOut(10);                     
                    
                }   
            }
        },
		"html"
	);
	// alert(lastSel);
	//$('#dv_theft').fadeIn(1000);
	//$('#dv_list').fadeOut(1000);
	oper='add';
	$('#id_zvit_theft').val(lastSel);
	// alert(lastSel);
};

// Див трудовой дисциплины
function Dv_labor (id) {
    $.post (dir+'/edit_sb_labor.php',
		{ 'id': id, 'oper': 'get'},
		function (data) {
			var data = eval("(" + data + ")");
			if (data.status == 'OK') {
				$('#dv_edit_sb').fadeIn(10);
				$('.dv_labor').fadeIn(10);
				$('#butt_close_sb').fadeOut(10);
				$('#butt_save_labor').fadeOut(10);
				$('#datain').val(data.data.datain);
				$('#firm_id').val(data.data.firm_id);
				$('#notes_labor').val(data.data.notes);
				$('#persona_kod1c_labor').val(data.data.persona_kod1c);
				$('#ListGroup').val(data.data.object_id);
				$('#subject_labor').val(data.data.subject_labor);
			//	$('#labor_data').val(data.data.labor_data);
				$('#reaction_labor').val(data.data.reaction_labor);
				$('#summ_d_labor').val(data.data.summ_d_labor);
				$('#type_labor').val(data.data.type_labor);
				//$('#persona_kod1c_labor').attr("disabled","");
				//$('#notes_labor').attr("disabled","");
				$('#loader').fadeIn(300);
				$('#loader').fadeOut(500);
                $('#datain').attr('disabled',true);
                $('#firm_id').attr('disabled',true);
                $('#ListGroup').attr('disabled',true);
				//Block()
    var now= new Date(); 
    var _month=(now.getMonth()); 
       
    var date_c = $('#datain').val(); 
      //  alert(_month);
    
    arr = date_c.split('-');
    dateObj=new Date(arr[0],arr[1],arr[2]);
        
    
    var month_oper = dateObj.getMonth();               
  //  alert(month_oper);                                        
              
                 
                   if(month_oper < _month)
                {
            
                    $('#butt_save_labor_edit').fadeOut(10);                     
                    
                }   
            }
        },
		"html"
	);
	// alert(lastSel);
	//$('#dv_labor').fadeIn(1000);
	//$('#dv_list').fadeOut(1000);
	oper='add';
	$('#id_zvit_labor').val(lastSel);
	// alert(lastSel);
};

// Див приемки ТМЦ
function Dv_tmc (id) {
    $.post (dir+'/edit_sb_tmc.php',
		{ 'id': id, 'oper': 'get'},
		function (data) {
			var data = eval("(" + data + ")");
			if (data.status == 'OK') {
				$('#dv_edit_sb').fadeIn(10);
				$('.dv_tmc').fadeIn(10);
				$('#butt_close_sb').fadeOut(10);
				$('#butt_save_tmc').fadeOut(10);
				$('#datain').val(data.data.datain);
				$('#firm_id').val(data.data.firm_id);
				$('#firm_tmc').val(data.data.persona_kod1c);
				$('#notes_tmc').val(data.data.notes);
				$('#ListGroup').val(data.data.object_id);
				$('#subject_tmc').val(data.data.subject_tmc);
				$('#summ_tmc_p').val(data.data.summ_tmc_p);
				$('#tmc_type').val(data.data.tmc_type);
				$('#disturbance_type').val(data.data.disturbance_type);
				$('#summ_tmc_n').val(data.data.summ_tmc_n);
				//$('#firm_tmc').attr("disabled","");
				//$('#notes_tmc').attr("disabled","");
				$('#loader').fadeIn(300);
				$('#loader').fadeOut(500);
                $('#datain').attr('disabled',true);
                $('#firm_id').attr('disabled',true);
                $('#ListGroup').attr('disabled',true);
				//Block()
    var now= new Date(); 
    var _month=(now.getMonth()); 
       
    var date_c = $('#datain').val(); 
      //  alert(_month);
    
    arr = date_c.split('-');
    dateObj=new Date(arr[0],arr[1],arr[2]);
        
    
    var month_oper = dateObj.getMonth();               
  //  alert(month_oper);                                        
              
                 
                   if(month_oper < _month)
                {
            
                    $('#butt_save_tmc_edit').fadeOut(10);                     
                    
                }   
            }
        },
		"html"
	);
	// alert(lastSel);
	//$('#dv_tmc').fadeIn(1000);
	//$('#dv_list').fadeOut(1000);
	oper='add';
	$('#id_zvit_tmc').val(lastSel);
	// alert(lastSel);
};


function SprFirmEdit(){

    var url = dir+'/spr_firms_add1.php?fl=1';
    $.post(url,
            { },
            function(data){
            	$('#firm_id').html(data);
            },
            "html"
    );

};

function Block(){
				$('#datain').attr('disabled',false);
				$('#firm_id').attr('disabled',false);
				$('#ListGroup').attr('disabled',false);
				 };

// Функция закрытия дивов без перезагрузки страницы
function CloseDiv() {
                $("#form_sb").clearForm();
                $('#dv_edit_sb').fadeOut(700);
		        $('.dv_theft').fadeOut(500);
                $('.dv_labor').fadeOut(500);
                $('.dv_secure').fadeOut(500);
                $('.dv_tmc').fadeOut(500);
	 	        $('#list').fadeIn(700);
	 	    //  $('#loader').fadeIn(500);
			//	$('#loader').fadeOut(700);
				$('#list').trigger('reloadGrid');
				$('#butt_close_sb').fadeIn(10);
				$('#butt_close_sb_not').fadeIn(10);
                $('#ListGroup').val('0');
                $('#firm_id').val('0');
             //   $('.blok').empty('');
                $('.blokPoint').empty('');
                $('#persona_kod1c').empty('').fadeIn(10);
                $('#persona_kod1c_theft').empty('').fadeIn(10);
                $('#persona_kod1c_labor').empty('').fadeIn(10);
                $('#persona_kod1c_add').empty('');
                $('#persona_kod1c_theft_add').empty('');
                $('#persona_kod1c_labor_add').empty('');
               
                
                  Block();
};
// фцнкция замены данных для заполнения при смене мероприятия
function LG(){


	                              $('.dv_theft').fadeOut(500);
                                  $('.dv_labor').fadeOut(500);
                                  $('.dv_secure').fadeOut(500);
                                  $('.dv_tmc').fadeOut(500);
                                  $('#butt_close_sb').fadeIn(10);


                                // $('#list').trigger('reloadGrid');
                                //  $('#butt_save').fadeIn(500);

	         switch($("#ListGroup").val()){



	         	case '1':
						  $('#butt_close_sb').fadeOut(10);
						  $('.dv_secure').fadeIn(10);
                          $('#butt_save_secure_edit').fadeOut(10);


                         break;
	         	case '2':
		                   $('#butt_close_sb').fadeOut(10);
		                   $('.dv_theft').fadeIn(10);
		                   $('#butt_save_theft_edit').fadeOut(10);


                         break;

                case '3':
		                   $('#butt_close_sb').fadeOut(10);
		                   $('.dv_tmc').fadeIn(10);
                           $('#butt_save_tmc_edit').fadeOut(10);


                         break;

                case '4':
						    $('#butt_close_sb').fadeOut(10);
						    $('.dv_labor').fadeIn(10);
						    $('#butt_save_labor_edit').fadeOut(10);


                         break;
              };
      };
