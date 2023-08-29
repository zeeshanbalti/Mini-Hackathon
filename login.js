import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";

import { getAuth ,createUserWithEmailAndPassword ,signInWithEmailAndPassword ,updateProfile    } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
 

const firebaseConfig = {
    apiKey: "AIzaSyCrVy_b_OrWMz-A38_07tQfK5SK3NMjLk8",
    authDomain: "my-first-project-d4e38.firebaseapp.com",
    databaseURL: "https://my-first-project-d4e38-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "my-first-project-d4e38",
    storageBucket: "my-first-project-d4e38.appspot.com",
    messagingSenderId: "167389442092",
    appId: "1:167389442092:web:da0fbdd30ec1a844f52189"
  };

  

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
 
 
 
 

// LogIn Section

let goToSignUp = document.getElementById("goToSignUp");
goToSignUp && goToSignUp.addEventListener("click",() => {
  location.href="signin.html"
})

let LogInButton = document.getElementById("LogInButton");

LogInButton && LogInButton.addEventListener("click" , () => {

     let LogInEmail = document.getElementById("emailLogin")
     let LogInPassword = document.getElementById("passwordLogin")
     signInWithEmailAndPassword(auth, LogInEmail.value, LogInPassword.value)
  .then((userCredential) => {
    Swal.fire({
      icon: 'success',
      title: 'Login Successfull',
      text:   "You are Now Login",

       })
     const user = userCredential.user;
     location.href="/userpost.html"

      console.log("LogIn Hogya hn ..", user)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    Swal.fire({
      icon: 'error',
      title: 'Wrong',
      text:  errorMessage,
       })
    console.log(("Kuch garbar hn Log in ma =>" ,errorCode,errorMessage))
  });
    
});
