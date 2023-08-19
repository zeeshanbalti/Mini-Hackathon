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
 

let SignUp = document.getElementById('beforeSign');
let LogIn = document.getElementById('afterSign');
let loginLink = document.getElementById("loginLink");
console.log(loginLink)
loginLink.addEventListener("click", ()=>{
    SignUp.style.display="none"
    LogIn.style.display='block'
});
let signInPAssword = document.getElementById("password")
let signInConformPassword = document.getElementById("passwordRepeat") 

SignUp.style.display="none"
// LogIn.style.display='none'
let signInBtn =document.getElementById('signUpButton');
console.log(signInBtn, "===>>sign in btn")
signInBtn.addEventListener("click" , () =>{
    
let fullName = document.getElementById("fullName")
let signInEmail = document.getElementById("email")
let signInPAssword = document.getElementById("password")
let signInConformPassword = document.getElementById("passwordRepeat")
let nav = document.getElementById('nav');

    createUserWithEmailAndPassword(auth, signInEmail.value, signInPAssword.value)
  .then((userCredential) => {
    const user = userCredential.user;
 
    if(signInPAssword.value === signInConformPassword.value) {

        SignUp.style.display="none"
        LogIn.style.display='block'
        nav.style.display="none"  
        console.log("Confurm Ho Gya ",user)
 
    }else{
        SignUp.style.display="block"
        LogIn.style.display='none'
        signInConformPassword.innerHTML="Password Not Match"
        signInConformPassword.style.border=" 2px solid red"
    }
     
    console.log("User Found =>", user)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
   console.log("Error ==>" ,errorCode,errorMessage)
  });

});
let goProfile = document.getElementById("goProfile")
goProfile.addEventListener("click" , () => {
    profile.style.display="block"
    nav.style.display="none"

    console.log("sign in Button ==>")
})
// let loginBtn = document.getElementById("loginBtn");

 

// LogIn Section

// let LogInButton = document.getElementById("LogInButton");

// LogInButton.addEventListener("click" , () => {

//      let LogInEmail = document.getElementById("emailLogin")
//      let LogInPassword = document.getElementById("passwordLogin")
     
//     signInWithEmailAndPassword(auth, LogInEmail.value, LogInPassword.value)
//   .then((userCredential) => {
//      const user = userCredential.user;
//       console.log("LogIn Hogya hn ..", user)
//   })
//   .catch((error) => {
//     const errorCode = error.code;
//     const errorMessage = error.message;
//     console.log(("Kuch garbar hn Log in ma =>" ,errorCode,errorMessage))
//   });
    
// });
