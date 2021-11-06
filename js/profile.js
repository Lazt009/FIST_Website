import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";

//get user info 
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User

        document.querySelector("#inputEmail").value = user.email;
        document.querySelector("#inputName").value = user.displayName;
        document.querySelector("#inputUID").value = user.uid;
        // Code to get things speak channel id
        
    }
});