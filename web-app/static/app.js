$(document).ready(function () {

    // CSS debugging
    // $('.top-level-pane').css('border', '6px solid red');
    // $('.left-pane').css('border', '1px solid red');
    // $('.right-pane').css('border', '1px solid red');
    // $('.middle-pane').css('border', '1px solid red');
    // $('.bottom-pane').css('border', '1px solid red');
    // $('.show-meta').css('border', '1px solid red');
    // $('.show-meta-text').css('border', '1px solid red');
    // $('.show-meta-image').css('border', '1px solid red');

    // Event handler: click 'Explore'
    $('#explore-button').click(function () {
        // Clear rows from episode table
        $('#episode-table tr.episode-rows').remove();

        // Hide show metadata and episode table
        $('.show-meta').css('display', 'none');
        $('.episode-table-wrapper').css('display', 'none');

        // Show recently added covers
        $('.recently-added-container').css('display', 'flex');
    });

    // Event handler: click 'Favorites'
    $('#favorites-button').click(function () {
        alert('Not yet implemented!');
    });


    // Recently Added
    $.getJSON('/api/podcasts', function (jsonResponse) {
        initRecentlyAdded($('.show-section'), jsonResponse['podcasts']);

        // Event handler: click recently added cover
        $('.show-grid-item').click(function () {
            console.log($(this).data());

            initShowMetaStyle();
            // Display research pane
            $('.research-pane').css('display', 'flex');

            // AJAX request to get show episodes
            const showName = $(this).data('name');
            $.getJSON('/api/podcast/' + showName, function (jsonResponse) {
                // Load show description and cover
                initShowMeta(showName, jsonResponse);

                // Populate episodes in table
                initPodcastEpisodes($('#episode-table'), jsonResponse['episodes']);

                // Event handler: click on episode row
                $("#episode-table").delegate("tr.episode-rows", "click", function () {
                    let episodeName = $(this).data('name');
                    $(this).addClass('active');
                    let episode = getEpisodeByName(episodeName, jsonResponse['episodes']);
                    console.log(episode);

                    initPlayer(showName, episodeName, episode['enclosure_url']);
                    let episodeDesc = episode['description'];
                    let episodeDescElement = $('#research-desc-data');
                    if (episodeDesc.length === 0) {
                        episodeDescElement.html('No data.');
                    } else {
                        episodeDescElement.html(episodeDesc);
                    }

                    let activeRowElement = $('.episode-rows.active');

                    function prevAudio() {
                        // play the track that comes before '<tr> .active'
                        let activePrevElement = activeRowElement.prev();
                        if (activePrevElement.hasClass('episode-rows')) {
                            console.log(activePrevElement);
                        }
                    }

                    function nextAudio() {
                        // play the track that comes after '<tr> .active'
                        let activeNextElement = activeRowElement.next();
                        activeRowElement.removeClass('active');
                        if (activeNextElement.hasClass('episode-rows')) {
                            activeRowElement = activeNextElement;
                            activeRowElement.addClass('active');
                            console.log(activeRowElement);

                            let audio = $('#player-audio')[0];
                            // Pause if already playing
                            if (audio.paused === false) {
                                console.log('audio playing, will pause');
                                audio.pause();
                                let source = $('#audio-source')[0];
                                source.src = activeRowElement.data('url');
                                console.log('changed src to: ' + source.src);
                                audio.play();
                            }
                        }
                    }

                    let prevButton = $('#player-prev');
                    let nextButton = $('#player-next');

                    // Register click handlers
                    prevButton.click(prevAudio);
                    nextButton.click(nextAudio);

                });

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
    $('.show-grid-item').css('cursor', 'pointer');
}


function initPodcastDescr(container, description) {
    $('#show-description').text(description);
    container.css({
        'display': 'flex',
        'flex-direction': 'column',
        'width': '80%'
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


function initPodcastEpisodes(container, episodes) {
    $.each(episodes, function (index, episode) {
        container.append(
            '<tr class="episode-rows" data-name="' + episode['title'] + '" ' +
            'data-url="' + episode['enclosure_url'] + '">' +
            '<td>' + episode['title'] + '</td>' +
            '<td>' + episode['published'] + '</td>' +
            '<td>' + episode['enclosure_length'] + '</td>' +
            '</tr>'
        );
    });
    $('.episode-rows').css('cursor', 'pointer');
}


function initCover() {
    let playerCoverContainer = $('.show-cover');
    playerCoverContainer.css('display', 'flex');
    let playercover = $('.show-cover img:first-child');
    let showCover = $('#show-cover').attr('src');
    playercover.attr('src', showCover);
}

function initPlayer(showTitle, episodeTitle, url) {
    initCover();
    $('#current-name').text(episodeTitle);
    $('#current-podcast').text(showTitle);

    let audioSrc = url;

    let playButton = $('#player-play');
    let pauseButton = $('#player-pause');

    let audio;
    let source;
    audio = $('#player-audio')[0];
    source = $('#audio-source')[0];

    function playAudio() {
        if (source.src.length === 0) {
            source.src = audioSrc;
        }

        // Resume if already started playing
        if (audio.paused === true) {
            audio.play().then(function () {
                // hide play button and show pause once playing
                playButton.hide();
                pauseButton.show();
                showDuration(audio);
            }).catch(function () {
                console.log('The play() Promise rejected! Use the Play button instead.');
            });
        }

    }

    function pauseAudio() {
        audio.pause();
        // hide pause button and show play once paused
        pauseButton.hide();
        playButton.show();
    }

    // Register event handlers
    playButton.click(playAudio);
    pauseButton.click(pauseAudio);
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

function getEpisodeByName(targetName, episodeList) {
    for (let i = 0; i < episodeList.length; i++) {
        let name = episodeList[i]['title'];
        if (name === targetName) {
            return episodeList[i];
        }
    }
    return null;
}


