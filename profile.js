import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth  ,createUserWithEmailAndPassword ,signInWithEmailAndPassword ,updateProfile    } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

import { collection, addDoc ,getFirestore  ,updateDoc  } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js"; 


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

let fileInput = document.getElementById("fileInput");

fileInput && fileInput.addEventListener("change",(e) => {
  let profileImg = document.getElementById("profileImg")
  profileImg.src = URL.createObjectURL(e.target.files[0])
  console.log(e.target.files[0])
})