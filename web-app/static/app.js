$(document).ready(function () {
    console.log("ready!");
    $.getJSON('/api/podcasts', function (data) {
        const items = [];
        $.each(data, function (key, val) {
            console.log('key: ' + key);
            $.each(val, function (idx, epi) {
                console.log('title: ' + epi.title);
                console.log('description: ' + epi.description);
                $('.current-events-shows').append(
                    '<div class="three columns">\n' +
                    '<a href="/show-detail">' + epi.title + '</a>\n' +
                    ' </div>'
                );
            });
        });
    });
});