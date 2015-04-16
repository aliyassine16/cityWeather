
function UrlFormatter() {

    var apiURL = "http://api.openweathermap.org/data/2.5/weather?q={0},uk&units=metric";

    this.getWeatherURL = function(cityname) {
       apiURL =encodeURI(apiURL.replace("{0}", cityname));  
	   //alert(apiURL);
       return apiURL;

    }

}

