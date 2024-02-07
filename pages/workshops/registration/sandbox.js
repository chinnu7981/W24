const { initializeApp } = require("firebase/app");
const { getFirestore, collection, addDoc } = require("firebase/firestore");
const firebaseConfig = {
  apiKey: "AIzaSyAPTJNlY-hCX0uGfUZzAXfn4m05DOGOm1w",
  authDomain: "wissenaire-401008.firebaseapp.com",
  projectId: "wissenaire-401008",
  storageBucket: "wissenaire-401008.appspot.com",
  messagingSenderId: "160027367801",
  appId: "1:160027367801:web:77635d4f23adcb091937a8",
  measurementId: "G-TEB52183BC",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const colref = collection(db, "workshopsRegistration");
const form = document.getElementById("myForm");
const phoneInput = document.getElementById("phone");
function is10DigitNumber(str) {
  return /^\d{10}$/.test(str);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("hello");
  const phoneNumber = phoneInput.value;

  const isValid = is10DigitNumber(phoneNumber);
  if (isValid) {
    const elements = form.elements;
    console.log(elements);
    const formData = {};
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      if (element.name) {
        formData[element.name] = element.value;
      }
    }
    addDoc(colref, formData)
      .then(() => {
        alert("added");
      })
      .catch((e) => {
        alert("failed");
        console.log(e);
      });
  } else {
    alert("INVALID CONTACT NUMBER");
  }
});

// addDoc(colref, formData)
//         .then(() => {
//           alert("added");
//         })
//         .catch((e) => {
//           alert("failed");
//           console.log(e);
//         });
