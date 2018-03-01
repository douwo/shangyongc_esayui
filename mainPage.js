$(function () {
    $('.easyui-accordion .funItem').click(function () {
        $('.left-nav .funItem').removeClass('select');
        $(this).addClass('select');
    })
    $(".usersTable").tabs({
        fit: true,
        onSelect: function (title, index) {
            $('.left-nav .funItem').each(function () {
                if (title == $.trim($(this).text())) {
                    $('.left-nav .funItem').removeClass('select');;
                    $(this).addClass('select');
                }
                if (title == '首页') {
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
				markPoint: {
					data: [{
							type: 'max',
							name: '最大值'
						},
						{
							type: 'min',
							name: '最小值'
						}
					]
				},
				markLine: {
					data: [{
						type: 'average',
						name: '平均值'
					}]
				}
			},
			{
				name: '最低气温',
				type: 'line',
				data: [1, -2, 2, 5, 3, 2, 0],
				markPoint: {
					data: [{
						name: '周最低',
						value: -2,
						xAxis: 1,
						yAxis: -1.5
					}]
				},
				markLine: {
					data: [{
							type: 'average',
							name: '平均值'
						},
						[{
							symbol: 'none',
							x: '90%',
							yAxis: 'max'
						}, {
							symbol: 'circle',
							label: {
								normal: {
									position: 'start',
									formatter: '最大值'
								}
							},
							type: 'max',
							name: '最高点'
						}]
					]
				}
			}
		]
	};
	myChart.setOption(option);
})

function addTab(title, url) {
    if ($('.usersTable').tabs('exists', title)) {
        $('.usersTable').tabs('select', title);
    } else {
        var content = '<iframe scrolling="auto" frameborder="0"  src="' + url +
            '" style="width:100%;height:100%;"></iframe>';
        $('.usersTable').tabs('add', {
            title: title,
            content: content,
            closable: true
        });
    }
}

function logout() {
    $.messager.confirm('My Title', 'Are you confirm this?', function (r) {
        if (r) {
            alert('confirmed: ' + r);
        }
    });
}