import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";
import { getFirestore, collection, getDocs  } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";

// function for inferencing data

const getDateFromString = (dateString) => {
    let date = new Date(dateString);
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    return day + "/" + month + "/" + year;
};

const chemicalPollutants = (feed) => {
    //if null we cannot calculate so exit
    if (feed.field1 == null) {
        return "--";
    }

    if (feed.field1 <= 6.5) {
        return "Acidic";
    } else {
        return "Basic";
    }
};

const plasticDetection = (feed) => {
    return "Not Present";
};

const microOrganizms = (feed) => {
    let ORP = feed.field4;
    let DO = feed.field5;

    //if null we cannot calculate so exit
    if (ORP == null || DO == null) {
        return "--";
    }
    let o2, d2;
    //   calculate O2
    if (ORP <= 150 || ORP > 400) o2 = 0;
    else o2 = 1;
    // calculate D2
    if (DO < 4 || DO > 13) d2 = 0;
    else d2 = 1;

    let m = o2 + d2;
    if (m == 0) return "Present";
    else if (m == 1) return "In Less Quantity";
    else return "Not Present";
};

const waterQuality = (feed) => {
    let PH = feed.field1;
    let EC = feed.field3;
    let ORP = feed.field4;
    let DO = feed.field5;

    //if null we cannot calculate so exit
    if (PH == null || EC == null || ORP == null || DO == null) {
        return "--";
    }

    let p3, e3, o3, d3;
    // p3
    if (0 <= PH <= 6.4 || 8.6 <= PH <= 14) p3 = 0;
    else p3 = 1;

    // e3
    if (EC < 50 || EC > 400) e3 = 0;
    else e3 = 1;

    // o3
    if (ORP <= 250 || ORP > 400) o3 = 0;
    else o3 = 1;

    // d3
    if (DO < 4 || DO > 13) d3 = 0;
    else d3 = 1;

    //calculating A
    let A = o3 + p3 + e3 + d3;

    if (A == 1) return "Very Bad";
    else if (A == 2) return "Bad";
    else if (A == 3) return "Moderate";
    else if (A == 4) return "Good";
    else if (A == 0) return "Hazardous";
};

const dataDisplay = (feeds) => {
    let i = 0;
    let ans = "";
    let row = "";
    for (i; i < feeds.length; i++) {
        let d = new Date(
        feeds[i].created_at.slice(0, feeds[i].created_at.length - 4)
        );
        row = `<th scope="row">` + dateFormatter(d, 2) + `</th>`;
        row += `<td>` + chemicalPollutants(feeds[i]) + `</td>`;
        row += `<td>` + waterQuality(feeds[i]) + `</td>`;
        row += `<td>` + microOrganizms(feeds[i]) + `</td>`;
        row += `<td>` + plasticDetection(feeds[i]) + `</td>`;
        ans += `<tr>` + row + `</tr>`;
    }
    let dataDiv = document.querySelector(".data");
    dataDiv.innerHTML = ans;
};


const dateFormatter = (today, type) => {
    let day = today.getDate();
    if (day < 9) {
        day = "0" + day.toString();
    }
    let month = today.getMonth();
    if (month < 9) {
        month = "0" + (month + 1).toString();
    } else {
        month = (month + 1).toString();
    }
    let year = today.getFullYear();
    if (type == 1) {
        return year + "-" + month + "-" + day;
    } else {
        return day + "-" + month + "-" + year;
    }
};



const displayOnDate = (dateQuery) => {
    let ans = [];
    for (const feed of FEEDS) {
        let d = new Date(feed.created_at.slice(0, feed.created_at.length - 4));
        console.log(dateQuery);
        if (dateFormatter(d, 1) == dateQuery) {
        ans.push(feed);
        }
    }
    if (ans.length == 0) {
        $("#noData").show();
    } else {
        $("#noData").hide();
    }
    dataDisplay(ans);
};

// function ends


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

				// console.log("We got data");
                $(document).ready(function() {
                    $.ajax({
                        url: url,
                        success: function (data) {
                            const FEEDS = data.feeds;
                            // console.log(FEEDS);
                            dataDisplay(FEEDS);
                            $("#noData").toggle();
                        },
                    });
                } );

              	//##################################################################################
        	}
        });

    } else {
        // User is signed out
        window.location.href = "login.html";
    }
});