import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth ,createUserWithEmailAndPassword ,onAuthStateChanged ,reauthenticateWithCredential , EmailAuthProvider , updatePassword  } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import {doc, setDoc, getFirestore, getDoc ,serverTimestamp , collection, query, where, getDocs ,addDoc ,deleteDoc,updateDoc     } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";
 import { getStorage, ref , uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-storage.js";


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
const storage = getStorage();

 
let flag = true;
 
 
let fullName = document.getElementById("userName")
let userEmail = document.getElementById("userEmail")
let userUid = document.getElementById("uid")
let fileInput = document.getElementById("fileInput")
let oldPassword = document.getElementById("oldPassword")
let newPassword = document.getElementById("newPassword")



//  Get Current User 

let myName = document.getElementById("myName")
myName && myName.addEventListener("click",() => {
  location.href = "/userpost.html"
 })
let getCurrentUser = async(uid) => {
let profileImg = document.getElementById("profileImg")

  const docRef = doc(db, "users", uid);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("docSnap.data() ",docSnap.data())
  if(location.pathname === "/userpost.html"){
    // fullName.innerHTML = docSnap.data().name
  } else if ( location.pathname === "/index.html"){
      myName.innerHTML = docSnap.data().name

    }
      else if(location.pathname !== "/index.html") {
           fullName.value = docSnap.data().name;
           userEmail.value = docSnap.data().email
            userUid.value = docSnap.id
           if(docSnap.data().profile){
             profileImg.src = docSnap.data().profile
             }
  }
        
 }else{

  console.log("No such document!");
}

};

 
// 𝓐𝓵𝓵 𝓑𝓵𝓸𝓰𝓼


let allBlogs = document.getElementById("allBlogs")

allBlogs && allBlogs.addEventListener("click",() => {
  location.href = "/index.html"
})

let allUserBlogs = document.getElementById("allBlogDiv")
let allUserBlog = async() => {
  const querySnapshot = await getDocs(collection(db, "userPost"));
querySnapshot.forEach((doc) => {
  allUserBlogs.innerHTML += `
  <div class="blogDiv">
     <div class="imgh5">
     <img class="blogImg mx-3 mt-2" src="${doc.data().user.ProfileURL}">
      <h5>${doc.data().heading}
      <br>
      <p class="nameTime">${doc.data().user.name}  - <span> ${doc.data().timestamp.toDate().toDateString()}</p>     
      </h5>
     </div>
     <div class="paragraph mx-3">
      <p>
        ${doc.data().text}
      </p>
      </div>
  </div>
  `
 console.log(doc.id, " => ", doc.data());
});
}
 






// Update Profile


let UpdateuserPassword = (oldPass,newPass) => {
 return new Promise( (resolve,reject) => {
  const currentUser = auth.currentUser;
  console.log("Current User" ,currentUser)
  const credential = EmailAuthProvider.credential(
    currentUser.email,
    oldPass
  )
  reauthenticateWithCredential(currentUser, credential ).then((res) => {
console.log("REs---->", res) 

updatePassword(currentUser, newPass).then(() => {
  resolve(res)
}).catch((error) => {
  reject(error)
    });


 }).catch((error) => {
   console.log("Erroe  ",error)
   reject(error)
  });


 })
}

let UpdateBtn = document.getElementById("UpdateBtn");

UpdateBtn && UpdateBtn.addEventListener("click" , async () => {
  try{

    if(oldPassword.value && newPassword.value) {
      await UpdateuserPassword(oldPassword.value,newPassword.value)
      console.log("Update...>")
    }
     const user = {
        name: fullName.value
      }
      
      
      if(fileInput.files[0]){
           user.ProfileURL = await updateFile(fileInput.files[0]) 
        }
        const updateRef = doc(db, "users", userUid.value ); 
         await updateDoc(updateRef, user);
        oldPassword.value = ""
        newPassword.value = ""
        Swal.fire(
          'Profile',
          "Profile Update",
          'success',
           )

        
      } catch(error){
        Swal.fire({
          icon: 'error',
          title: 'Wrong',
          text:  error,
           })
           console.log(error)
      }
      })
      
      



      let CurrentBlog = async(uid) => {
        blog.innerHTML = ""
        const q = query(collection(db, "userPost"), where("uid", "==", uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
console.log("user ====>>>")
let blog = document.getElementById("blog");

         blog.innerHTML += `
    <div class="blogDiv">
       <div class="imgh5">
       <img class="blogImg mx-3 mt-2" src="${doc.data().user.ProfileURL}">
        <h5>${doc.data().heading}
        <br>
        <p class="nameTime">${doc.data().user.name}  - <span> ${doc.data().timestamp.toDate().toDateString()}</p>     
        </h5>
       </div>
       <div class="paragraph mx-3">
        <p>
          ${doc.data().text}
        </p>
        <button  onclick="editBlog('${doc.id}','${doc.data().heading}','${doc.data().text}')" class="btn">Edit</button>
        <button  onclick="deleteBlog('${doc.id}')" class="btn">Delete</button>
       </div>
    </div>
    `
    placeholder.value= "";
    placeholderText.value ="";

         console.log(doc.id, " => ", doc.data().timestamp);
      });
      }



      // Publish Blog


let publish = document.getElementById("publish"); 
publish && publish.addEventListener("click" , async () => {
       try{

           let placeholder = document.getElementById("placeholder")
           let placeholderText = document.getElementById("placeholderText")
           const currentUser = auth.currentUser;
            const userRef = doc(db, "users", currentUser.uid);
           const userData = await getDoc(userRef);
           console.log("UserData",userData)
           const docRef = await addDoc(collection(db, "userPost"), {
               heading: placeholder.value,
               text: placeholderText.value,
               timestamp: serverTimestamp(),
               uid : currentUser.uid,
               user : userData.data()

           });
           CurrentBlog(currentUser.uid);
           placeholder.value = ""
           placeholderText.value = ""
           Swal.fire(
             'Blog',
             "Blog Publish",
             'success',
              )
           console.log("Document written with ID: ", docRef.id);
       } catch(e){
         Swal.fire({
           icon: 'error',
           title: 'Wrong',
           text:  e,
            })
     
           console.log("error==>",e)
       }
         
});



      //  on AuthState Changed


onAuthStateChanged(auth, (user) => {
  if (user) {
        getCurrentUser(user.uid);
        if(location.pathname == "/userpost.html"){
          CurrentBlog(user.uid)
        }
        if(location.pathname === "/index.html"){
          allUserBlog(user.uid)
        }

      if(location.pathname !== "/index.html" && location.pathname !== "/profile.html" && location.pathname !== "/userpost.html" && flag){
        console.log("Kuch aya kya",user)
        location.href = "userpost.html";
      }
   } else {
    if(location.pathname !== "/login.html" && location.pathname !== "/signin.html"){

       location.href="/login.html"
    }
    console.log("user Nhi hn ==>")
  }
});


 let loginLink = document.getElementById("loginLink");
 loginLink && loginLink.addEventListener("click", ()=>{
    location.href="login.html"
});
 let signInBtn =document.getElementById('signUpButton');
 signInBtn && signInBtn.addEventListener("click" , () =>{
let fullName = document.getElementById("fullName")
let signInEmail = document.getElementById("email")
let signInPAssword = document.getElementById("password")
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
 
    console.log("sign in Button ==>")
})



let updateFile = (file) => {
   return new Promise((resolve , reject) => {
       const storageRef  = ref(storage,`image/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef , file);
    uploadTask.on('state_changed', 
    (snapshot) => {
       const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    }, 
    (error) => {
      console.log("error" ,error)
      reject(error)
      Swal.fire({
        icon: 'error',
        title: 'Wrong',
        text:  error,
         })
      }, 
    () => {
       getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL);
         resolve(downloadURL)
        Swal.fire({
          icon: 'success',
          title: 'Updated',
          text:   "Successfull Updated",
    
           })   
      });
    }
  ); 
   
   })
}


let deleteBlog = async(id) => {
  const currentUser = auth.currentUser;
  console.log(id)
  await deleteDoc(doc(db, "userPost", id));
  Swal.fire({
    icon: 'success',
    title: 'Deleted',
    text:   "Blog Delete",

     }) 
      CurrentBlog(currentUser.uid);

}

let updateEditBlog = document.getElementById("updateEditBlog");
let UpdateTitle = document.getElementById("Update-title")
let UpdateDes = document.getElementById("Update-des")
let uid = ""
let editBlog = (id,title,descreption) => {
  updateEditBlog.style.display="block"
  UpdateTitle.value = title
  UpdateDes.value = descreption,
  uid = id
}

let editBtn = document.getElementById("editBtn")
editBtn && editBtn.addEventListener("click" , async () => {
  
  
   const currentUser = auth.currentUser;
   const washingtonRef = doc(db, "userPost", uid);
   
   // Set the "capital" field of the city 'DC'
   await updateDoc(washingtonRef, {
     heading: UpdateTitle.value,
     text : UpdateDes.value
    });
    Swal.fire({
      icon: 'success',
      title: 'Edit',
      text:   "Blog Edit",
      
    })
    updateEditBlog.style.display="none"
    CurrentBlog(currentUser.uid);
    
  })
  
  
  let closeBlog = document.getElementById("closeBlog")
closeBlog && closeBlog.addEventListener("click", () => {
  updateEditBlog.style.display="none"

})
window.deleteBlog = deleteBlog
window.editBlog = editBlog