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

function initAudioPlayer(podcastName, episodeName, arrayPlaylist) {
    /*
     * audio player
     *  - add rest of tracks to queue
     */
    let episodeTitle = $('#current-name');
    let podcastTitle = $('#current-podcast');
    let seekBarFill = $('.player-seek-bar .player-seek-bar-fill');
    let playPauseBtn = $('#player-play-pause');
    let prevButton = $('#player-prev');
    let nextButton = $('#player-next');

    cssInitCover();
    episodeTitle.text(episodeName);
    podcastTitle.text(podcastName);

    // Extract URLs episodes and them to playlist
    let arrayPlaylistOfUrls = [];
    $.each(arrayPlaylist, function (index, episode) {
        let episodeUrl = episode['enclosure_url'];
        arrayPlaylistOfUrls.push(episodeUrl);
    });

    console.log(arrayPlaylistOfUrls);

    let audio = $('#player-audio')[0];
    let currentEpisode = 0;
    audio.src = arrayPlaylistOfUrls[currentEpisode];

    function playEpisode() {
        audio.play();
        episodeTitle.text(arrayPlaylist[currentEpisode]['title']);
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
        if (currentEpisode !== 0) {
            currentEpisode--;
            audio.src = arrayPlaylistOfUrls[currentEpisode];
            playEpisode();
        } else {
            console.log('No more episodes, cannot move to prev');
        }
    }

    function onClickNext() {
        if (arrayPlaylistOfUrls.length === 1) {
            console.log('No more episodes, cannot move to next');
            return;
        }
        currentEpisode++;
        audio.src = arrayPlaylistOfUrls[currentEpisode];
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

function episodePlaylist(arrayEpisodes, strTimestampOfActive) {
    let arrayResults = [];
    $.each(arrayEpisodes, function (index, episode) {
        let strDatePubOfIndex = episode['published'];
        let strTimestampOfIndex = Date.parse(strDatePubOfIndex);
        if (strTimestampOfIndex <= strTimestampOfActive) {
            arrayResults.push(episode);
        }
    });
    return arrayResults;
}

function onClickEpisode(jsonResponse) {
    return function () {
        let episodeName = $(this).data('name');
        let podcastName = jsonResponse['title'];


        // `$(this)` holds `tr.episode-rows`
        $(this).addClass('active');

        // Extract URLs of all episodes from clicked episode onwards (reverse chronological order)
        let arrayEpisodes = jsonResponse['episodes'];

        // Date published of clicked episode
        let strDatePubOfActive = $('.episode-rows.active td:nth-child(2)').text();
        let strTimestampOfActive = Date.parse(strDatePubOfActive);
        let arrayPlaylist = episodePlaylist(arrayEpisodes, strTimestampOfActive);

        initAudioPlayer(podcastName, episodeName, arrayPlaylist);

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


function cssInitCover() {
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
