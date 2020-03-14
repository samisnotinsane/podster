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
            $.each(json.episodes, function (index, episode) {
                $('#up-next').append(
                    '<tr class="up-next-episode">' +
                    '<td>' + '<a href="' + json.episodes[index]['enclosure_url'] + '">' + json.episodes[index]['title'] + '</a>' + '</td>' +
                    '<td>' + json.title + '</td>' +
                    '<td>' + json.episodes[index]['published'] + '</td>' +
                    '</tr>'
                );
            });

            $('.up-next-episode').click(function () {
                $('.player-controls-pane').append(
                    '<audio controls>' +
                    '<source id="player-source" type="audio/mpeg">' +
                    '</audio>'
                );

                const link = $(this)
                    .children()
                    .find('a')
                    .attr('href');
                console.log(link);

                $('#player-source').attr('src', link);
            });
        }
    });
});

