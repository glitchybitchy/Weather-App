/*

- Sign up for openweathermap.org and generate an API key.
- User either $.ajax or $.get to pull weather current data for London
- Print the temperature in console.
- Possible next steps
- 1: Display the temperature in the UI rather than the console
- 2: Display an icon or image depending on the current weather
- 3: add a form prompting user for the city.
- 4: add a toggle for switching between farenheit and celcius

*/

$(document).ready(function(){
	var weatherUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
	var apiKey = '36edb0f1d925733bbb0dbf023b0d1ad9';
	var city = 'london';

	$.ajax({
   	url: weatherUrl + city + '&appid=' + apiKey,
   	success: function (response){
   		console.log(response);
   	}
    
  });

});

// app.init = function(){};

// $(document).ready(app.init);