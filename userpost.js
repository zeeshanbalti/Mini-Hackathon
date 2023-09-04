import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth ,createUserWithEmailAndPassword ,signInWithEmailAndPassword ,updateProfile ,signOut     } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

import { collection, addDoc ,getFirestore ,serverTimestamp , query, where, getDocs   } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js"; 


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
const auth = getAuth();
const db = getFirestore(app)

 
//     DashBoard Section
 
 
let goProfile = document.getElementById("goProfile")
goProfile && goProfile.addEventListener("click" , () => {
     location.href="/profile.html"
    console.log("sign in Button ==>")
})
let logOutBtn = document.getElementById("logOutBtn");
logOutBtn && logOutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
        location.href="/login.html"
        console.log("Sign-out successful==>")
      }).catch((error) => {
    console.log(" An error happened")
      });
      

})


 
 



