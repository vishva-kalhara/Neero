const render = async function (curr, page, param) {
	const inject_container = document.querySelector(curr);
	const result = await getHandler("widgets/" + page, param);
	inject_container.innerHTML = result;
};

const renderPage = async function (page) {
	window.location.hash = `#${page}`;
};

const renderPageInAction = async function(){
	const hashKey = window.location.hash.slice(1);
	const inject_container = document.querySelector("#root");
	const result = await getHandler(`pages/${hashKey}`);
	inject_container.innerHTML = result;
}



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
		req.open("GET", `./src/php/${file_name}.php?${expression}`);
		req.send();
	});
}

["hashchange", "load"].forEach((ev) => window.addEventListener(ev, renderPageInAction));
