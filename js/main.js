/*
	get app to display default location on load
	create celcius and farenheit functions
	bind them to the ui buttons

	save speed and direction to variables
	map speed value according to wind speed
	update direction with speed direction
	
*/

$(document).ready(function(){
	var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
	var apiKey = '36edb0f1d925733bbb0dbf023b0d1ad9';
	var city = 'London';
	var newCity;
	var newTemp;
	var tempCelsius;
	var tempFarenheit;
	// var city = 'london';

	var updateCityName = function(newCity){
		$('#current-city').text(newCity);
	};




	$.ajax({
		   	url: weatherUrl + city + '&appid=' + apiKey,
		   	success: function (response){

			var temp = response.main.temp;

			var tempCelsius = Math.floor (temp - 273.15);
			var tempFarenheit = Math.floor(temp * 9/5 - 459.67);

			console.log(tempCelsius,tempFarenheit);

			$('#weather-container').append("<p id= 'current-weather'class='display-3'>" + tempCelsius + "C˚");
			$('#weather-container').append("<p id= 'current-city' class='display-3'>"+city+"</p>");

			}
			    
		});
	
	$('form').submit(function(event){
		event.preventDefault();

		var newCity = $('#city-name').val();

		var updateTemp = function () {
			
			$.ajax({

				url: weatherUrl + newCity + '&appid=' + apiKey,
				success: function (response){

					var newTemp = response.main.temp;
					console.log(newTemp, newCity);
					var newTempCelsius = Math.floor (newTemp - 273.15);

					var	changeTempOnScreen = function (){
						$('#current-weather').text(newTempCelsius + 'C˚');
					};

					changeTempOnScreen(newTemp);	

					return newTemp;

				}


			});
			
		

		};	
		
   		
   		updateCityName(newCity);
   		updateTemp(newTemp);

   		
   		


	});

	// window.settings.something = 'stuff';
	
  	var particleSpeed = settings.particles.move.speed;
  	console.log(particleSpeed);


});

