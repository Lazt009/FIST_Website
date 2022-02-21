import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";
import { getFirestore, collection, getDocs  } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var exists = false;
        var data = null;

        const db = getFirestore();
        getDocs(collection(db, "channel-ids"))
        .then( (response) => {
            //check all responses 
            response.forEach( (d) => {
                // console.log(d.id, user.uid);
                if( d.id == user.uid ) {
                    data = d.data()['channelId'];
                    exists = true;
                }
            });

            //check if channel id exist
            if( exists == false ) {
                window.location.href = "profile.html";
            }
            else{
                // we got the channel id also
                // console.log(data);
                const url = "https://api.thingspeak.com/channels/" + data + "/feeds.json?results=831";
                // console.log(url);


                // now we got the url we can nowuse it call the data
              	//###################################################################################
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
                            $("#noData").toggle();
                        },
                    });
                } );
              	//###################################################################################
            }
        });

    } else {
        // User is signed out
        window.location.href = "login.html";
    }
});















