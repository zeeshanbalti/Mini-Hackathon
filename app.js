import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
// import { getAuth ,createUserWithEmailAndPassword ,signInWithEmailAndPassword ,updateProfile    } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";

import { collection, addDoc ,getFirestore  , } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js"; 


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
const db = getFirestore(app)

//    signIn
let SignUp = document.getElementById('beforeSign');
let LogIn = document.getElementById('afterSign');
let nav = document.getElementById('nav');
let profile = document.getElementById("profile");
profile.style.display="none"
nav.style.display="block"
SignUp.style.display="none"
// LogIn.style.display='none'
  


let goProfile = document.getElementById("goProfile")
goProfile.addEventListener("click" , () => {
    profile.style.display="block"
    nav.style.display="none"

    console.log("sign in Button ==>")
})
let loginBtn = document.getElementById("loginBtn");
loginBtn.addEventListener("click", () => {
    SignUp.style.display="block";
    nav.style.display="none"


})


//     DashBoard Section
 
 

let publish = document.getElementById("publish"); 
console.log(publish, "====>>>publish ")
publish.addEventListener("click" , async () => {
        try{

            let placeholder = document.getElementById("placeholder")
            let placeholderText = document.getElementById("placeholderText")
            let blog = document.getElementById("blog");
            
            const docRef = await addDoc(collection(db, "cities"), {
                name: placeholder.value,
                country: placeholderText.value
            });
            console.log("Document written with ID: ", docRef.id);
        } catch(e){
            console.log("error==>",e)
        }

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
       </div>
    </div>
    `
    placeholder.value= "";
    placeholderText.value ="";
    console.log(placeholder.value)
    console.log(placeholderText.value)

});



