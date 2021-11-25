import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/9.3.0/firebase-auth.js";

const provider = new GoogleAuthProvider();

const loginButton = document.querySelector("#google-login");

loginButton.addEventListener("click", (e)=> {
    e.preventDefault();
    // login using google signin
    console.log("Signing in Using google");

    const auth = getAuth();
    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log("User is logged In");
        console.log(user);
        window.location.href = "profile.html";

    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
    });
});

$(document).ready(function () {
    $(".wrapper").toggle();
    $(".loader").toggle();
});