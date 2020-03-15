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
    $.getJSON('/api/podcasts', function (jsonResponse) {
        initRecentlyAdded($('.show-section'), jsonResponse['podcasts']);
    });


    // Up Next
    $('.up-next-container').append(
        '<br><p>You don\'t have any episodes in your queue.</p>'
    );


    // Podcast episodes
    if (top.location.pathname === '/show-detail') {
        const title = $('.show-meta h3').text();
        $.getJSON("/api/podcast/" + title, function (json, status) {

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
    }

});

