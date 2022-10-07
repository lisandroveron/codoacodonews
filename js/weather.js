// Get weather table rows
const weatherRow0 = document.getElementById("weatherRow0");
const weatherRow1 = document.getElementById("weatherRow1");
const weatherRow2 = document.getElementById("weatherRow2");
const weatherRow3 = document.getElementById("weatherRow3");
const weatherRow4 = document.getElementById("weatherRow4");
const rows = [weatherRow1, weatherRow2, weatherRow3, weatherRow4];
// Get the temperature element showed in <aside>
const temp = document.getElementById("temp");

// Get current date and hour
let currentDate = new Date();
let currentHour = currentDate.getHours();
console.log(currentDate.getDay());

// Get the current weather
let getWeather = fetch("https://www.7timer.info/bin/api.pl?lon=-58.3&lat=-34.8&product=civil&output=json")
	.then(response => response.json())
	.then(data => setWeather(data));

setDaysRow(currentDate.getDay());

// Function declarations
function setDaysRow(day){
	let i = 0;
	let j = day;
	while(i < 7){
		let dayCell = document.createElement("th");
		switch(j){
			case 0: dayCell.textContent = "Domingo"; break;
			case 1: dayCell.textContent = "Lunes"; break;
			case 2: dayCell.textContent = "Martes"; break;
			case 3: dayCell.textContent = "Miércoles"; break;
			case 4: dayCell.textContent = "Jueves"; break;
			case 5: dayCell.textContent = "Viernes"; break;
			case 6: dayCell.textContent = "Sábado"; break;
		};
		weatherRow0.append(dayCell);
		j += 1;
		if(j == 7){
			j = 0;
		};
		i++;
	};
};

function setWeather(data){
	let i = 0;
	let prec_amount;
	while(i != 28){
		for(let j = 0; j < 4; j++){
			// Transform the index of prec_amount to precipitacion value
			switch(data.dataseries[i].prec_amount){
				case 0: prec_amount = 0; break;
				case 1: prec_amount = 0.25; break;
				case 2: prec_amount = 1; break;
				case 3: prec_amount = 4; break;
				case 4: prec_amount = 10; break;
				case 5: prec_amount = 16; break;
				case 6: prec_amount = 30; break;
				case 7: prec_amount = 50; break;
				case 8: prec_amount = 75; break;
				case 9: prec_amount = "75+"; break;
			};
			// Transform the wind direction from english to spanish initials
			switch(data.dataseries[i].wind10m.direction){
				case "SW": data.dataseries[i].wind10m.direction = "SO"; break;
				case "W": data.dataseries[i].wind10m.direction = "O"; break;
				case "NW": data.dataseries[i].wind10m.direction = "NO"; break;
				default: break;
			}
			// Creating elements
			let row = rows[j].insertCell();
			let img = document.createElement("img");
			let infocell = document.createElement("div");
			let icon1 = document.createElement("img");
			let p1 = document.createElement("p");
			let icon2 = document.createElement("img");
			let p2 = document.createElement("p");
			let icon3 = document.createElement("img");
			let p3 = document.createElement("p");
			// Set the weather icon in each cell based in hour
			if(j == 0 || j == 3){
				// Night
				switch(data.dataseries[i].cloudcover){
					case 1:
					case 2: img.setAttribute("src", "../assets/icons/weather/blackmoon.svg"); break;
					case 3:
					case 4:
					case 5: img.setAttribute("src", "../assets/icons/weather/partialmoon.svg"); break;
					case 6:
					case 7: img.setAttribute("src", "../assets/icons/weather/blackcloud.svg"); break;
					case 8:
					case 9: img.setAttribute("src", "../assets/icons/weather/blackcloudy.svg"); break;
				}
			}else if(j == 1 || j == 2){
				// Day
				switch(data.dataseries[i].cloudcover){
					case 1:
					case 2: img.setAttribute("src", "../assets/icons/weather/blacksun.svg"); break;
					case 3:
					case 4:
					case 5: img.setAttribute("src", "../assets/icons/weather/partialsun.svg"); break;
					case 6:
					case 7: img.setAttribute("src", "../assets/icons/weather/blackcloud.svg"); break;
					case 8:
					case 9: img.setAttribute("src", "../assets/icons/weather/blackcloudy.svg"); break;
				}
			};
			// Setting attributes to elements created
			infocell.setAttribute("class", "infocell");
			icon1.setAttribute("src", "../assets/icons/weather/thermometer.svg");
			icon2.setAttribute("src", "../assets/icons/weather/water.svg");
			icon3.setAttribute("src", "../assets/icons/weather/wind.svg");
			p1.textContent = `${data.dataseries[i].temp2m}°`;
			p2.textContent = `${prec_amount} mm/h`;
			p3.textContent = `${data.dataseries[i].wind10m.direction} ${data.dataseries[i].wind10m.speed}m/s`;
			// Appending elements to the cell
			infocell.append(icon1, p1, icon2, p2, icon3, p3);
			row.append(img, infocell);
			rows[j].append(row);
			i++;
		};
	};
	// Set aside values:
	// For 03:00 am
	if(currentHour >= 0 && currentHour <= 5){
		temp.firstChild.data = data.dataseries[0].temp2m;
		document.querySelectorAll("aside img")[0].attributes.src.value = "../assets/icons/weather/moon.svg";
	// For 09:00 am
	}else if(currentHour >= 6 && currentHour <= 11){
		temp.firstChild.data = data.dataseries[1].temp2m;
		document.querySelectorAll("aside img")[0].attributes.src.value = "../assets/icons/weather/sun.svg";
	// For 15:00 pm
	}else if(currentHour >= 12 && currentHour <= 17){
		temp.firstChild.data = data.dataseries[2].temp2m;
		document.querySelectorAll("aside img")[0].attributes.src.value = "../assets/icons/weather/sun.svg";
	// For 21:00 pm
	}else if(currentHour >= 18 && currentHour <= 23){
		temp.firstChild.data = data.dataseries[3].temp2m;
		document.querySelectorAll("aside img")[0].attributes.src.value = "../assets/icons/weather/moon.svg";
	};
};

// document.querySelectorAll("aside img")[0].attributes.src.value = weatherRow1.querySelectorAll("td:nth-child(2)>img:first-child")[0].attributes.src.value;

// <td>
// 	<img src="../assets/icons/weather/blackmoon.svg" alt="">
// 	<div class="infocell">
// 		<img src="../assets/icons/weather/thermometer.svg" alt="">
// 		<p class="celsius">2°</p>
// 		<img src="../assets/icons/weather/water.svg" alt="">
// 		<p>0.25-1 mm</p>
// 		<img src="../assets/icons/weather/wind.svg" alt="">
// 		<p>SO 2m/s</p>
// 	</div>
// </td>