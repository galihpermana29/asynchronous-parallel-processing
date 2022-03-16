const baseUrl = 'https://jayasaktiapi.herokuapp.com/';
const instance = axios.create();

instance.interceptors.request.use((config) => {
	config.headers['request-startTime'] = new Date().getTime();
	return config;
});

instance.interceptors.response.use((response) => {
	const currentTime = new Date().getTime();
	const startTime = response.config.headers['request-startTime'];
	response.headers['request-duration'] = currentTime - startTime;
	return response;
});

function fetchingSerial(path, method, data = {}, comments) {
	if (method == 'get') {
		instance
			.get(`${baseUrl}${path}`)
			.then((res) => {
				console.log(
					res.data,
					`time: ${res.headers['request-duration']}ms`,
					comments
				);
			})
			.catch((error) => {
				console.error(`Error`);
			});
	} else {
		instance
			.post(`${baseUrl}${path}`, data)
			.then((res) => {
				console.log(
					res.data,
					`time: ${res.headers['request-duration']}ms`,
					comments
				);
			})
			.catch((error) => {
				console.error(`Error`);
			});
	}
}

// for (let i = 0; i < 5; i++) {
// 	//  simulasi get data USER
// 	fetchingSerial('contents', 'get', {}, 'GET DATA USER');
// 	//  simulasi GET data PENUGASAN
// 	fetchingSerial('news', 'get', {}, 'GET DATA PENUGASAN');
// 	//  simulasi POST PENUGASAN
// 	fetchingSerial(
// 		'contents',
// 		'post',
// 		{
// 			image: 'testing.png',
// 			title: `Berita 2`,
// 			link: 'http://localhost:8080',
// 		},
// 		'POST PENUGASAN'
// 	);
// }

const proms1 = instance.get(`${baseUrl}contents`);
const proms2 = instance.get(`${baseUrl}news`);
const proms3 = instance.post(`${baseUrl}contents`, {
	image: 'tes.png',
	title: `Berita 1`,
	link: 'http://localhost',
});

// for (let i = 0; i < 5; i++) {
// 	Promise.all([proms1, proms2, proms3]).then((res) =>
// 		res.map((res) => {
// 			console.log(
// 				res.data,
// 				`request time: ${res.headers['request-duration']}ms`
// 			);
// 		})
// 	);
// }

