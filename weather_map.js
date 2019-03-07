"use strict";
$(document).ready(function(){

    var lat = "29.4241";
    var long = "-98.4936";
    var url = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/" + darkSkyToken + "/" + lat + "," + long;


    $.get(url).done(function(weather){
        console.log(weather);
            getWeather(weather);
        });

function returnIcon(icon){
    for(var i = 0; i<=weatherObj.length; i++){
            if(icon === weatherObj[i].condition){
                return "<img src=" + weatherObj[i].url + ">";
            }
        }
    }

    $("#search-btn").on("click", function(event){
        lat = $("#input-lat").val();
        long = $("#input-long").val();
        url = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/" + darkSkyToken + "/" + lat + "," + long;
        $.get(url).done(function(weather){
            console.log(weather);
            getWeather(weather);
        });
    });

function getWeather(weather) {
    var html ="";
    for(var i = 0; i <= 2; i++) {
        html += "<div>";
        html += weather.daily.data[i].apparentTemperatureHigh + "/";
        html += weather.daily.data[i].apparentTemperatureLow + "<br>" + returnIcon(weather.daily.data[i].icon) + "<br>";
        html += weather.daily.data[i].summary + "<br>";
        html += weather.daily.data[i].humidity + "<br>";
        html += weather.daily.data[i].windSpeed + "<br>";
        html += weather.daily.data[i].pressure;
        html += "</div>";
    }
    $("#weather-layout").html(html)

}

var weatherObj = [ {
        condition: "clear-day",
        url: "icon/Sun.svg"
                },
    {
        condition: "clear-night",
            url: "icon/Moon.svg"
                },
    {
        condition: "rain",
            url: "icon/Umbrella.svg"
                },
    {
        condition: "snow",
            url: "icon/Snowflake.svg"
                },
    {
        condition: "sleet",
            url: "icon/Cloud-Hail-Alt.svg"
                },
    {
        condition: "wind",
            url: "icon/Wind.svg"
                },
    {
        condition: "fog",
            url: "icon/Cloud-Fog.svg"
                },
    {
        condition: "cloudy",
            url: "icon/Cloud.svg"
                },
    {
        condition: "partly-cloudy-day",
            url: "icon/Cloud-Sun.svg"
                },
    {
        condition:"partly-cloudy-night",
            url: "icon/Cloud-Moon.svg"
                },

]


    /** MAP STUFF **/

    mapboxgl.accessToken = mapboxToken;
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/satellite-streets-v9',
        zoom: 9,
        center: [-98.4936, 29.4241]
    });

    var search = "The Alamo";

    $("#search-btn").on("click", function(){
        var search = $("#search-man").val();
        geocode(search, mapboxToken).then(function(data) {
            long = data[0].toString();
            lat = data[1].toString();
            url = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/" + darkSkyToken + "/" + lat + "," + long;
            $.get(url).done(function(weather) {
                getWeather(weather);
            });
       })

    });

    geocode(search, mapboxToken).then(function(data) {

    function onDragEnd(){
        lat = marker.getLngLat().lat;
        long = marker.getLngLat().lng;
        url = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/" + darkSkyToken + "/" + lat + "," + long;
        $.get(url).done(function(weather){
            console.log(weather);
            getWeather(weather);
        });
    }

        var marker = new mapboxgl.Marker();
        marker.setLngLat(data);
        marker.addTo(map);
        marker.setDraggable(true);
        marker.on("dragend", onDragEnd);

    });




















});