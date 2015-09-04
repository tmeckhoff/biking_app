var myApp = angular.module('myApp', ['ngRoute']);

console.log("In the app.js");

myApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
        .when('/home', {
            templateUrl: '/assets/views/routes/home.html',
            controller: 'firstController'
        })
        .otherwise({
            redirectTo: '/home'
        })
}]);

myApp.controller('firstController', ['$scope', '$http', function($scope, $http) {

    $scope.rating = {};
    $scope.ratings = [];

    $scope.sendRating = function(){
        return $http.post('/rating', {title: $scope.title, rating: $scope.rating, comment: $scope.comment, latitude: $scope.latitude, longitude: $scope.longitude})
                .then(alert('You added something'));

    };


    //$scope.viewRatings = function(){
    //    return $http.get('/rating').then(function(response){
    //        if(response.status !== 200){
    //            throw new Error('Failed to get your ratings!')
    //        }
    //        $scope.markerRatings = response.data;
    //        return response.data;
    //    });
    //};
    //viewRatings();

    //start of map stuff


    //This stuff works. Don't touch unless needed.

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: {lat: 44.970697, lng: -93.2614785},
        mapTypeId: google.maps.MapTypeId.ROADMAP
    });



    var styles = [
        {
            "featureType": "administrative",
            "elementType": "labels.text.fill",
            "stylers": [
                {
                    "color": "#444444"
                }
            ]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#f2f2f2"
                }
            ]
        },
        {
            "featureType": "poi",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "all",
            "stylers": [
                {
                    "saturation": -100
                },
                {
                    "lightness": 45
                }
            ]
        },
        {
            "featureType": "road.highway",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "elementType": "all",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [
                {
                    "color": "#46bcec"
                },
                {
                    "visibility": "on"
                }
            ]
        }
    ];

    map.setOptions({styles: styles});

    var marker;


    var html;//need a get from the server to put info from the form and attach it to that particular marker that was added to the map.
    //Also need a delete button here to delete the marker from the map and database.


    google.maps.event.addListener(map, "click", function(event) {
        marker = new google.maps.Marker({
            draggable: false,
            position: event.latLng,
            map: map,
            animation: google.maps.Animation.DROP,
            icon: "../assets/styles/images/cycling.png"
        });

            $scope.latitude = marker.getPosition().lat();
            $scope.longitude = marker.getPosition().lng();



        var infowindow = new google.maps.InfoWindow({
            content: html
        });

        google.maps.event.addListener(marker, "click", function() {
            infowindow.open(map, marker);

        });

        google.maps.event.addListener(infowindow, "closeclick", function() {
            marker.setMap(null);

        });



    });



}]);//end of controller






