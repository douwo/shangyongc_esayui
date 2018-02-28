var locat = (window.location + '').split('/');
$(function() {
	if ('ds_data_manager' == locat[3]) {
		locat = locat[0] + '//' + locat[2];
	} else {
		locat = locat[0] + '//' + locat[2] + '/' + locat[3];
	}
	;
	
	
	
	
});

/**
 * var SM_TITLE = $("#SM_TITLE").val();
	var TYPE_ID = $("#type_id").val();
	var TEMPLATE_ID = $("#template_id").val();
	var CONTENT = $("#CONTENT").val();
	var DOC_TYPE = $("#DOC_TYPE").val();
 * */

//定义Person构造器
function DsMaterial(id,title,duration,type_id,template_id,content,doc_type,status,is_open) {
  this.id = id;
  this.title = title;
  this.duration = duration;
  this.type_id = type_id;
  this.template_id =template_id;
  this.content = content;
  this.doc_type =doc_type;
  this.question = new Array();
  this.status = status;
  this.is_open = is_open;
}
function DsMaterialQuestion(order,q_content,true_opt_txt,is_multi){
	this.order = order;
	this.q_content = q_content;
	this.is_multi = is_multi;
	this.true_opt_txt = true_opt_txt;
	this.opt = new Array();
}

function DsMaterialQuestionOpt(serial_word,order,o_content,is_true){
	this.serial_word = serial_word;
	this.order = order;
	this.o_content = o_content;
	this.is_true = is_true;
}


//发送
function saveMaterial(status){

	if ($("#DOC_TYPE").val() == "1") {
		$("#CONTENT").val(getContentTxt());
	} else {
		$("#CONTENT").val(getContent());
	}
	if ($("#SM_TITLE").val() == "") {
		$("#SM_TITLE").tips({
			side : 3,
			msg : '请输入资料标题',
			bg : '#AE81FF',
			time : 2
		});
		$("#SM_TITLE").focus();
		return false;
	}
	 var SM_DURATION_VAL = $("#SM_DURATION").val();
	if($("#SM_DURATION").val() == ""){
		$("#SM_DURATION").tips({
			side : 3,
			msg : '请输入学习时长',
			bg : '#AE81FF',
			time : 2
		});
		$("#SM_DURATION").focus();
		return false;
	}else{
		 if(!((/^(\+|-)?\d+$/.test( SM_DURATION_VAL ))&&SM_DURATION_VAL>=0)){  
		        $("#SM_DURATION").tips({
					side : 3,
					msg : '请输入正确的学习时长',
					bg : '#AE81FF',
					time : 2
				});
		        $("#SM_DURATION").val("0");
				$("#SM_DURATION").focus();
				return false;
		   } 
	}
	
	
	if ($("#type_id").val() == "") {
		$("#type_tip").tips({
			side : 3,
			msg : '请选择资料类型',
			bg : '#AE81FF',
			time : 2
		});
		$("#type_id").focus();
		return false;
	}
	if ($("#CONTENT").val() == "") {

		$("#nr").tips({
			side : 3,
			msg : '请输入内容',
			bg : '#AE81FF',
			time : 3
		});
		return false;
	}

	var SM_TITLE = $("#SM_TITLE").val();
	var TYPE_ID = $("#type_id").val();
	var TEMPLATE_ID = $("#template_id").val();
	var CONTENT = $("#CONTENT").val();
	var DOC_TYPE = $("#DOC_TYPE").val();
	var IS_OPEN = $("#is_open").is(':checked');
	if(IS_OPEN){
		IS_OPEN = "1";
	}else{
		IS_OPEN = "0";
	}
	var doc_id = $("#doc_id").val();
	var dsMaterial = new DsMaterial(doc_id,SM_TITLE,SM_DURATION_VAL,TYPE_ID,TEMPLATE_ID,CONTENT,DOC_TYPE,status,IS_OPEN);
	var fmsg = "${pd.msg}";
	var has_true_opt = false;
	$('#question_target').closest("table").find(".ds_question_tr").each(function(i,e){
		var q_content = $($($(e).find(".ds_question").toArray()[0]).find("textarea").toArray()[0]).val();
		var true_opt_txt = $($(e).find(".ds_true_option").toArray()[0]).text();
		var dsMaterialQuestion = new DsMaterialQuestion(i+1,q_content,true_opt_txt,"0");
		var selected_num = 0;
		has_true_opt = false;
		$(e).find(".ds_option").each(function(oi,oe){
			 var serial_word =  $($(oe).find("label").toArray()[0]).text();
			 var o_content =  $($(oe).find("textarea").toArray()[0]).val();
			 var is_true =  $($(oe).find(".ds_opt_box").toArray()[0]).is(':checked');
			 if(is_true){
				 selected_num++;
				 is_true = "1";
				 has_true_opt = true;
			 }else{
				 is_true = "0";
			 }
			var dsMaterialQuestionOpt = new DsMaterialQuestionOpt(serial_word,oi+1,o_content,is_true);
			dsMaterialQuestion.opt.push(dsMaterialQuestionOpt);
		});
		if(!has_true_opt){
			$("#question_target").tips({
				side : 3,
				msg : '请设置正确答案',
				bg : '#AE81FF',
				time : 3
			});
			return false;
		}
		if(selected_num > 1){
			dsMaterialQuestion.is_multi = "1";
		}
		dsMaterial.question.push(dsMaterialQuestion);
	});
	if(dsMaterial.question.length > 0){
		if(!has_true_opt){
			return false;
		}
	}
	$("#zhongxin").hide();
	$("#zhongxin2").show();
	$.ajax({
		type : "POST",
		url : locat + '/ds_data_manager/saveMaterial.do?tm=' + new Date().getTime(),
		data : {
			DATA : JSON.stringify(dsMaterial),
			fmsg : fmsg
		},
		dataType:'json',
		//beforeSend: validateData,
		cache : false,
		success : function(data) {
			var status = data.status;
			var msg = "";
			var bg = "";
			if(status == "error"){
				msg = "保持失败！";
				bg = '#FF0000';
			}else{
				msg = "保持成功！";
				bg = '#68B500';
			}
			$("#msg").tips({
				side : 3,
				msg : msg,
				bg : bg,
				time : 5
			});
			setTimeout("close()", 2000);
//			$.each(data.list, function(i, list) {
//				if (list.msg == 'ok') {
//					var count = list.count;
//					var ecount = list.ecount;
//					$("#msg").tips({
//						side : 3,
//						msg : '成功发出' + count + '条,失败' + ecount + '条,检查邮箱格式',
//						bg : '#68B500',
//						time : 5
//					});
//
//				} else {
//					$("#msg").tips({
//						side : 3,
//						msg : '邮件发送失败,请联系管理员检查邮件服务器配置是否正确!',
//						bg : '#FF0000',
//						time : 5
//					});
//
//				}
//				setTimeout("close()", 8000);
//				timer(7);
//			});
		}
	});

}


function addSingleSelectQ() {
	createSelectQ(false);
}

function addMultiSelectQ() {
	createSelectQ(true);
}
var opt_a_code = 'A'.charCodeAt();

function flushOpt(question,is_multi){
	flushAnswer(question,is_multi);
}

function flushQuestion(){
	$('#question_target').closest("table").find(".ds_question_tr").each(function(index,element){
		var qtxt = $($(element).find(".ds_question").toArray()[0]).find(".textl").toArray()[0];
		$($(qtxt).children("label").toArray()[0]).text("问题"+(index+1));
		$($(element).find(".ds_true_option").toArray()[0]).next().val("question_"+(index+1)+"_type");
		$(element).find(".ds_opt_box").each(function(bi,be){
			$(be).attr("name","question_"+(index+1)+"_type");
		});
	});
}

function flushAnswer(select,is_multi){
	var answer_txt = $(select).closest(".formdiv").children(".ds_true_option").toArray()[0];
	var txt = "";
	$(select).closest(".formdiv").children(".ds_option").each(function(index,element){
		$(element).find(".ds_opt_box").each(function(i,e){
			$(e).next().text(String.fromCharCode(opt_a_code+index)+":");
			if($(e).is(':checked')){
				if(txt == ""){
					txt = $(e).next().text().replace(":","");
				}else{
					txt = txt + ","+$(e).next().text().replace(":","");
				}
			}
		});
	  });
	$(answer_txt).text("你设定的答案是："+txt);
}

function addOption(btn,is_multi){
	var input_name =  $(btn).parent().next().next().val();
	var opt_name = getOptionNumOfQuestion( $(btn).parent().parent());
	var ohtml = '';
	if(!is_multi){
		 ohtml = '<div class="formwull ds_option">'+	
		'<div class="textl"><input type="radio" class="ds_opt_box" name="'+input_name+'" onclick="javascript:flushAnswer(this,'+is_multi+');" /><label>'+opt_name+':</label></div>'+
		'<div class="text_div"><textarea class="textr" rows="" cols="" placeholder="请输入选项内容"></textarea><a class="del_a" onclick="javascript:deleteOption(this,'+is_multi+');">删除</a></div>'+
		'</div>';
	}else{
		 ohtml = '<div class="formwull ds_option">'+	
			'<div class="textl"><input type="checkbox" class="ds_opt_box" name="'+input_name+'" onclick="javascript:flushAnswer(this,'+is_multi+');" /><label>'+opt_name+':</label></div>'+
			'<div class="text_div"><textarea class="textr" rows="" cols="" placeholder="请输入选项内容"></textarea><a class="del_a" onclick="javascript:deleteOption(this,'+is_multi+');">删除</a></div>'+
		'</div>';
	}
	$(btn).parent().before(ohtml);
}

function deleteQuestion(del_btn){
	$(del_btn).closest('tr').remove();
	flushQuestion();
	$("#question_num").val(parseInt($("#question_num").val())-1);
}
function deleteOption(del_o_btn,is_multi){
	var question = $(del_o_btn).closest(".formdiv").children(".ds_question").toArray()[0];
	$(del_o_btn).closest('.ds_option').remove();
	flushOpt(question,is_multi);
}


function createSelectQ(is_multi){
	var qnum = getQuestionNum();
	var qhtml = '<tr class="ds_question_tr">'+
					'<td style="padding-top: 15px;" colspan="2" >'+
						'<div class="formdiv">'+
							'<div class="formwull ds_question">'+						
								'<div class="textl"><label>问题'+qnum+':</label></div>'+
								'<div class="text_div"><textarea name="question_content"  class="textr"  rows="" cols="" placeholder="请输入问题"></textarea><a class="del_a" onclick="javascript:deleteQuestion(this);">X</a></div>'+
							'</div>'+
							'<div class="formwull mb0"><button onclick="javascript:addOption(this,'+is_multi+');"  type="button" class="btn btn-mini btn-success" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">添加选项<span class="glyphicon glyphicon-plus" aria-hidden="true"></span></button></div>'+
							'<div class="formwull tr mb0 ds_true_option">你设定的答案是：</div>'+
							'<input value="question_'+qnum+'_type" type="hidden"/>'+
							'<div class="clear"></div>'+
						'</div>'+
					'</td>'+
				'</tr>';
	$('#question_target').before(qhtml);
}

function getQuestionNum(){
	$("#question_num").val(parseInt($("#question_num").val())+1);
	return $("#question_num").val();
}

function getOptionNumOfQuestion(question){
	return String.fromCharCode(opt_a_code + $(question).closest(".formdiv").children(".ds_option").length);
}

				
//倒计时
function timer(intDiff) {
	window.setInterval(function() {
		$('#second_shows').html('<s></s>' + intDiff + '秒');
		intDiff--;
	}, 1000);
}

function close(){
	top.Dialog.close();
}

function showdiv() {
	$("#zhongxin2").hide();
	$("#zhongxin").show();
}

function setType(value) {
	$("#DOC_TYPE").val(value);
}



//ueditor纯文本
function getContentTxt() {
	var arr = [];
	arr.push(UE.getEditor('editor').getContentTxt());
	return arr.join("");
}
//ueditor有标签文本
function getContent() {
	var arr = [];
	arr.push(UE.getEditor('editor').getContent());
	return arr.join("");
}

