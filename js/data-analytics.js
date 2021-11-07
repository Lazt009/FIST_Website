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
              	const url = "https://api.thingspeak.com/channels/" + data + "/feeds.json";
              	// console.log(url);


              	// now we got the url we can now use it call the data
              	//###################################################################################

				  console.log("We got data");

              	//##################################################################################
        	}
        });

    } else {
        // User is signed out
        window.location.href = "login.html";
    }
});