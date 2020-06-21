window.addEventListener('load', ()=> {
	let long;
	let lat;
	let newTemp;
	let tempDescription = document.querySelector(".temperature-description");
	let tempDegree = document.querySelector(".temperature-degree");
	let locationTimezone = document.querySelector(".location-timezone");

	if(navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(position => {
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const proxy = 'https://cors-anywhere.herokuapp.com/';
			const api = `${proxy}https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=99b97e4249633d3afc96c1fcf83743c9`; 

	fetch(api)
		.then(response => {
			return response.json();
		})
		.then(data => {
			console.log(data);
			const { temp, feels_like } = data.main;
			newTemp = temp - 273;
			//Set DOM elements from the API
			tempDegree.textContent = Math.trunc(newTemp);
			locationTimezone.textContent = data.name;
			if (newTemp < 0) {
				tempDescription.textContent = "Wow, its freezing outside!";
			}
			else if (newTemp >= 0 && newTemp <= 30) {
				tempDescription.textContent = "It feels pretty good outside today.";
			}
			else {
				tempDescription.textContent = "Wowee it sure is hot!";
			}
		});	
});

	}
});