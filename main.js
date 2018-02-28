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