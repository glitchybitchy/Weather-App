/*
	get app to display default location on load - done
	update city and temperature on submit - done
	create celcius and farenheit functions - needs refactoring
	bind them to the ui buttons - not done

	save speed and direction to variables - done
	map direction in degrees to cardinal directions - done
	round wind speed in meters per second to an integer
	bind particle speed to wind speed
	bind particle direction to wind direction

	update particle speed on submit
	update particle direction on submit
	style it properly
	
*/

$(document).ready(function(){
	var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
	var apiKey = '36edb0f1d925733bbb0dbf023b0d1ad9';
	var city = 'London';
	var newCity;
	var newTemp;
	var tempCelsius;
	var tempFarenheit;
	
	particleDirection  = window.settings.particles.move.direction;

	var convertedWindDirection = [];



// Updating weather info on screen

	var updateCityName = function(newCity){
		$('#current-city').text(newCity);
	};

	var	changeTempOnScreen = function (newTemp){
		var newTempCelsius = Math.floor (newTemp - 273.15);
		$('#current-weather').text(newTempCelsius + 'C˚');
	};

// Map wind direction from degrees to cardinal 

var defineDirection = function (windDirection) {

	if(windDirection === 0 && windDirection < 22.5){
		windDirection.push('N', 'North', 'top');

	}else if(windDirection > 22.5 && windDirection < 67.5) {
		convertedWindDirection.push('NE', 'Northeast', 'top-right');

	}else if(windDirection > 67.5 && windDirection < 112.5) {
		convertedWindDirection.push('E', 'East', 'right');

	}else if(windDirection > 112.5 && windDirection < 157.5) {
		convertedWindDirection.push('SE', 'Southeast', 'bottom-right');

	}else if(windDirection > 157.5 && windDirection < 202.5) {
		convertedWindDirection.push('S', 'South', 'bottom');

	}else if(windDirection > 202.5 && windDirection < 247.5) {
		convertedWindDirection.push('SW', 'Southwest', 'bottom-left');

	}else if(windDirection > 247.5 && windDirection < 292.5) {
		convertedWindDirection.push('W', 'West', 'left');

	}else if(windDirection > 292.5 && windDirection < 337.5) {
		convertedWindDirection.push('NW', 'Northwest', 'top-left');

	}else{
		convertedWindDirection.push('N', 'North', 'top');
	}
	
};



	$.ajax({
		   	url: weatherUrl + city + '&appid=' + apiKey,
		   	success: function (response){

// Fetch Data

			var temp = response.main.temp;
			var windDirection = response.wind.deg;
			var windSpeed = response.wind.speed;

			console.log(windDirection, windSpeed);

// Convert degrees to directions

			defineDirection(windDirection);

// Set particles to direction
			
			console.log(convertedWindDirection[2]);
			console.log(particleDirection);
			
			particleDirection = convertedWindDirection[2];

// Convert to Celsius or Farenheit

			var tempCelsius = Math.floor (temp - 273.15);
			var tempFarenheit = Math.floor(temp * 9/5 - 459.67);


// Display data on UI

			$('#weather-container').append("<p id= 'current-weather'class='display-3'>" + tempCelsius + "C˚");
			$('#weather-container').append("<p id= 'current-city' class='display-3'>"+city+"</p>");

			}
			    
		});
// Make new request on submit	
	
	$('form').submit(function(event){
		event.preventDefault();

// Set city name to input

		var newCity = $('#city-name').val();

		var updateTemp = function () {
			
			$.ajax({

				url: weatherUrl + newCity + '&appid=' + apiKey,
				success: function (response){
// Fetch new data
					var newTemp = response.main.temp;
					console.log(newTemp, newCity);
					

// Update weather on UI
					

					changeTempOnScreen(newTemp);	
					return newTemp;

				}


			});
			
		

		};	
		
   		
   		updateCityName(newCity);
   		updateTemp(newTemp);


	});


});

