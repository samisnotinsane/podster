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

function showPauseIcon() {
    let playPauseBtn = $('#player-play-pause');
    playPauseBtn.removeClass('fa-play');
    playPauseBtn.addClass('fa-pause');
}

function showPlayIcon() {
    let playPauseBtn = $('#player-play-pause');
    playPauseBtn.removeClass('fa-pause');
    playPauseBtn.addClass('fa-play');
}

function initPlayerTitle(podcastTitle, episodeTitle) {
    let elemEpisodeTitle = $('#current-name');
    let elemPodcastTitle = $('#current-podcast');
    elemEpisodeTitle.text(episodeTitle);
    elemPodcastTitle.text(podcastTitle);
}

function playEpisode(episodeDesc) {
    audio.play();
    // Set episode description of currently playing episode
    let episodeDescElement = $('#research-desc-data');
    if (episodeDesc.length === 0) {
        episodeDescElement.html('No data.');
    } else {
        episodeDescElement.html(episodeDesc);
    }
}

function onClickPlayOrPause() {
    if (audio.paused) {
        audio.play();
        showPauseIcon();
    } else {
        audio.pause();
        showPlayIcon();
    }
}

function onClickPrev(currentEpisode, arrayPlaylist) {
    // if (currentEpisode !== 0) {
    //     currentEpisode--;
    //     audio.src = arrayPlaylistOfUrls[currentEpisode];
    //     let strEpisodeDesc = arrayPlaylist[currentEpisode]['description'];
    //     playEpisode(strEpisodeDesc);
    // } else {
    //     console.log('No more episodes, cannot move to prev');
    // }
}

function onClickNext() {
    // if (arrayPlaylistOfUrls.length === 1) {
    //     console.log('No more episodes, cannot move to next');
    //     return;
    // }
    // currentEpisode++;
    // audio.src = arrayPlaylistOfUrls[currentEpisode];
    // playEpisode(strEpisodeDesc);
}

function updateSeekerPosition() {
    let seekBarFill = $('.player-seek-bar .player-seek-bar-fill');
    let position = audio.currentTime / audio.duration;
    seekBarFill.css('width', position * 100 + '%');
}

function initPlayback(podcastName, startPos, arrayAllEpisodes) {
    /*
     * audio player
     *  - start playing first episode in playlist
     *  - add rest of tracks to queue
     */
    let playPauseBtn = $('#player-play-pause');
    let prevButton = $('#player-prev');
    let nextButton = $('#player-next');

    // Extract URLs of episodes and add them to playlist
    // let arrayPlaylist = [];
    // $.each(arrayAllEpisodes, function (index, episode) {
    //     let episodeUrl = episode['enclosure_url'];
    //     arrayPlaylist.push(episodeUrl);
    // });

    // Load 'startPos'-th episode
    let activeEpisodeNo = startPos;
    console.log('arrayAllEpisodes[activeEpisodeNo][\'enclosure_url\']');
    console.log(arrayAllEpisodes[activeEpisodeNo]['enclosure_url']);
    audio.src = arrayAllEpisodes[activeEpisodeNo]['enclosure_url'];

    // Metadata
    let strEpisodeTitle = arrayAllEpisodes[activeEpisodeNo]['title'];
    let strEpisodeDesc = arrayAllEpisodes[activeEpisodeNo]['description'];

    // Register click handlers
    playPauseBtn.click(onClickPlayOrPause);
    prevButton.click(onClickPrev(activeEpisodeNo, arrayAllEpisodes));
    nextButton.click(onClickNext(activeEpisodeNo, arrayAllEpisodes));

    // called when time is updating during playback
    audio.ontimeupdate = function () {
        updateSeekerPosition();
    };

    if (audio.paused) {
        console.log('audio already paused, playing');
        playEpisode(strEpisodeDesc);
        showPauseIcon(playPauseBtn);
    } else {
        audio.play().then(function () {
            console.log('playing');
            showPauseIcon(playPauseBtn);
        });
    }
}


function findStartPos(targetTimestamp, arrayEpisodes) {
    let pos = -1;
    $.each(arrayEpisodes, function (index, episode) {
        let strDatePubOfIndex = episode['published'];
        let strTimestampOfIndex = Date.parse(strDatePubOfIndex);
        if (targetTimestamp === strTimestampOfIndex) {
            console.log(arrayEpisodes[index]);
            pos = index;
        }
    });
    return pos;
}

function episodesFrom(startPos, allEpisodes) {
    let filteredEpisodes = [];
    $.each(allEpisodes, function(index, episode) {
        if (index >= startPos) {
            filteredEpisodes.push(episode);
        }
    });
    return filteredEpisodes;
}

function onClickEpisode(jsonResponse) {
    return function () {
        console.log('onClickEpisode');
        let episodeName = $(this).data('name');
        let podcastName = jsonResponse['title'];

        // Remove all other instances of '.active' if present
        $('.episode-rows').removeClass('active');
        $(this).addClass('active'); // `$(this)` holds `tr.episode-rows`

        let arrayAllEpisodes = jsonResponse['episodes'];

        // Use date published of clicked episode to return **it**, and all older episodes
        let strDatePubOfActive = $('.episode-rows.active td:nth-child(2)').text();
        let strTimestampOfActive = Date.parse(strDatePubOfActive);

        let startPos = findStartPos(strTimestampOfActive, arrayAllEpisodes);
        // let arrayFilterEpisodes = episodesFrom(startPos, arrayAllEpisodes);

        console.log('selected episode: ');
        console.log(episodeName);
        console.log('selected published: ');
        console.log(strDatePubOfActive);
        console.log('arrayEpisodes');
        console.log(arrayAllEpisodes);
        console.log('startPos');
        console.log(startPos);
        // console.log('arrayFilterEpisodes');
        // console.log(arrayFilterEpisodes);
        console.log('--END--');

        cssInitPlayerCover(); // show a little podcast cover in player
        initPlayerTitle(podcastName, episodeName); // show podcast name and episode title in player

        initPlayback(podcastName, startPos, arrayAllEpisodes); // start playback from start position
    };
}

function cbGetEpisodes() {
    return function (jsonResponse) {
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


function cssInitPlayerCover() {
    let playerCoverContainer = $('.show-cover');
    playerCoverContainer.css('display', 'flex');
    let playercover = $('.show-cover img:first-child');
    let showCover = $('#show-cover').attr('src');
    playercover.attr('src', showCover);
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

// Global var.
let audio;

// Entry point: callback when document loads and is 'ready'
$(document).ready(function () {
    let btnExplore = $('#explore-button');
    let btnFavorites = $('#favorites-button');
    audio = $('#player-audio')[0];

    // Event handlers: click 'Explore' and 'Favorite'
    btnExplore.click(onClickExplore());
    btnFavorites.click(onClickFavorites()); // onClick not yet impl.

    // Send 'Recently Added' GET request in background (AJAX)
    $.getJSON('/api/podcasts', cbGetRecentlyAdded());
});
