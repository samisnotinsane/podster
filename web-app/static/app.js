$(document).ready(function () {

    $.ajax({
        url: '/api/podcasts',
        cache: false,
        success: function (result) {
            let shows = result['podcasts'];

            console.log(shows.length + ' recently added shows');

            for (let i = 0; i < shows.length; i++) {
                let coverId = 'cover-' + i;
                $('.show-section').append(
                    "<div class='show-grid-item'>" +
                    "<a href='/show-detail" + '?title=' + shows[i]['title'] + "'>" +
                    "<img id='" + coverId + "' " +
                    "src='" + shows[i]['image_url'] + "' " +
                    "alt='" + shows[i]['title'] + "' height='150' width='150'/>" +
                    "</a>" +
                    "</div>"
                );
            }

        }
    });

    const title = $('.show-meta h3').text();
    $.getJSON("/api/show/" + title, function ( json ) {
        console.log(json);
    })


});

