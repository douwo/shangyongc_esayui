function timestampToDatetime(value, row, index) {
	if (value == "" || value == null) {
		return "";
	}
	var newDate = new Date();
	newDate.setTime(value);
	var month = newDate.getMonth() + 1;
	var date = newDate.getDate();
	var hours = newDate.getHours();
	var minutes = newDate.getMinutes();
	var secondes = newDate.getSeconds();
	var monthStr = month < 10 ? ("0" + month) : month;
	var dateStr = date < 10 ? ("0" + date) : date;
	var hoursStr = hours < 10 ? ("0" + hours) : hours;
	var minutesStr = minutes < 10 ? ("0" + minutes) : minutes;
	var secondesStr = secondes < 10 ? ("0" + secondes) : secondes;
	return newDate.getFullYear() + "-" + monthStr + "-" + dateStr + " "
			+ hoursStr + ":" + minutesStr + ":" + secondesStr;
}

// 转换：时间戳转换为日期格式(yy-mm-dd)
function timestampToDate(value, row, index) {
	if (value == "" || value == null) {
		return "";
	}
	var newDate = new Date();
	newDate.setTime(value);
	var month = newDate.getMonth() + 1;
	var date = newDate.getDate();
	var hours = newDate.getHours();
	var minutes = newDate.getMinutes();
	var secondes = newDate.getSeconds();
	var monthStr = month < 10 ? ("0" + month) : month;
	var dateStr = date < 10 ? ("0" + date) : date;
	var hoursStr = hours < 10 ? ("0" + hours) : hours;
	var minutesStr = minutes < 10 ? ("0" + minutes) : minutes;
	var secondesStr = secondes < 10 ? ("0" + secondes) : secondes;
	return newDate.getFullYear() + "-" + monthStr + "-" + dateStr;
}
//转换：字符串转换为日期格式(yy-mm-dd)
function stringToDate(value, row, index) {
	if (value == "" || value == null) {
		return "";
	}
	return value.substring(0,10);
}
//转换：字符串转换为日期时间格式(yy-mm-dd hh:MM:ss) 去除末尾的毫秒
function stringToDatetime(value, row, index) {
	if (value == "" || value == null) {
		return "";
	}
	return value.substring(0,value.length-2);
}
// 转换日期格式为yyyy-mm-dd
function dateTow3(date) {
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	var d = date.getDate();
	return y + '-' + m + '-' + 'd';
}
// 输入验证
$.extend($.fn.validatebox.defaults.rules, {
	// 选择框验证
	selectValueRequired : {
		validator : function(value) {
			var reg = /^[0-9a-zA-Z][\u4e00-\u9fa5]{0,10}$/;
			if (value) {
				return reg.test(value);
			} else {
				return true;
			}
		},
		message : "必选项"
	}
})
// 扩展easyui validatebox的两个方法.移除验证和还原验证:用法$('#id').validatebox('remove');
// $('#id').validatebox('reduce');
$.extend($.fn.validatebox.methods, {
	remove : function(jq, newposition) {
		return jq.each(function() {
			$(this).removeClass("validatebox-text validatebox-invalid").unbind(
					'focus.validatebox').unbind('blur.validatebox');
		});
	},
	reduce : function(jq, newposition) {
		return jq.each(function() {
			var opt = $(this).data().validatebox.options;
			$(this).addClass("validatebox-text").validatebox(opt);
		});
	}
});
// 扩展easyui validatebox验证是否相等
$.extend($.fn.validatebox.defaults.rules, {
	equals : {
		validator : function(value, param) {
			return value == $(param[0]).val();
		},
		message : '两次输入不一致.'
	}
});
// 判断后缀(.*)是否为图片
function checkImgType(ths) {
	if (ths == "") {
		return "false";
	} else {
		if (!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(ths)) {
			return "false";
		} else {
			return "true";
		}
	}
}
// 判断后缀(.*)是否为word
function checkWordType(ths) {
	if (ths == "") {
		return "false";
	} else {
		if (!/\.(doc|docx)$/.test(ths)) {
			return "false";
		} else {
			return "true";
		}
	}
}
// 判断后缀(.*)是否为pdf
function checkPdfType(ths) {
	if (ths == "") {
		return "false";
	} else {
		if (!/\.(pdf)$/.test(ths)) {
			return "false";
		} else {
			return "true";
		}
	}
}
// 设置messager confirm按钮中文
$.extend($.messager.defaults, {
	ok : "确定",
	cancel : "取消"
});

$.extend($.fn.validatebox.defaults.rules, {
	// 扩展validatebox 验证是否为空字符串
	isHasSpecialChar : {
		validator : function(value) {
			var pattern = /^[\u4E00-\u9FA5A-Za-z0-9]+$/; 
			if (value) {
				return pattern.test(value);
			} else {
				return true;
			}
		},
		message : "不能包含特殊字符"
	},
	//验证是否为标准车牌号
	isLicenseNo: {
		validator: function(value, param){
			var reg = /^[\u4E00-\u9FA5]{1}[A-Z0-9]{5}[A-Z0-9\u4E00-\u9FA5]{1}$/;
			if (value) {
				return reg.test(value);
			} else {
				return true;
			}
		},
		message: '请输入正确的车牌号格式'
	},
	//验证是否为数字字母格式
	isNumber: {
		validator: function(value, param){
			var reg = /^[0-9a-zA-Z]*$/g;
			if (value) {
				return reg.test(value);
			} else {
				return true;
			}
		},
		message: '请检查格式是否正确'
	},
	//验证是否为数字字母格式
	isDecimal: {
		validator: function(value, param){
			var reg = /^[0-9]+([.]{1}[0-9]{1,2})?$/;
			return reg.test(value);
		},
		message: '请输入最多两位小数的数字'
	},
})

