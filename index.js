// javascript
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://realtime-database-c83cb-default-rtdb.firebaseio.com/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const messageInDB = ref(database, "messages")

const inputEl = document.getElementById("input-el")
const publishBtn = document.getElementById("publish-btn")
const messageListEl = document.getElementById("message-list")

function newMessage() {
    let newMessage = inputEl.value
    if (newMessage) {
        push(messageInDB, newMessage)
        //clear input field function here
        //clearMessageListEl()
        clearInputEl()
    }
}

function clearMessageListEl() {
    messageListEl.innerHTML = ""
}

publishBtn.addEventListener("click", newMessage)

inputEl.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        newMessage()
    }
})

onValue(messageInDB, function (snapshot) {
    if (snapshot.exists()) {
        let itemsArray = Object.entries(snapshot.val())
        //clear function here
        clearMessageListEl()
        for (let i = 0; i < itemsArray.length; i++) {
            let currentItem = itemsArray[i]
            let currentItemID = currentItem[0]
            let currentItemValue = currentItem[1]

            //append item function here
            appendMessageListEl(currentItem)
        }
    } else {
        messageListEl.innerHTML = "<br><span id='noMessages'>No Endorsements</span>"
    }
})

function clearInputEl() {
    inputEl.value = ""
}

function appendMessageListEl(item) {
    let itemID = item[0]
    let itemValue = item[1]

    let newEl = document.createElement("li")
    newEl.textContent = itemValue

    newEl.addEventListener("click", function () {
        let exactLocationOfItemInDB = ref(database, `messages/${itemID}`)
        remove(exactLocationOfItemInDB)
    })
    messageListEl.append(newEl)
}