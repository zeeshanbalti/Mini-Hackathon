import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth ,createUserWithEmailAndPassword ,onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import {doc, setDoc, getFirestore, getDoc ,updateDoc   } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
 

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
const db = getFirestore(app);

 
let flag = true;
 
 
let fullName = document.getElementById("userName")
let userEmail = document.getElementById("userEmail")
let userUid = document.getElementById("uid")
let getCurrentUser = async(uid) => {
  const docRef = doc(db, "users", uid);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
 fullName.value = docSnap.data().name;
 userEmail.value = docSnap.data().email
 userUid.value = docSnap.id
//  console.log(docSnap.id)
  console.log("Document data:", docSnap.data());
} else {
  // docSnap.data() will be undefined in this case
  console.log("No such document!");
}

};


// Update Profile

let UpdateBtn = document.getElementById("UpdateBtn");

UpdateBtn && UpdateBtn.addEventListener("click" , async () => {
  const updateRef = doc(db, "users", userUid.value );

  // Set the "capital" field of the city 'DC'
 
  await updateDoc(updateRef, {
    name: fullName.value  
  }
  );
})


//  on AuthState Changed


onAuthStateChanged(auth, (user) => {
  if (user) {
        getCurrentUser(user.uid)
      if(location.pathname !== "/profile.html" && location.pathname !== "/userpost.html" && flag){
        console.log("Kuch aya kya",user)
        location.href = "userpost.html";
      }
    // console.log("user==>",user)
  } else {
    if(location.pathname !== "/login.html" && location.pathname !== "/signin.html"){

      location.href="login.html"
    }
    console.log("user Nhi hn ==>")
  }
});


 let loginLink = document.getElementById("loginLink");
 loginLink && loginLink.addEventListener("click", ()=>{
    location.href="login.html"
});
let signInPAssword = document.getElementById("password")
let signInConformPassword = document.getElementById("passwordRepeat") 

 let signInBtn =document.getElementById('signUpButton');
 signInBtn && signInBtn.addEventListener("click" , () =>{
    
let fullName = document.getElementById("fullName")
let signInEmail = document.getElementById("email")
let signInPAssword = document.getElementById("password")
// let signInConformPassword = document.getElementById("passwordRepeat")
let nav = document.getElementById('nav');
console.log(fullName.value,signInEmail.value)

flag= false;
    createUserWithEmailAndPassword(auth, signInEmail.value, signInPAssword.value)
  .then( async (userCredential) => {
    const user = userCredential.user;
    Swal.fire({
      icon: 'success',
      title: 'Sign Up',
      text:   "Successfull SignUp",

       })    
    await setDoc(doc(db, "users", user.uid), {
      name: fullName.value,
      email: signInEmail.value
    });
    console.log("firestore ma agya")
    flag = true;
    location.href="/userpost.html"

    
    
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    Swal.fire({
      icon: 'error',
      title: 'Wrong',
      text:  errorMessage,
       })
      });

});

let goProfile = document.getElementById("goProfile")
goProfile && goProfile.addEventListener("click" , () => {
    profile.style.display="block"
    nav.style.display="none"

    console.log("sign in Button ==>")
})
 