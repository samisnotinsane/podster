$(document).ready(function () {
    console.log("ready!");
    $.getJSON('/api/podcasts', function (data) {
        $.each(data, function (key, val) {
            console.log('key: ' + key);
            $.each(val, function (idx, epi) {
                console.log('title: ' + epi.title);
                console.log('description: ' + epi.description);
                $('.current-events-shows').append(
                    '<div class="card">\n' +
                        '<a href="/show-detail">' +
                        '<img src=\" ' + epi.image_url + '\" height="125" width="125" >' +
                         '</a>' +
                    '</div>'
                );
            });
        });
    });
});