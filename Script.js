import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, ref, push, set, onChildAdded, remove } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDB4r7TdywhnwGZsvLbQtThQ4mUbAnR12c",
  authDomain: "useless-chat-databases.firebaseapp.com",
  databaseURL: "https://useless-chat-databases-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "useless-chat-databases",
  storageBucket: "useless-chat-databases.appspot.com",
  messagingSenderId: "85472490714",
  appId: "1:85472490714:web:958aa3cd85ba532782a1e3",
  measurementId: "G-BB1C32C15Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
console.log(" Firebase Connected!");

// Send function
window.send = function() {
    let nameThing = document.getElementById("NameThing");
    let inputThing = document.getElementById("ChatInput");

    if (nameThing.value !== "" && inputThing.value !== "") {
        const chatRef = ref(database, "chats");
    if (inputThing.value != "Fuck" ) {   
        push(chatRef, {
            name: nameThing.value,
            message: inputThing.value
        });

        inputThing.value = ""; 
    }
}
};

// Clear Messages Function
function clearMessages() {
    const chatRef = ref(database, "chats"); //  Fix: Clear "chats" instead of "messages"
    
    remove(chatRef)
        .then(() => {
            var li = document.createElement("li")
            li.appendChild(document.createTextNode("Clearing chat :)"))
            document.getElementById("ChatLi").appendChild(li)
            
        })
        .catch((error) => {
            console.error("Error clearing chat:", error);
        });
}

function clearActually(){

    document.getElementById("ChatLi").innerHTML = ""; //  Clear UI too
    console.log("Cleared Chat!")



}


setInterval(clearMessages, 20000);
setInterval(clearActually,23000);
// Listen for new messages
const chatRef = ref(database, "chats");
onChildAdded(chatRef, (snapshot) => {
    let chatData = snapshot.val();
    let li = document.createElement("li");
    li.appendChild(document.createTextNode(`${chatData.name}: ${chatData.message}`));
    li.style.fontFamily = "Arial";
    li.style.fontSize = "20px"
    document.getElementById("ChatLi").appendChild(li);
});
