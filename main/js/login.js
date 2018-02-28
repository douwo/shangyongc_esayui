function login(n, p) {
	$.post("/gs/login", {
		userName : n,
		pwd : p
	}, function(data, status) {
		if (data.result == 'Y') {
			window.location.href = "/gs/main";
		} else {
			alert(data.result);
		}
	});
}