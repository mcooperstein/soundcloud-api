# soundcloud-api
This is a song search engine I developed during my time in Thinkful's Frontend Web Development course, which uses Soundcloud's API

## Introduction
The focus of this project was to learn about API integration. I chose to work with soundcloud's API because I'm an avid user of soundcloud, and the soundcloud API documentation was very thorough and easy to understand. 

## How it Works
The search engine uses a search bar and search button, and when the search button is clicked, it triggers the function that makes the call to the Soundcloud API using xhr (XMLHttp Request). The Soundcloud API then serves the search result data back to the webpage, which then populates a list of matching/related songs along with their respective album covers and a play button corresponding to that song. When the play button is clicked, the displayModal() function is triggered, and the corresponding song is embeded into the webpage, allowing the user to play that song. My previous version's play button used an anchor tag to redirect the user to that song's url on soundcloud's website.

## Known Bugs/Issues
When the play button is pressed the song is embedded below the search bar, towards the top of the page. This could be an issue if the user tries to play a song towards the bottom of the page, since they might not see the song load onto the page above. To make users aware of this potential issue, I have a message display above the search results that states where the song will be embeded. I tried to implement a page-scroll, which would scroll to the embeded song, but that didn't work.
