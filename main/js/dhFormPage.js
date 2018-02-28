$("#dhPreLoansTab").tabs({
			height : $("#funTab .tabs-panels").height() - 280
		});
// form表单新增
function saveForm(formObj, saveUrl, returnUrl) {
	formObj.form('submit', {
				url : saveUrl + '?rnd=' + new Date().getTime(),
				onSubmit : function() {
					 var isValid = $(this).form('validate');
					// if (isValid != false) {
					// isValid = isValid;
					// }
					if (isValid) {
						$.messager.progress();
					}
					return isValid;
				},
				success : function(result) {
					$.messager.progress('close');
					data = $.parseJSON(result);
					if (data.result == "Y") {
						$.messager.show({
									title : '提示',
									msg : data.msg
								});
						/*$("#coTable").datagrid('reload');*/
					} else {
						$.messager.show({
									title : '提示',
									msg : data.msg
								});
					}
				}

			});
}

function showUpdateWindow(obj, url) {
	var row = $(obj).datagrid('getSelected');
	if (row == null) {
		$.messager.alert('提示',"请选择一行数据",'info');
	} else {
		$('#edit').dialog('open').dialog('setTitle', '修改').dialog('refresh', url+'?id=' + row.id);
	}
	/** 保存按钮 */
	$("#editOkBtn").unbind();
	$("#editOkBtn").click(function() {
		$('#dhInfoUpdateForm').form('submit', {
			url : '/gs/dhInfo/addDhInfo',
			onSubmit : function(param) {
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
					$('#edit').dialog('close');
					$(obj).datagrid('reload');
				} else {
					parent.window.$.messager.show({
						title : '提示',
						msg : result.msg
					});
					$('#edit').dialog('close');
				}
			}
		});
	});
	/** 取消按钮 */
	$("#editCancelBtn").unbind();
	$("#editCancelBtn").click(function() {
		$('#edit').dialog('close');
	});

}