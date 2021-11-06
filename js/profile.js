import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";
import { getFirestore, collection, doc, setDoc, getDocs  } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-firestore.js";


const db = getFirestore();

//get user info 
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User

        document.querySelector("#inputEmail").value = user.email;
        document.querySelector("#inputName").value = user.displayName;
        document.querySelector("#inputUID").value = user.uid;
        
        // code for configuring the form action
        const formSubmit = document.querySelector("#form-submit");
        formSubmit.addEventListener("click", (e) => {
            e.preventDefault();
            console.log("form submitted");
            const cId = document.querySelector("#inputChannelID");

            if( cId.value == "") {
                alert("Please Input Channel ID");
            }
            else{
                // console.log( cId.value );
                // add channel id to the firestore database
                const path = "channel-ids/" + user.uid;
                // doc(db, path);
                setDoc(doc(db, path), {
                    channelId: cId.value
                })
                .then( () => {
                    console.log("Channel Id Added");
                    alert("Channel id Added");
                })
            }
        });


        // Code to get things speak channel id

        var exists = false;
        var data = null;
        getDocs(collection(db, "channel-ids"))
        .then( (response) => {
            //check all responses 
            response.forEach( (d) => {
                console.log(d.id, user.uid);
                if( d.id == user.uid ) {
                    data = d.data()['channelId'];
                    exists = true;
                }
            });

            //if the channel id exists 
            if( exists == true ) {
                // console.log(data);
                document.querySelector("#inputChannelID").value = data;
            }
            else{
                console.log("User has not yet added the channel id data");
            }
        });
    }
});