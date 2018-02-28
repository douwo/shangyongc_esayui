var zj = zj || {};

/*$.fn.panel.defaults.loadingMessage = '加载中....';
$.fn.datagrid.defaults.loadMsg = '加载中....';*/

//自定义扩展错误提示，发生错误时进行提示
var easyuiErrorFunction=function(XMLHttpRequest){
	$.messager.progress('close');
	$.messager.alert('错误',XMLHttpRequest.responseText);
};
//扩展自定义方法
/*$.fn.datagrid.defaults.onLoadError=easyuiErrorFunction;
$.fn.tree.defaults.onLoadError=easyuiErrorFunction;
$.fn.treegrid.defaults.onLoadError=easyuiErrorFunction;
$.fn.form.defaults.onLoadError=easyuiErrorFunction; 
$.fn.combobox.defaults.onLoadError=easyuiErrorFunction;
$.fn.combogrid.defaults.onLoadError=easyuiErrorFunction;*/
/*
* 
* panel关闭时回收内存，主要用于layout使用iframe嵌入网页时的内存泄漏问题
*/
/*$.fn.panel.defaults.onBeforeDestroy = function() {
	var frame = $('iframe', this);
	try {
		if (frame.length > 0) {
			for ( var i = 0; i < frame.length; i++) {
				frame[i].src = '';
				frame[i].contentWindow.document.write('');
				frame[i].contentWindow.close();
			}
			frame.remove();
			if (navigator.userAgent.indexOf("MSIE") > 0) {// IE特有回收内存方法
				try {
					CollectGarbage();
				} catch (e) {
				}
			}
		}
	} catch (e) {
	}
};*/
/**
*
* @requires jQuery,EasyUI
*
* 扩展validatebox，添加验证功能
*/
/*$.extend($.fn.validatebox.defaults.rules, {
   eqPwd : {
       validator : function(value, param) {
           return value == $(param[0]).val();
       },
       message : '密码不一致！'
   },
   idcard : {// 验证身份证
       validator : function(value) {
           return /^\d{15}(\d{2}[A-Za-z0-9])?$/i.test(value);
       },
       message : '身份证号码格式不正确'
   },
   minLength: {
       validator: function(value, param){
           return value.length >= param[0];
       },
       message: '请输入至少（2）个字符.'
   },
   length:{validator:function(value,param){
       var len=$.trim(value).length;
           return len>=param[0]&&len<=param[1];
       },
       message:"输入内容长度必须介于{0}和{1}之间."
   },
   phone : {// 验证电话号码
       validator : function(value) {
           return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);
       },
       message : '格式不正确,请使用下面格式:010-88888888'
   },
   mobile : {// 验证手机号码
       validator : function(value) {
           return /^(13|15|18)\d{9}$/i.test(value);
       },
       message : '手机号码格式不正确'
   },
   intOrFloat : {// 验证整数或小数
       validator : function(value) {
           return /^\d+(\.\d+)?$/i.test(value);
       },
       message : '请输入数字，并确保格式正确'
   },
   currency : {// 验证货币
       validator : function(value) {
           return /^\d+(\.\d+)?$/i.test(value);
       },
       message : '货币格式不正确'
   },
   qq : {// 验证QQ,从10000开始
       validator : function(value) {
           return /^[1-9]\d{4,9}$/i.test(value);
       },
       message : 'QQ号码格式不正确'
   },
   integer : {// 验证整数
       validator : function(value) {
           return /^[+]?[1-9]+\d*$/i.test(value);
       },
       message : '请输入整数'
   },
   age : {// 验证年龄
       validator : function(value) {
           return /^(?:[1-9][0-9]?|1[01][0-9]|120)$/i.test(value);
       },
       message : '年龄必须是0到120之间的整数'
   },
   chinese : {// 验证中文
       validator : function(value) {
           return /^[\Α-\￥]+$/i.test(value);
       },
       message : '请输入中文'
   },
   english : {// 验证英语
       validator : function(value) {
           return /^[A-Za-z]+$/i.test(value);
       },
       message : '请输入英文'
   },
   unnormal : {// 验证是否包含空格和非法字符
       validator : function(value) {
           return /.+/i.test(value);
       },
       message : '输入值不能为空和包含其他非法字符'
   },
   username : {// 验证用户名
       validator : function(value) {
           return /^[a-zA-Z][a-zA-Z0-9_]{5,15}$/i.test(value);
       },
       message : '用户名不合法（字母开头，允许6-16字节，允许字母数字下划线）'
   },
   faxno : {// 验证传真
       validator : function(value) {
           return /^((\(\d{2,3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}(\-\d{1,4})?$/i.test(value);
       },
       message : '传真号码不正确'
   },
   zip : {// 验证邮政编码
       validator : function(value) {
           return /^[0-9]\d{5}$/i.test(value);
       },
       message : '邮政编码格式不正确'
   },
   ip : {// 验证IP地址
       validator : function(value) {
           return /d+.d+.d+.d+/i.test(value);
       },
       message : 'IP地址格式不正确'
   },
   name : {// 验证姓名，可以是中文或英文
           validator : function(value) {
               return /^[\Α-\￥]+$/i.test(value)|/^\w+[\w\s]+\w+$/i.test(value);
           },
           message : '请输入姓名'
   },
   msn:{
           validator : function(value){
               return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value);
           },
           message : '请输入有效的msn账号(例：abc@hotnail(msn/live).com)'
   }
});*/
/**
 * 将form表单的值序列化为对象,传入值为form表单名称,获取方式$("#fromId").from()
 */
zj.serializeObject = function(form) {
	var b;
	var o = {};
	$.each(form.serializeArray(), function(index) {
		if (o[this['name']]) {
			b=1;
			o[this['name']] = o[this['name']] + "," + this['value'];
		} else {
			b=0;
			o[this['name']] = this['value'];
		}
	});
	return o;
};
/**
 * 扩展datagrid的editor编辑类型datatimebox
 */
/*$.extend($.fn.datagrid.defaults.editors,
				{
					datetimebox : {
						init : function(container, options) {
							var editor = $('<input />').appendTo(container);
							options.editable=false;
							editor.datetimebox(options); //转化为datatimebox属性
							return editor;
						},
						destroy : function(target) {
							$(target).datetimebox('destroy');
						},
						getValue : function(target) {
							return $(target).datetimebox('getValue');
						},
						setValue : function(target, value) {
							$(target).datetimebox('setValue',value);
						},
						resize : function(target, width) {
							$(target).datetimebox('resize',width);
						}
					}
				});*/
/**
 * 扩展datagrid方法，使其在新增的时候有编辑属性，修改时无编辑属性
 * $("xxx")addEditor(jq,param),jq为当前对象，param为参数对象
 */
/*$.extend($.fn.datagrid.methods,{
	addEditor:function(jq,param){
		if(param instanceof Array){
			$.each(param,function(index,item){
				var e=$(jq).datagrid('getColumnOption',item.field);
				e.editor=item.editor;
			});
		}else{
			var e=$(jq).datagrid('getColumnOption',param.field);
			e.editor=param.editor;
		}
	},
	removeEditor:function(jq,param){
		if(param instanceof Array){
			$.each(param,function(index,item){
				var e=$(jq).datagrid('getColumnOption',item);
				e.editor={};
			});
		}else{
			var e=$(jq).datagrid('getColumnOption',param);
			e.editor={};
		}
	}
});
*/
/**
 * 
 * @requires jQuery,EasyUI
 * 
 * 创建一个模式化的dialog
 * 
 * @returns $.modalDialog.handler 这个handler代表弹出的dialog句柄
 * 
 * @returns $.modalDialog.xxx 这个xxx是可以自己定义名称，主要用在弹窗关闭时，刷新某些对象的操作，可以将xxx这个对象预定义好
 */
/*$.modalDialog = function(options) {
	if ($.modalDialog.handler == undefined) {// 避免重复弹出
		var opts = $.extend({
			title : '',
			width : 840,
			height : 680,
			modal : true,
			onClose : function() {
				$.modalDialog.handler = undefined;
				$(this).dialog('destroy');
			},
			onOpen : function() {
				$.messager.progress({
					title : '提示',
					text : '数据处理中，请稍后....'
				});
			}
		}, options);
		opts.modal = true;// 强制此dialog为模式化，无视传递过来的modal参数
		return $.modalDialog.handler = $('<div/>').dialog(opts);
	}
};*/


/**
 * @author 夏悸
 * 
 * @requires jQuery,EasyUI
 * 
 * 扩展tree，使其可以获取实心节点
 */
/*$.extend($.fn.tree.methods, {
	getCheckedExt : function(jq) {// 获取checked节点(包括实心)
		var checked = $(jq).tree("getChecked");
		var checkbox2 = $(jq).find("span.tree-checkbox2").parent();
		$.each(checkbox2, function() {
			var node = $.extend({}, $.data(this, "tree-node"), {
				target : this
			});
			checked.push(node);
		});
		return checked;
	},
	getSolidExt : function(jq) {// 获取实心节点
		var checked = [];
		var checkbox2 = $(jq).find("span.tree-checkbox2").parent();
		$.each(checkbox2, function() {
			var node = $.extend({}, $.data(this, "tree-node"), {
				target : this
			});
			checked.push(node);
		});
		return checked;
	}
});*/

/**
 * @author 夏悸
 * 
 * @requires jQuery,EasyUI
 * 
 * 扩展tree，使其支持平滑数据格式
 */
/*$.fn.tree.defaults.loadFilter = function(data, parent) {
	var opt = $(this).data().tree.options;
	var idFiled, textFiled, parentField;
	if (opt.parentField) {
		idFiled = opt.idFiled || 'id';
		textFiled = opt.textFiled || 'text';
		parentField = opt.parentField;
		var i, l, treeData = [], tmpMap = [];
		for (i = 0, l = data.length; i < l; i++) {
			tmpMap[data[i][idFiled]] = data[i];
		}
		for (i = 0, l = data.length; i < l; i++) {
			if (tmpMap[data[i][parentField]] && data[i][idFiled] != data[i][parentField]) {
				if (!tmpMap[data[i][parentField]]['children'])
					tmpMap[data[i][parentField]]['children'] = [];
				data[i]['text'] = data[i][textFiled];
				tmpMap[data[i][parentField]]['children'].push(data[i]);
			} else {
				data[i]['text'] = data[i][textFiled];
				treeData.push(data[i]);
			}
		}
		return treeData;
	}
	return data;
};*/

/**
 * @author 孙宇
 * 
 * @requires jQuery,EasyUI
 * 
 * 扩展treegrid，使其支持平滑数据格式
 */
/*$.fn.treegrid.defaults.loadFilter = function(data, parentId) {
	var opt = $(this).data().treegrid.options;
	var idFiled, textFiled, parentField;
	if (opt.parentField) {
		idFiled = opt.idFiled || 'id';
		textFiled = opt.textFiled || 'text';
		parentField = opt.parentField;
		var i, l, treeData = [], tmpMap = [];
		for (i = 0, l = data.length; i < l; i++) {
			tmpMap[data[i][idFiled]] = data[i];
		}
		for (i = 0, l = data.length; i < l; i++) {
			if (tmpMap[data[i][parentField]] && data[i][idFiled] != data[i][parentField]) {
				if (!tmpMap[data[i][parentField]]['children'])
					tmpMap[data[i][parentField]]['children'] = [];
				data[i]['text'] = data[i][textFiled];
				tmpMap[data[i][parentField]]['children'].push(data[i]);
			} else {
				data[i]['text'] = data[i][textFiled];
				treeData.push(data[i]);
			}
		}
		return treeData;
	}
	return data;
};*/

/**
 * @author 孙宇
 * 
 * @requires jQuery,EasyUI
 * 
 * 扩展combotree，使其支持平滑数据格式
 */
/*$.fn.combotree.defaults.loadFilter = $.fn.tree.defaults.loadFilter;*/

/**
 * @author 孙宇
 * 
 * 接收一个以逗号分割的字符串，返回List，list里每一项都是一个字符串
 * 例如：返回树列表，然后指定${role.resourceIds}值选中
 * var ids = $.stringToList('${role.resourceIds}');
 * if (ids.length > 0) {
	 for ( var i = 0; i < ids.length; i++) {
		if (resourceTree.tree('find', ids[i])) {
		resourceTree.tree('check', resourceTree.tree('find', ids[i]).target);
		}
	  }
	}
 * @returns list
 */
/*$.stringToList = function(value) {
	if (value != undefined && value != '') {
		var values = [];
		var t = value.split(',');
		for ( var i = 0; i < t.length; i++) {
			values.push('' + t[i]); 避免他将ID当成数字 
		}
		return values;
	} else {
		return [];
	}
};*/
function setNullDate(value,index,row){
	if(value=="0000-00-00")
		return "";
	else
		return value;
}

//转换：转换为日期格式(yy-mm)
function changeDateToMonth(value, index, row) {
	return value.substring(0,7);
}


