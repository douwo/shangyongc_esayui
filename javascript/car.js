//检索
function searchCarNoList(obj,searchObj){
	var car_no = searchObj.textbox('getValue'); //获取值
	obj.datagrid('load',{
	    'car_no': car_no
	});
	}
//重置
function resetForm(obj,searchObj){
	obj.textbox('setValue');
	searchCarNoList(searchObj,obj);
}
//修改
function showCarWindow(obj, url) {
	var row = $(obj).datagrid('getSelected');
	$('#edit').dialog({
		resizable : true,
		modal : true,
		width :1100,
		height:700,  
		left:400,
	    top:100
	});
	if (row == null) {
		$.messager.alert('提示',"请选择一行数据",'info');
	} else {
		$('#edit').dialog('open').dialog('setTitle', '修改').dialog('refresh', url+'?id=' + row.id);
	}
	/** 保存按钮 */
	$("#editOkBtn").unbind();
	$("#editOkBtn").click(function() {
		$('#carUpdateform').form('submit', {
			url : '/gs/carInfo/addCarInfo',
			onSubmit : function() {
				var isValid = $(this).form('validate');
				
				return isValid;
			},
			success : function(data) {
				result = $.parseJSON(data);
				if (result.result=="Y") {
					parent.window.$.messager.show({
						title : '提示',
						msg : result.msg
					});
				} else {
					parent.window.$.messager.show({
						title : '提示',
						msg : result.msg
					});
				}
				$('#edit').dialog('close');
				$("#carUpdataTable").datagrid('reload');
			}
		});
	});
	/** 取消按钮 */
	$("#editCancelBtn").unbind();
	$("#editCancelBtn").click(function() {
		$('#edit').dialog('close');
	});
}
function getOwnerName(value,row,index){
	return value.name;
}

function delCarWindow(obj, url){
	var row = $(obj).datagrid('getSelected');
	if (row == null) {
		$.messager.alert('提示',"请选择一行数据",'info');
	} else {
		$.messager.confirm('提示','是否删除车辆相关信息',function(r){
			if(r){
				$.post('/gs/carInfo/delCarById',{car_id:row.id},function(data){
					parent.window.$.messager.show({
						title : '提示',
						msg : data.msg
					});
					$("#carUpdataTable").datagrid('reload');
				})
			}
		})
	}
}

//删除车辆信息图片
function delCarImg(imgSet_obj,car_id_obj,id){
	  $.messager.confirm('提示','确认删除图片?',function(r){
		  if(r){
			  $.post('/gs/carInfo/delCarInfoImg',{car_img_id:id},function(data){
				  if(data.result=='Y'){
					  reflashImg(imgSet_obj,car_id_obj);
				  }
			  });
		  }
	  })
  }
function reflashImg(imgSet_obj,car_id_obj){
	  $.post('/gs/carInfo/reflashImg',{'car_id':car_id_obj.val()},function(data){
			 aHtml = "<ul class='imgUl'>";
		  $.each(data,function(index,row){
			  aHtml += '<li><a data-magnify="gallery" data-caption="'+row.pic_name+'" href="'+row.pic_url+'"><img width="200"  src="'+row.pic_url+'" alt=""></a>'+
			 '<br><button type="button" onclick="delCarImg($(\''+imgSet_obj.selector.trim()+'\'),$(\''+car_id_obj.selector.trim()+'\'),'+row.id+')">删除</button></li>';
		  });
		  aHtml+="</ul>";
		  imgSet_obj.html(aHtml);
	  });
  }