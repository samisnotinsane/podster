function initRecentlyAdded(container, items) {
    $.each(items, function (index, item) {
        let coverId = 'cover-' + index;
        container.append(
            "<div class='show-grid-item' data-name='" + item['title'] + "'>" +
            "<img id='" + coverId + "' " +
            "src='" + item['image_url'] + "' " +
            "alt='" + item['title'] + "' height='150' width='150'/>" +
            "</div>"
        );
    });
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
        if (audio.currentTime > 0) {
            progressWidth = ((100 / audio.duration) * (audio.currentTime));
        }
        $('.seeker-bar').css('width', progressWidth + '%');
    });
}


function initPlayer(title, episodes) {
    let episodeNumber = 0; // 0 is most recent
    let audio;
    $('#current-name').text(episodes[episodeNumber]['title']);
    $('#current-podcast').text(title);


    // Play button
    $('#player-play').click(function () {
        audio = new Audio(episodes[episodeNumber]['enclosure_url']);
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


    // Next button
    $('#player-next').click(function () {
        alert('Not yet implemented!');
    });


    // Prev button
    $('#player-prev').click(function () {
        alert('Not yet implemented!');
    });
}


function initShowMetaStyle() {
    // Hide recently added covers
    $('.recently-added-container').css('display', 'none');

    // Left align title and description inside middle pane
    $('.middle-pane').css('justify-content', 'flex-start');

    // Position title, description to left and cover to right inside middle pane
    let showMetaElement = $('.show-meta');
    showMetaElement.css('display', 'flex');
    showMetaElement.css('margin-left', '5%');
    showMetaElement.css('height', '200px');
    $('.show-meta-text').css('width', '70%');
    $('.show-meta-image').css('width', '25%');

    // Left align episode list inside bottom pane
    let episodeTableWrapper = $('.episode-table-wrapper');
    episodeTableWrapper.css('display', 'flex');
    episodeTableWrapper.css('margin-left', '5%');
}

function initShowMeta(showName, jsonResponse) {
    $('#show-title').text(showName);
    $('#show-description').text(jsonResponse['description']);
    $('#show-cover').attr('src', jsonResponse['image_url']);
}

$(document).ready(function () {

    // CSS debugging
    $('.top-level-pane').css('border', '6px solid red');
    $('.left-pane').css('border', '1px solid red');
    $('.right-pane').css('border', '1px solid red');
    // $('.middle-pane').css('border', '1px solid red');
    $('.bottom-pane').css('border', '1px solid red');
    // $('.show-meta').css('border', '1px solid red');
    // $('.show-meta-text').css('border', '1px solid red');
    // $('.show-meta-image').css('border', '1px solid red');

    // Recently Added
    $.getJSON('/api/podcasts', function (jsonResponse) {
        initRecentlyAdded($('.show-section'), jsonResponse['podcasts']);

        // Event handler: click recently added cover
        $('.show-grid-item').click(function () {
            console.log($(this).data());

            initShowMetaStyle();

            // AJAX request to get show episodes
            const showName = $(this).data('name');
            $.getJSON('/api/podcast/' + showName, function (jsonResponse) {
                console.log(jsonResponse);

                // Load show description and cover
                initShowMeta(showName, jsonResponse);

                // Populate episodes in table
                initPodcastEpisodes($('#episode-table'), jsonResponse['episodes']);

                // TODO: Event handler: click episode

            });
        });
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
            initPlayer(jsonResponse.title, jsonResponse['episodes']);
        });
    }

});

