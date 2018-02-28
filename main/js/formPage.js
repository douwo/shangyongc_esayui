$("#preLoansTabs").tabs({
			height : $("#funTab .tabs-panels").height() - 60
		});
// form表单新增
function saveForm(formObj, saveUrl, returnUrl) {
	formObj.form('submit', {
				url : saveUrl + '?rnd=' + new Date().getTime(),
				onSubmit : function() {
					if ($("#car_no").textbox('getValue') == "") {
						$.messager.alert('提示', '请输入车牌号!', '');
						return false;
					}
					var isValid = $(this).form('validate');
					if (isValid != false) {
						isValid = isValid;
					}
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
						$("#coTable").datagrid('reload');
					} else {
						$.messager.show({
									title : '提示',
									msg : data.msg
								});
					}
				}

			});
}
