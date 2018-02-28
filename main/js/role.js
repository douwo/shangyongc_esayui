$(function() {
			$("#rolePageSelect").combobox({
						url : '/gs/coManage/empUpdateRid',
						valueField : 'id',
						textField : 'value',
						onChange : function(n, o) {
							var menuName = $("#menuName").textbox('getValue');
							var menuType = $("#menuTypeSelect")
									.textbox('getValue');
							if (n != "") {
								$("#roleTable").datagrid("load", {
											'role_id' : n,
											'menuName' : menuName,
											'menuType' : menuType
										});
								$("#roleTable").datagrid("showColumn", "id");
								$("#roleTable").datagrid("showColumn",
										"is_using");
							} else {
								$("#roleTable").datagrid("hideColumn", "id");
								$("#roleTable").datagrid("hideColumn",
										"is_using");
								$("#roleTable").datagrid("load", {
											'role_id' : n,
											'menuName' : menuName,
											'menuType' : menuType
										});
							}
						}
					});

			$("#menuTypeSelect").combobox({
						url : '/gs/role/menuType',
						valueField : 'id',
						textField : 'value',
						onChange : function(n, o) {
							var role_id = $("#rolePageSelect")
									.combobox("getValue");
							var menuName = $("#menuName").textbox('getValue');
							var menuType = $("#menuTypeSelect")
									.textbox('getValue');
							if (role_id != "") {
								$("#roleTable").datagrid("load", {
											'role_id' : n,
											'menuName' : menuName,
											'menuType' : menuType
										});
								$("#roleTable").datagrid("showColumn", "id");
								$("#roleTable").datagrid("showColumn",
										"is_using");
							} else {
								$("#roleTable").datagrid("hideColumn", "id");
								$("#roleTable").datagrid("hideColumn",
										"is_using");
								$("#roleTable").datagrid("load", {
											'role_id' : n,
											'menuName' : menuName,
											'menuType' : menuType
										});
							}
						}
					})
		});
function searchRoleTbList() {
	var menuName = $("#menuName").textbox('getValue');
	var role_id = $("#rolePageSelect").combobox("getValue");
	var menuType = $("#menuTypeSelect").textbox('getValue');
	if (role_id != "") {
		$("#roleTable").datagrid("load", {
					'role_id' : role_id,
					'menuName' : menuName,
					'menuType' : menuType
				});
		$("#roleTable").datagrid("showColumn", "id");
		$("#roleTable").datagrid("showColumn", "is_using");
	} else {
		$("#roleTable").datagrid("hideColumn", "id");
		$("#roleTable").datagrid("hideColumn", "is_using");
		$("#roleTable").datagrid("load", {
					'role_id' : role_id,
					'menuName' : menuName,
					'menuType' : menuType
				});
	}
}
// 转换按钮类型
function changeMenuType(value, row, index) {
	if (value == "" || value == null) {
		return "一级模块";
	} else {
		return "二级模块";
	}
}
// 转换状态
function changeUsingType(value, row, index) {
	if (value == "" || value == "N" || value == null) {
		return "未启用";
	} else {
		return "已启用";
	}
}
// 启用、停用模块功能
function updateRoleMenu(value) {
	var rows = $("#roleTable").datagrid("getChecked");
	var menuName = $("#menuName").textbox('getValue');
	var role_id = $("#rolePageSelect").combobox("getValue");
	var menuType = $("#menuTypeSelect").textbox('getValue');

	var ids = [];
	$.each(rows, function(index, item) {
				ids.push(item.id);
			});
	$.ajax({
				url : '/gs/role/changeUsingType',
				type : 'post',
				traditional : true,
				data : {
					'changeUsing' : value,
					'changeRoleId' : role_id,
					'ids' : ids,
					'changeVo' : JSON.stringify(rows)
				},
				success : function(data) {
					if (data.result == "Y") {
						$.messager.alert('提示', "修改成功", 'info');
						$("#roleTable").datagrid('reload', {
									'role_id' : role_id,
									'menuName' : menuName,
									'menuType' : menuType
								});
					}
				}
			});
}
// 检索
function searchRoleTypeList() {
	var name = $("#name").textbox('getValue');
	$('#roleTypeTable').datagrid('load', {
				'r_name' : name
			});
}
// 重置
function resetForm() {
	var name = $("#name").textbox('setValue');
	searchRoleTypeList();
}