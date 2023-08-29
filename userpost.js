import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth ,createUserWithEmailAndPassword ,signInWithEmailAndPassword ,updateProfile ,signOut     } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

import { collection, addDoc ,getFirestore ,serverTimestamp  } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js"; 


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



let publish = document.getElementById("publish"); 
// console.log(publish, "====>>>publish ")
publish && publish.addEventListener("click" , async () => {
        try{

            let placeholder = document.getElementById("placeholder")
            let placeholderText = document.getElementById("placeholderText")
            
            const docRef = await addDoc(collection(db, "userPost"), {
                heading: placeholder.value,
                text: placeholderText.value,
                timestamp: serverTimestamp()
            });
            console.log("Document written with ID: ", docRef.id);
        } catch(e){
            console.log("error==>",e)
        }
        
        let blog = document.getElementById("blog");
         blog.innerHTML += `
    <div class="blogDiv">
       <div class="imgh5">
         <img class="blogImg mx-3 mt-2" src="./_DSK2474.JPG" alt="">
        <h5>${placeholder.value}
        <br>
        <p class="nameTime">Zeeshan Haider - <span> few min ago</span></p>     
        </h5>
       </div>
       <div class="paragraph mx-3">
        <p>
          ${placeholderText.value}
        </p>
        <button class="btn">Edit</button>
        <button class="btn">Delete</button>
       </div>
    </div>
    `
    placeholder.value= "";
    placeholderText.value ="";
    console.log(placeholder.value)
    console.log(placeholderText.value)

});



