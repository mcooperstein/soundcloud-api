//'use strict';

$(document).ready(function () {
    $('#message').hide();
    $("a[href='#page-top']").click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, "slow");
        return false;
    });
});

/*var app = angular.module('myApp', []);

angular.controller('MainController', function () {*/

var songs = "";
var songID = "";

function audioResults() {
    var search = document.getElementById("search").value;
    var xhr = new XMLHttpRequest();
    var jsonParse = '';
    xhr.open('GET', "https://api.soundcloud.com/tracks?client_id=1dff55bf515582dc759594dac5ba46e9&amp;q=" + search, false);
    xhr.addEventListener("load", function () {
        document.getElementById("results").innerHTML = xhr.response;
    }, false);
    xhr.send();
    //console.log(xhr.responseText);
    jsonParse = JSON.parse(xhr.response);
    console.log(jsonParse);
    songs = jsonParse;
    displaySearchResults(songs);
    $('#message').show();
}

// STEP 3 - using the JSON response (videos), populate the relevant part of your HTML with the variable inside the JSON

/*function closeModal() {
    $(".modal-content").hide();
};*/

function displayModal(songID) {

    //$('#message').hide();
    console.log(songs);
    var buildMoreHtmlOutput = "";
    $.each(songs, function (key, value) {
        if (value.id === songID) {
            SC.initialize({
                client_id: "1dff55bf515582dc759594dac5ba46e9"
            });
            //$("#embedTrack").click(function () {
            //var player = $("#player");
            SC.oEmbed(value.permalink_url, {
                maxheight: 200
            }, function (res) {
                $(".embeded").html(res.html);
            });
            //});
            /*buildMoreHtmlOutput += "<div class='header'>";
            buildMoreHtmlOutput += "<h3>" + value.title + "</h3>";
            buildMoreHtmlOutput += "</div>";*/
            buildMoreHtmlOutput += "<div class='embeded'>";
            //buildMoreHtmlOutput += '<iframe src=" ' + value.permalink_url + ' " sandbox="allow-scripts allow-forms" style="border:0px #FFFFFF none;" name="myiFrame" scrolling="no" frameborder="1" marginheight="0px" marginwidth="0px" height="60%" width="80%"></iframe>';
            buildMoreHtmlOutput += "</div>";
            buildMoreHtmlOutput += "<div class='footer'>";
            buildMoreHtmlOutput += "<button type='button' class='close-button' data-dismiss='modal'>";
            //buildMoreHtmlOutput += "<button type='button' class='close-button' onclick='closeModal()'>";
            buildMoreHtmlOutput += "Close";
            buildMoreHtmlOutput += "</button>";
            buildMoreHtmlOutput += "</div>";
        }
    });
    console.log(buildMoreHtmlOutput);
    $(".modal-content").html(buildMoreHtmlOutput);
};
//console.log(songs);

function displaySearchResults(songs) {
    var buildTheHtmlOutput = "";


    $.each(songs, function (index, response) {
        songID = response.id;
        var locationId = "onclick='displayModal(" + songID + ")'";
        //var locationId = "onclick='location.href=\"" + response.permalink_url + "\"'";
        //var locationId = "onclick='window.open(\"" + response.permalink_url + "\")'";

        // append li to ul
        //buildTheHtmlOutput += "<li><p>" + response.title + "<a href='response.permalink_url'/></a>" + "</p></li>";
        //buildTheHtmlOutput += "<li><a href='" + response.permalink_url + "'>" + response.title + "</a></li>";
        buildTheHtmlOutput += "<li>";
        buildTheHtmlOutput += "<p>" + response.title + "</p>";
        //buildTheHtmlOutput += "<a href='" + response.permalink_url + "'>" + response.title //+ "</a>";
        buildTheHtmlOutput += "<img src='" + response.artwork_url + "' width='200' height='200' title='' alt=''/>";
        //buildTheHtmlOutput += "</a>";
        //buildTheHtmlOutput += "<a href='" + response.permalink_url + "'>";

        /*-- Trying to creat button link to modal --*/


        buildTheHtmlOutput += "<a class='play-button' href='#page-top' " + locationId + " data-toggle='modal' data-target='#modal1'>";
        //buildTheHtmlOutput += "<a class='play-button' href='#' " + locationId + " data-toggle='modal' data-target='#modal1'>";
        //buildTheHtmlOutput += "<a class='play-button' href='#' " + locationId + " data-toggle='modal' data-target='#modal1' target='#page-top'>";
        buildTheHtmlOutput += "&#9658; Play Track!";
        buildTheHtmlOutput += "</a>";

        /* -- Button redirecting to soundcloud url --*/

        //buildTheHtmlOutput += "<button id='playButton' type='button'" + locationId + ">";
        //buildTheHtmlOutput += "<button id='playButton' type='button' onclick=>";
        /*buildTheHtmlOutput += "&#9658; Play Track!";
        buildTheHtmlOutput += "</button>";
        buildTheHtmlOutput += "</a>";*/
        buildTheHtmlOutput += "</li>";
    });
    $("#search-results ul").html(buildTheHtmlOutput);
}
/*
});



/*(function () {

    var AudioContext;
    var audio;
    var audioContext;
    var source;
    var streamUrl;

    function initAudio(streamUrl) {
        AudioContext = window.AudioContext || window.webkitAudioContext;
        audio = new Audio();
        audio.crossOrigin = "anonymous";
        audioContext = new AudioContext();
        source = audioContext.createMediaElementSource(audio);
        source.connect(audioContext.destination);
        //analyser = audioContext.createAnalyser();
        //source.connect(analyser);
    };

    var trackPermalinkUrl = "";

    function findTrack() {
        get("http://api.soundcloud.com/resolve.json?url=" + trackPermalinkUrl + "&" + clientParameter,
            function (response) {
                var trackInfo = JSON.parse(response);
                streamUrl = trackInfo.stream_url + "?" + clientParameter;
            });
    };

    function playButton_Clicked() {
        audio.src = streamUrl;
        audio.play();
        document.getElementById("playButton").addEventListener("click", startButton_Clicked);
        findTrack();
        initAudio();
        $('#spin-record').show();
        //slider.value = 0;
    };

})();*/
