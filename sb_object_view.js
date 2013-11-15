var dir='<?php print $fl?>/scripts';
var lastSel='';
 $(document).ready(function() {
		   ListPay();

 });

function ListPay(){
if(!xls) var xls=0;

        jQuery("#list").jqGrid({
            url:dir+'/sb_object_view_mass1.php',
            datatype: 'json',
            postData:{ 'xls':xls },
		    loadComplete:function(id){  },
            mtype: 'POST',
            width:'100%',
            height:'100%',
            colNames:[ 'Предприятие','Ответственный' ],
            colModel :[
                  { name:'name', index:'otv.name', align:'left', width:300,search:false, editable:true,
	   						stype: 'select',
      						searchoptions: {
							defaultValue: "",
							dataUrl:	dir+'/spr_firms.php'
						 },
				edittype:'select',
				editoptions:{
					defaultValue: "",
					dataUrl: dir+'/spr_firms.php?fl=2',
				}
                  }
                 ,{ name:'fio', index:'otv.fio', align:'left', width:350, search:false, editable:true }
                 
                ],
            pager: '#pager',
            rowNum:50,            
            rowList:[5,10,20,30,50,70,100],
            sortname: 'otv.name',
            sortorder: "asc",
            viewrecords: true,
            caption: 'Охраняемые объекты по предприятиям-ввод данных',
			footerrow : true,
			subGrid: true,
            userDataOnFooter : true,
			altRows : true,
            rownumbers: true,
            onSelectRow: function(id){
		    lastSel=id;
		        		    },
			editurl: dir+'/edit_otvgps.php',
            subGridOptions: {
                "plusicon"  : "ui-icon-triangle-1-e",
                "minusicon" : "ui-icon-triangle-1-s",
                "openicon"  : "ui-icon-arrowreturn-1-e",
                "reloadOnExpand" : true,
                "selectOnExpand" : true,
            },
            
            subGridRowExpanded: function(subgrid_id, row_id) {
                var subgrid_table_id, pager_id;
                subgrid_table_id = subgrid_id+"_t";
                pager_id = "p_"+subgrid_table_id;

                $("#"+subgrid_id).html("<table id='"+subgrid_table_id+"' class='scroll'></table><div id='"+pager_id+"' class='scroll'></div>");

                jQuery("#"+subgrid_table_id).jqGrid({
                    url:dir+'/sb_object_view_mass_sub.php?firm_id='+row_id,
                    datatype: "json",
                    mtype:"POST",
                    postData:{ },
                    colNames:['id_parent','Населенный пункт','Наименование объекта','Примечание'],
                    colModel:[
                                {name:'id',index:'pla.id', width:10,sortable:true,hidden:true },
                                {name:'name_place',index:'pla.name_place', width:200,sortable:true,hidden:false,editable:true, align:"left" },                                
                                {name:'name_object',index:'pla.name_object', width:210,sortable:true, align:"left",editable:true},                                
                                {name:'notes',index:'pla.notes', width:230,sortable:true,hidden:false,editable:true,edittype:'textarea', align:"left" },
                              ],
                    rowNum:30,
                    height: '100%',
                    pager: pager_id,
                    footerrow : true,
                    sortname: 'name_place',
                    sortorder: "asc",
                    height: '100%',
                    editurl:dir+'/edit_sb_object_view.php?firm_id='+row_id,
                    userDataOnFooter : true,
                    altRows : true,
                    footerrow : true,
                    userDataOnFooter : true,

                });
               

                 $("#"+subgrid_table_id).jqGrid('navGrid','#'+pager_id,
                                { edit:true, add:true, del:true, search:false },
                                { height:300,width:450, reloadAfterSubmit:true,closeAfterAdd:true,closeAfterEdit:true }, //options
                                { height:300,width:450, reloadAfterSubmit:true,closeAfterAdd:true,closeAfterEdit:true }, // edit options
                                { height:300,width:450, reloadAfterSubmit:true,closeAfterAdd:true,closeAfterEdit:true }, // add options
                                { reloadAfterSubmit:true }, // del options
                                {  } // search options
                      );

            }              
            
            
            
        });
			jQuery("#list").jqGrid('navGrid','#pager',
				{ edit:false, add:false, del:false, search:false },
				{ }, // use default settings for edit
				{ },
				{ }, // use default settings for add
				{ },  // delete instead that del:false we need this
				{ }
			);

		 $("#list").jqGrid('filterToolbar',{ autoseaach:true, searchOnEnter : false, stringResult: true, defaultSearch:'cn' });
       
}
