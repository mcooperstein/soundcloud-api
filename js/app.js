//'use strict';

$(document).ready(function () {
    $("#message").hide();
    $("a[href='#page-top']").click(function () {
        $("html, body").animate({
            scrollTop: 0
        }, "slow");
        return false;
    });
});

var songs = "";
var songID = "";

function audioResults() {
    var search = document.getElementById("search").value;
    var xhr = new XMLHttpRequest();
    var jsonParse = "";
    xhr.open("GET", "https://api.soundcloud.com/tracks?client_id=1dff55bf515582dc759594dac5ba46e9&amp;q=" + search, false);
    xhr.addEventListener("load", function () {
        document.getElementById("results").innerHTML = xhr.response;
    }, false);
    xhr.send();
    //console.log(xhr.responseText);
    jsonParse = JSON.parse(xhr.response);
    console.log(jsonParse);
    songs = jsonParse;
    displaySearchResults(songs);
    $("#message").show();
}

//using the JSON response (songs), populate the relevant part of your HTML with the variable inside the JSON

function displayModal(songID) {

    //console.log(songs);
    var buildMoreHtmlOutput = "";
    $.each(songs, function (key, value) {
        if (value.id === songID) {
            SC.initialize({
                client_id: "1dff55bf515582dc759594dac5ba46e9"
            });
            SC.oEmbed(value.permalink_url, {
                maxheight: 200
            }, function (res) {
                $(".embeded").html(res.html);
            });
            buildMoreHtmlOutput += "<div class='embeded'>";
            //buildMoreHtmlOutput += '<iframe src=" ' + value.permalink_url + ' " sandbox="allow-scripts allow-forms" style="border:0px #FFFFFF none;" name="myiFrame" scrolling="no" frameborder="1" marginheight="0px" marginwidth="0px" height="60%" width="80%"></iframe>';
            buildMoreHtmlOutput += "</div>";
            buildMoreHtmlOutput += "<div class='footer'>";
            buildMoreHtmlOutput += "<button type='button' class='close-button' data-dismiss='modal'>";
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
        buildTheHtmlOutput += "<li>";
        buildTheHtmlOutput += "<p>" + response.title + "</p>";
        buildTheHtmlOutput += "<img src='" + response.artwork_url + "' width='200' height='200' title='' alt=''/>";
        /*-- Trying to have play button scroll to modal --*/
        buildTheHtmlOutput += "<a class='play-button' href='#page-top' " + locationId + " data-toggle='modal' data-target='#modal1'>";
        buildTheHtmlOutput += "&#9658; Play Track!";
        buildTheHtmlOutput += "</a>";
        buildTheHtmlOutput += "</li>";
        /* -- Previous mehtod with Button redirecting to soundcloud url --*/
        //var locationId = "onclick='window.open(\"" + response.permalink_url + "\")'";
        //buildTheHtmlOutput += "<button id='playButton' type='button'" + locationId + ">";
        //buildTheHtmlOutput += "<button id='playButton' type='button' onclick=>";
        /*buildTheHtmlOutput += "&#9658; Play Track!";
        buildTheHtmlOutput += "</button>";
        buildTheHtmlOutput += "</a>";*/
    });
    $("#search-results ul").html(buildTheHtmlOutput);
}
