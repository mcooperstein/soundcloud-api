$(document).ready(function () {

    $('#spin-record').hide();
    $('#trackInfos').hide();

});

function audioResults() {
    // should have a comment telling the next developer what this function does
    var search = document.getElementById("search").value; // you used single quotes above, double here. SHould be consistent throughout
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
    displaySearchResults(jsonParse);
}
// step 3? Where's 1 and 2? Remove if not needed
// STEP 3 - using the JSON response (videos), populate the relevant part of your HTML with the variable inside the JSON

function displaySearchResults(songs) {
    // ditto on comment, should also include what the parameters are, i.e. @param: songs - array of strings
    var buildTheHtmlOutput = "";
    $.each(songs, function (index, response) {
        var locationId = "onclick='location.href=\"" + response.permalink_url + "\"'";
        // append li to ul    remove the commented stuff if you don't need it. 
        //buildTheHtmlOutput += "<li><p>" + response.title + "<a href='response.permalink_url'/></a>" + "</p></li>";
        //buildTheHtmlOutput += "<li><a href='" + response.permalink_url + "'>" + response.title + "</a></li>";
        buildTheHtmlOutput += "<li>";
        buildTheHtmlOutput += "<p>" + response.title + "</p>";
        //buildTheHtmlOutput += "<a href='" + response.permalink_url + "'>" + response.title //+ "</a>";
        buildTheHtmlOutput += "<img src='" + response.artwork_url + "' width='200' height='200' title='' alt=''/>";
        //buildTheHtmlOutput += "</a>";
        //buildTheHtmlOutput += "<a href='" + response.permalink_url + "'>";
        //buildTheHtmlOutput += "<div id='button-center'>";
        buildTheHtmlOutput += "<button id='playButton' type='button' " + locationId + ">";
        buildTheHtmlOutput += "&#9658; Play Track!";
        buildTheHtmlOutput += "</button>";
        //buildTheHtmlOutput += "</div>";
        //buildTheHtmlOutput += "</a>";
        buildTheHtmlOutput += "</li>";
    });
    $("#search-results ul").html(buildTheHtmlOutput);
};

(function () {// why an IIFE and $(document).ready? They do similar things
// list of vars an be shortened like : var AudioContext, audio, audioContext, sourece, streamURL;

    var AudioContext;// naming is important. why 2 things with the same name, different case? good way to slip up and use/re-write the wrong variable. 
    var audio;
    var audioContext;
    var source;
    var streamUrl;

    function initAudio(streamUrl) {
        // comment on functionality and params
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
                // you assume here that you'll always get a good response... what happens if there's an error? 
                var trackInfo = JSON.parse(response);
                streamUrl = trackInfo.stream_url + "?" + clientParameter;
            });
    };

    function playButton_Clicked() {
        audio.src = streamUrl;
        audio.play();
        document.getElementById("playButton").addEventListener("click", startButton_Clicked); // why native JS here, instead of jQuery like 2 lines below? 
        findTrack();
        initAudio();
        $('#spin-record').show();
        //slider.value = 0;
    };

})();
