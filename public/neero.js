const renderPage = async function (curr, page, param) {
	const inject_container = document.querySelector(curr);
	const result = await getHandler(page, param);
    inject_container.innerHTML = result;
};

function getHandler(file_name, expression) {
	return new Promise((resolve, reject) => {
		const req = new XMLHttpRequest();
		req.onreadystatechange = function () {
			if (req.readyState == 4) {
				if (req.status == 200) {
					const result = req.responseText;

					resolve(result);
				}
			}
		};
		req.open("GET", `./src/php/widgets/${file_name}.php?${expression}`);
		req.send();
	});
}
