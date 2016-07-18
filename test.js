SC.oEmbed('https://soundcloud.com/mureed-abbas-shah/sami-meri-waar-by-qb-umair', {
maxheight: 200
}, function (res) {
$("#player").html(res.html);
});
});
