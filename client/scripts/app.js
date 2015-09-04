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

myApp.controller('firstController', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http) {

    $scope.ratings = [];

    $scope.sendRating = function(){
        return $http.post('/rating', {title: $scope.title, rating: $scope.rating, comment: $scope.comment, latitude: $scope.latitude, longitude: $scope.longitude})
                .success(function(response) {
                $scope.title = "";
                $scope.rating = "";
                $scope.comment = "";
                $scope.successMessage = "You rated it!";
                $scope.showSuccessMessage = true;
                $scope.refreshRatings();
            });

    };

    $scope.refreshRatings = function(){
        return $http.get('/rating').then(function(response){
            if(response.status !== 200){
                throw new Error('Failed to get ratings!');
            }
            $scope.ratings.push(response.data);
            return response.data;

            });
    };
console.log($scope.ratings);


    //for (var i = 0, l = response.length; i < l; i++) {
    //
    //    $scope.r = response[i];
    //
    //
    //    $scope.contentString = '<div class="info-box"><h5>' +
    //        r.title +
    //        ' said:</h5><p>' +
    //        r.rating +
    //        '</p><br/><p>' +
    //        r.comment +
    //        '</p><br/></div>';


        $rootScope.$on('hideMessages', function(){
        $scope.$apply(function(){
            $scope.showSuccessMessage = false;

        });

    });


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




    google.maps.event.addListener(map, "click", function(event) {
        marker = new google.maps.Marker({
            draggable: false,
            position: event.latLng,
            map: map,
            animation: google.maps.Animation.DROP,
            icon: "../assets/styles/images/cycling.png"
        });

        $rootScope.$broadcast("hideMessages");

            $scope.latitude = marker.getPosition().lat();
            $scope.longitude = marker.getPosition().lng();

        var infowindow = new google.maps.InfoWindow({
            content: $scope.contentString
        });

        google.maps.event.addListener(marker, "click", function() {
            infowindow.open(map, marker);

        });

        google.maps.event.addListener(infowindow, "closeclick", function() {
           //do delete functionality here or in a button?

        });



    });




}]);//end of controller






