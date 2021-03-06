import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";

function checkLogin() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // User is signed in, see docs for a list of available properties
            // https://firebase.google.com/docs/reference/js/firebase.User
            const uid = user.uid;

            // user is logged in
            console.log("User is logged in ");
            // console.log(user,uid, user.displayName);
            $(".wrapper").toggle();
            $(".loader-div").toggle();

        } else {
            // User is signed out
            // make user login first
            window.location.href = "login.html";
        }
    });
}



window.onpaint = checkLogin();



// signing out user if logged in 
const logoutButton = document.querySelector("#logout-button");
logoutButton.addEventListener("click", (e)=> {
    const auth = getAuth();
    signOut(auth).then(() => {
    // Sign-out successful.
    console.log("signing out");
    }).catch((error) => {
    // An error happened.
    });
});