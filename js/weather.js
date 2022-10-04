// Temperature showed in <aside>
const temp = document.getElementById("temp");

// Get current date and hour
let currentDate = new Date();
let currentHour = currentDate.getHours();

// Get the current weather
let getWeather = fetch("https://www.7timer.info/bin/api.pl?lon=-58.3&lat=-34.8&product=civil&output=json")
	.then(response => response.json())
	.then(data => setWeather(data));

function setWeather(data){
	if(currentHour >= 0 && currentHour <= 5){
		temp.firstChild.data = data.dataseries[0].temp2m;
	}else if(currentHour >= 6 && currentHour <= 11){
		temp.firstChild.data = data.dataseries[1].temp2m;
	}else if(currentHour >= 12 && currentHour <= 17){
		temp.firstChild.data = data.dataseries[2].temp2m;
	}else if(currentHour >= 18 && currentHour <= 23){
		temp.firstChild.data = data.dataseries[3].temp2m;
	}
};