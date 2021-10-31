const url = "https://api.thingspeak.com/channels/983726/feeds.json";
let FEEDS = [];
//   field 1 = PH    A
//   field 2 = RTD   B
//   field 3 = EC    E
//   field 4 = ORP   C
//   field 5 = DO    D

$(document).ready(function() {
    $.ajax({
        url: url,
        success: function (data) {
            FEEDS = data.feeds;
            // console.log(FEEDS);
            $('#data-table').DataTable( {
                data: FEEDS,
                columns: [
                    {data:"entry_id"},
                    {data:"created_at"},
                    {data:"field1"},
                    {data:"field2"},
                    {data:"field3"},
                    {data:"field4"},
                    {data:"field5"}
                ]
            });
        },
    });
} );