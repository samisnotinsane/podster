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


function showDuration(audio) {
    $(audio).bind('timeupdate', function () {
        let secs = parseInt(audio.currentTime % 60);
        let mins = parseInt((audio.currentTime / 60)) % 60;
        if (secs < 10) {
            secs = '0' + secs;
        }
        $('#player-duration').html(mins + ':' + secs);
        let progressWidth = 0;
        if(audio.currentTime > 0) {
            progressWidth = ( (100 / audio.duration) * (audio.currentTime) );
        }
        $('.seeker-bar').css('width', progressWidth + '%');
    });
}


function initPlayer(title, episode) {
    let audio;
    $('#current-name').text(episode['title']);
    $('#current-podcast').text(title);

    // Play button
    $('#player-play').click(function () {
        audio = new Audio(episode['enclosure_url']);
        audio.play();
        // hide play button and show pause once playing
        $('#player-play').hide();
        $('#player-pause').show();
        showDuration(audio);
    });

    // Pause button
    $('#player-pause').click(function () {
        audio.pause();
        // hide pause button and show play once paused
        $('#player-pause').hide();
        $('#player-play').show();
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

            // Play most recent episode
            initPlayer(jsonResponse.title, jsonResponse['episodes'][0]);
        });
    }

});

