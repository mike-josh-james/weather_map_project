"use strict";
$(document).ready(function(){

    var url = "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/" + darkSkyToken + "/37.8267,-122.4233";
    $.get(url)

}) ;