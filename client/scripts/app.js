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

    $scope.currentSelectedMarker;

    $scope.Rating = function(name, title, rating, comment, latitude, longitude, id) {
        this.latitude = latitude;
        this.longitude = longitude;
        this.comment = comment;
        this.name = name;
        this.title = title;
        this.rating = rating;
        this.id = id;
    }

    $scope.sendRating = function(){

        $scope.showErrorMessage = false;

        if (!$scope.isMarkerSet()) {
            $scope.errorMessage = "Please set a marker first";
            $scope.showErrorMessage = true;
        } else {

        return $http.post('/rating', {name: $scope.name, title: $scope.title, rating: $scope.rating, comment: $scope.comment, latitude: $scope.latitude, longitude: $scope.longitude})
                .success(function(response) {
                $scope.name = "";
                $scope.title = "";
                $scope.rating = "";
                $scope.comment = "";
                $scope.successMessage = "You rated it!";
                $scope.showSuccessMessage = true;
                $scope.refreshRatings();
            });

        }
    };

    $scope.refreshRatings = function(){

        $http.get('/rating').success(function (response) {

            $scope.ratings = [];


            for (var i = 0, l = response.length; i < l; i++) {

                $scope.r = response[i];

                $scope.ratings.push(new $scope.Rating($scope.r.name, $scope.r.title, $scope.r.rating, $scope.r.comment,
                    $scope.r.latitude, $scope.r.longitude, $scope.r._id
                ));
            }
            console.log($scope.ratings);

            $scope.ratings.forEach(function (n, i) {


                n.marker = new google.maps.Marker({
                    draggable: false,
                    position: new google.maps.LatLng(n.latitude, n.longitude),
                    map: $scope.map,
                    icon: "../assets/styles/images/cycling.png"
                });


                n.infowindow = new google.maps.InfoWindow({
                    content: '<div class="info-box"><h5 class=info-header>' +
                    n.name +
                    ' said the following about this spot:' + '</h5><br/><h6>' +
                    n.title +
                    '</h6><br/><p>' + 'They rated it a: ' + ' ' + '<b>' +
                    n.rating + '</b>' +
                    '</p><br/><p>'+  '<i>' + "'" +
                    n.comment + "'" + '</i>' + '</p><br/></div>'
                });

                google.maps.event.addListener(n.marker, "click", function () {
                    $scope.currentSelectedMarker = n;
                    n.infowindow.open($scope.map, n.marker);

                });


            });

            return $scope.ratings;

        });

    };


        $rootScope.$on('hideMessages', function(){
        $scope.$apply(function(){
            $scope.showSuccessMessage = false;
            $scope.showErrorMessage = false;
        });

    });

    $scope.refreshRatings();

        //start of map stuff


        $scope.map = new google.maps.Map(document.getElementById('map'), {
            zoom: 13,
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

        $scope.map.setOptions({styles: styles});

        $scope.marker;


            google.maps.event.addListener($scope.map, "click", function(event) {
                $scope.marker = new google.maps.Marker({
                    draggable: false,
                    position: event.latLng,
                    map: $scope.map,
                    animation: google.maps.Animation.DROP,
                    icon: "../assets/styles/images/cycling.png"
                });



                $rootScope.$broadcast("hideMessages");

                $scope.latitude = $scope.marker.getPosition().lat();
                $scope.longitude = $scope.marker.getPosition().lng();



            });

    $scope.isMarkerSet = function() {
        if ($scope.marker === undefined) return false;
        else return true;
    };

}]);//end of controller





