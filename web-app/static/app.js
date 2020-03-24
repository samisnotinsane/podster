function onClickExplore() {
    return function () {
        let trEpisode = $('#episode-table tr.episode-rows');
        let divShowMeta = $('.show-meta');
        let divEpisodeTableWrapper = $('.episode-table-wrapper');
        let divRecentlyAddedContainer = $('.recently-added-container');

        // Clear rows from episode table
        trEpisode.remove();

        // Hide show metadata and episode table
        divShowMeta.css('display', 'none');
        divEpisodeTableWrapper.css('display', 'none');

        // Show recently added covers
        divRecentlyAddedContainer.css('display', 'flex');
    };
}

function onClickFavorites() {
    return function () {
        alert('Not yet implemented!');
    };
}

function htmlRecentlyAddedCover(index, podcast) {
    let coverId = 'cover-' + index;
    return "<div class='show-grid-item' data-name='" + podcast['title'] + "'>" +
        "<img id='" + coverId + "' " +
        "src='" + podcast['image_url'] + "' " +
        "alt='" + podcast['title'] + "' height='150' width='150'/>" +
        "</div>";
}

function initPodcastHeader(name, description, coverImageUrl) {
    $('#show-title').text(name);
    $('#show-description').text(description);
    $('#show-cover').attr('src', coverImageUrl);
}

function showPauseIcon(playPauseBtn) {
    playPauseBtn.removeClass('fa-play');
    playPauseBtn.addClass('fa-pause');
}

function showPlayIcon(playPauseBtn) {
    playPauseBtn.removeClass('fa-pause');
    playPauseBtn.addClass('fa-play');
}

function initAudioPlayer() {
    /*
     * audio player
     *  - play clicked track
     *  - add rest of tracks to queue
     */
    let trackTitle = $('#current-name');
    let seekBarFill = $('.player-seek-bar .player-seek-bar-fill');
    let playPauseBtn = $('#player-play-pause');
    let prevButton = $('#player-prev');
    let nextButton = $('#player-next');
    // Play hardcoded episodes as test
    let episodeUrls = [
        'http://traffic.libsyn.com/minutephysics/Why_You_Should_Care_About_Nukes.mp4?dest-id=95145',
        'http://traffic.libsyn.com/minutephysics/.mp4?dest-id=95145',
        'http://traffic.libsyn.com/minutephysics/Transporters_and_Quantum_Teleportation.mp4?dest-id=95145',
        'http://traffic.libsyn.com/minutephysics/The_Limb_of_the_Sun.mp4?dest-id=95145',
        'http://traffic.libsyn.com/minutephysics/_1.mp4?dest-id=95145',
        'http://traffic.libsyn.com/minutephysics/Concrete_Does_Not_Dry_Out.mp4?dest-id=95145'
    ];


    let audio = $('#player-audio')[0];
    // let source = $('#audio-source')[0];
    let currentEpisode = 0;
    audio.src = episodeUrls[currentEpisode];

    function playEpisode() {
        audio.play();
        trackTitle.text('TEST');
    }

    function onClickPlayOrPause() {
        if (audio.paused) {
            playEpisode();
            showPauseIcon(playPauseBtn);
        } else {
            audio.pause();
            showPlayIcon(playPauseBtn);
        }
    }

    function onClickPrev() {
        if(currentEpisode !== 0) {
            currentEpisode--;
            audio.src = episodeUrls[currentEpisode];
            playEpisode();
        }
    }

    function onClickNext() {
        currentEpisode++;
        audio.src = episodeUrls[currentEpisode];
        playEpisode();
    }

    // Register click handlers
    playPauseBtn.click(onClickPlayOrPause);
    prevButton.click(onClickPrev);
    nextButton.click(onClickNext);

    function updateSeekerPosition() {
        let position = audio.currentTime / audio.duration;
        seekBarFill.css('width', position * 100 + '%');
    }

    // called when time is updating during playback
    audio.ontimeupdate = function () {
        updateSeekerPosition();
    }
}

function onClickEpisode(jsonResponse) {
    return function () {

        initAudioPlayer();

        // `$(this)` holds `tr.episode-rows`
        // let episodeName = $(this).data('name');
        // $(this).addClass('active');
        // let episode = getEpisodeByName(episodeName, jsonResponse['episodes']);
        // console.log(episode);
        //
        // // initPlayer(jsonResponse['title'], episodeName, episode['enclosure_url']);
        // let episodeDesc = episode['description'];
        // let episodeDescElement = $('#research-desc-data');
        // if (episodeDesc.length === 0) {
        //     episodeDescElement.html('No data.');
        // } else {
        //     episodeDescElement.html(episodeDesc);
        // }
        //
        // let activeRowElement = $('.episode-rows.active');

    };
}

function cbGetEpisodes() {
    return function (jsonResponse) {
        console.log(jsonResponse);

        // Sets podcast name, description, cover image in `.show-meta` container
        initPodcastHeader(jsonResponse['title'], jsonResponse['description'], jsonResponse['image_url']);

        // Populate episodes in table
        let tableEpisodes = $('#episode-table');
        initTableRows(tableEpisodes, jsonResponse['episodes']);

        // Event handler: click on episode row
        tableEpisodes.delegate("tr.episode-rows", "click", onClickEpisode(jsonResponse));
    };
}

function onClickRecentlyAddedPodcast() {
    return function () {
        cssInitPodcastDetail();

        // GET podcast episodes for this cover
        // Note: `$(this)` holds `divPodcastCoverContainer`
        let podcastName = $(this).data('name');
        let requestUrl = '/api/podcast/' + podcastName;
        $.getJSON(requestUrl, cbGetEpisodes());
    };
}

function cbGetRecentlyAdded() {
    // `jsonResponse` is data returned from the API endpoint: `/api/podcasts`
    return function (jsonResponse) {
        let arrayPodcasts = jsonResponse['podcasts'];

        let divShowSectionContainer = $('.show-section');
        $.each(arrayPodcasts, function (index, podcast) {
            divShowSectionContainer.append(htmlRecentlyAddedCover(index, podcast));
        });

        let divPodcastCoverContainer = $('.show-grid-item');
        // Event handler: click recently added cover
        divPodcastCoverContainer.click(onClickRecentlyAddedPodcast());
    };
}

function htmlTableRow(episode) {
    return '<tr class="episode-rows" data-name="' + episode['title'] + '" ' +
        'data-url="' + episode['enclosure_url'] + '">' +
        '<td>' + episode['title'] + '</td>' +
        '<td>' + episode['published'] + '</td>' +
        '<td>' + episode['enclosure_length'] + '</td>' +
        '</tr>';
}


function initTableRows(table, episodes) {
    $.each(episodes, function (index, episode) {
        table.append(htmlTableRow(episode));
    });
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


function cssInitPodcastDetail() {
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

    // Display research pane
    $('.research-pane').css('display', 'flex');
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

// Entry point: callback when document loads and is 'ready'
$(document).ready(function () {
    let btnExplore = $('#explore-button');
    let btnFavorites = $('#favorites-button');

    // Event handlers: click 'Explore' and 'Favorite'
    btnExplore.click(onClickExplore());
    btnFavorites.click(onClickFavorites()); // onClick not yet impl.

    // Send 'Recently Added' GET request in background (AJAX)
    $.getJSON('/api/podcasts', cbGetRecentlyAdded());
});
