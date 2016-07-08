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
    displaySearchResults(jsonParse);
}

// STEP 3 - using the JSON response (videos), populate the relevant part of your HTML with the variable inside the JSON

function displaySearchResults(songs) {
    var buildTheHtmlOutput = "";
    $.each(songs, function (index, response) {
        // append li to ul
        //buildTheHtmlOutput += "<li><p>" + response.title + "<a href='response.permalink_url'/></a>" + "</p></li>";
        //buildTheHtmlOutput += "<li><a href='" + response.permalink_url + "'>" + response.title + "</a></li>";
        buildTheHtmlOutput += "<li>";
        buildTheHtmlOutput += "<a href='" + response.permalink_url + "'>" + response.title + "</a>";
        buildTheHtmlOutput += "<img src='" + response.blah + "' title='' alt=''/>";
        buildTheHtmlOutput += "</li>";
    });
    $("#search-results ul").html(buildTheHtmlOutput);
};
