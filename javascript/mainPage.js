$(function() {
	$('.search-input>input').focusin(function() {
		$('.search-input').css('width', '230px')
	})
	$('.search-input>input').blur(function() {
		$('.search-input').css('width', 'auto')
	})

	$('.easyui-accordion .funItem').click(function() {
		$('.left-nav .funItem').removeClass('select');
		$(this).addClass('select');
	})
	$(".usersTable").tabs({
		fit: true,
		onSelect: function(title, index) {
			$('.left-nav .funItem').each(function() {
				if(title == $.trim($(this).text())) {
					$('.left-nav .funItem').removeClass('select');;
					$(this).addClass('select');
				}
				if(title == '首页') {
					$('.left-nav .funItem').removeClass('select');;
				}
			})
		}
	});
	/*首页图表*/
	var myChart = echarts.init(document.getElementById('Mychart01'));
	option = {
		title: {
			text: '最近15日预警趋势图',
		},
		tooltip: {
			trigger: 'axis'
		},
		legend: {
			data: ['最高气温', '最低气温']
		},
		toolbox: {
			show: true,
			feature: {
				dataZoom: {
					yAxisIndex: 'none'
				},
				dataView: {
					readOnly: false
				},
				magicType: {
					type: ['line', 'bar']
				},
				restore: {},
				saveAsImage: {}
			}
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
		},
		yAxis: {
			type: 'value',
			axisLabel: {
				formatter: '{value} °C'
			}
		},
		series: [{
				name: '最高气温',
				type: 'line',
				data: [11, 11, 15, 13, 12, 13, 10],
			},
			{
				name: '最低气温',
				type: 'line',
				data: [1, -2, 2, 5, 3, 2, 0],
			}
		]
	};
	myChart.setOption(option);
})

function addTab(title, url) {
	if($('#funTab').tabs('exists', title)) {
		$('#funTab').tabs('select', title);
	} else {
		$('#funTab').tabs('add', {
			title: title,
			href: url,
			closable: true
		});
	}
}

function logout() {
	$.messager.confirm('My Title', 'Are you confirm this?', function(r) {
		if(r) {
			alert('confirmed: ' + r);
		}
	});
}