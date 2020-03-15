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


function initPodcastDescr(container, description) {
    $('#show-description').text(description);
    container.css({
        'display': 'flex',
        'flex-direction': 'column',
        'width': '80%'
    });
}


function initPodcastEpisodes(container, episodes) {
    $.each(episodes, function (index, episode) {
        container.append(
            '<tr>' +
            '<td>' + episode['title'] + '</td>' +
            '<td>' + episode['published'] + '</td>' +
            '<td>' + episode['enclosure_length'] + '</td>' +
            '</tr>'
        );
    });
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
        $.getJSON("/api/podcast/" + $('.show-meta h3').text(), function (jsonResponse) {
            initPodcastDescr($('.show-meta'), jsonResponse['description']);
            initPodcastEpisodes($('#episode-table'), jsonResponse['episodes']);
        });
    }

});

