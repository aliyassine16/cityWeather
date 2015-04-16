var app = angular.module('ngAppCityWeather',[]);

app.controller('ngAppCityWeatherController',function($scope, $http){

	// define the default cities in the UK defined the file cities.js
	$scope.cities = defaultCities;
	
	// weather details Json array
	$scope.weatherDetails = null;

	$scope.isLoaded=false;

	$scope.isContentLoading=false;

	$scope.isErrorOccured=false;

	

	// sort temperature in an ascending order
	$scope.sortAsc = function() {
		  $scope.cities.sort(function (a, b) {
			  if (a.temperature > b.temperature) {
			    return 1;
			  }
			  if (a.temperature < b.temperature) {
			    return -1;
			  }
			  // a must be equal to b temperature
			  return 0;
			});

	};

	// sort temperature in a descending order
	$scope.sortDesc = function() {
		  $scope.cities.sort(function (a, b) {
			  if (a.temperature < b.temperature) {
			    return 1;
			  }
			  if (a.temperature > b.temperature) {
			    return -1;
			  }
			  // a must be equal to b temperature
			  return 0;
			});

	};

	$scope.reset =function(){
		$scope.weatherDetails=null;		
	}

	$scope.loadWeather =function(cityname){		
		
		$scope.isErrorOccured=false;
		$scope.isLoaded=false;
		$scope.isContentLoading=true;
		
		if(cityname.trim().length==0){
			
			var errorHandler = new ErrorHandler('City name is incorrect !!');			
			errorHandler.showError();
			$scope.isErrorOccured=true;
			$scope.isContentLoading=false;
			$scope.isLoaded=false;
			return;
		}
		
		var urlFormatter = new UrlFormatter();
		var url=urlFormatter.getWeatherURL(cityname);		
		$http.get(url)		
         .success(function (data) {
         	//alert(JSON.stringify(data));
             $scope.weatherDetails = data;
             if(data.cod=='404'){

             	var errorHandler = new ErrorHandler('City Name does not exist');			
				errorHandler.showError();
             	$scope.isErrorOccured=true;
				$scope.isContentLoading=false;
				$scope.isLoaded=false;
             }else{

             	

             	// update temperature in the cities array in order to make soting easier	
             	$scope.updateTemperature();


             	// hide the loader and show the content
             	$scope.isContentLoading=false;
				$scope.isErrorOccured=false;
				$scope.isLoaded=true;

             }

         })
         .error(function (data, status, headers, config) {
             //  alert error             
            var errorHandler = new ErrorHandler('Error occurred while retrieving weather information!! Please check your connection!!');			
			errorHandler.showError();
			$scope.isErrorOccured=true;
			$scope.isContentLoading=false;
			$scope.isLoaded=false;
             
         });
         

	};

	$scope.updateTemperature =function(){
		
		if($scope.weatherDetails!=null && $scope.cities!=null){

			for (var i = 0; i < $scope.cities.length; i++) {
				if($scope.cities[i].name==$scope.weatherDetails.name){
					$scope.cities[i].temperature=$scope.weatherDetails.main.temp;
					//alert($scope.cities[i].name+' is now'+$scope.cities[i].temperature);
					break;
				}
			};		
			
		}

	};

});
