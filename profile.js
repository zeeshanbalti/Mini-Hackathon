import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth ,createUserWithEmailAndPassword ,signInWithEmailAndPassword ,updateProfile    } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

// import { collection, addDoc ,getFirestore  , } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js"; 


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

// Profile Section

let name1 = document.getElementById("profileName")
// name1.innerHTML= ""
let name = document.getElementById("profileName")
let oldPassword = document.getElementById("oldPassword")
let newpassword = document.getElementById("newpassword")
let newpasswordrepeat = document.getElementById("newpasswordrepeat")

let UpdateBtn = document.getElementById("UpdateBtn");

UpdateBtn.addEventListener("click" , () => {
    updateProfile(auth.currentUser, {
        name: "Jane Q. User", pass:oldPassword.value ,newpassword
      }).then(() => {
        console.log("Update hogya ==>>")
      }).catch((error) => {
      console.log("nhi hua update",error)
      });
})