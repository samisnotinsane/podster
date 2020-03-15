function initRecentlyAdded(container, items) {
    $.each(items, function (index, item) {
        let coverId = 'cover-' + index;
        container.append(
            "<div class='show-grid-item'>" +
            "<a href='/show-detail" + '?title=' + item['title'] + "'>" +
            "<img id='" + coverId + "' " +
            "src='" + item['image_url'] + "' " +
            "alt='" + item['title'] + "' height='150' width='150'/>" +
            "</a>" +
            "</div>"
        );
    })
}

$(document).ready(function () {

    // Recently Added
    $.getJSON('/api/podcasts', function (jsonResponse, status) {
        initRecentlyAdded($('.show-section'), jsonResponse['podcasts']);
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
                // console.log(link);

                $('#player-source').attr('src', link);
            });
        }
    });
});

