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
    $.getJSON("/api/show/" + title, function (json, status) {

        if (status === 'success') {
            $('#show-description').text(json.description);
            $('.show-meta').css({
                'display': 'flex',
                'flex-direction': 'column',
                'width': '80%'
            });
            console.log(json);

            $.each(json.episodes, function (index, episode) {
                $('#episode-table').append(
                    '<tr>' +
                    '<td>' + json.episodes[index]['title'] + '</td>' +
                    '<td>' + json.episodes[index]['published'] + '</td>' +
                    '<td>' + json.episodes[index]['enclosure_length'] + '</td>' +
                    '</tr>'
                );
            });
        }
    });

    $.getJSON('/api/show/Podcast', function (json, status) {
        if (status === 'success') {
            console.log(json);
            console.log(json.episodes[0]['title']);
            $.each(json.episodes, function (index, episode) {
                $('#up-next').append(
                    '<tr>' +
                    '<td>' + json.episodes[index]['title'] + '</td>' +
                    '<td>' + json.episodes[index]['published'] + '</td>' +
                    '<td>' + json.episodes[index]['enclosure_length'] + '</td>' +
                    '</tr>'
                );
            });
        }
    });

});

