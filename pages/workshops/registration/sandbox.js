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

function getQueryParams(url) {
  let queryParams = {};
  // Create a new URL object
  let urlObj = new URL(url);
  // Use the searchParams property of the URL object
  for (let pair of urlObj.searchParams.entries()) {
    queryParams[pair[0]] = pair[1];
  }
  return queryParams;
}

window.onload = function () {
  // Get the query parameters from the URL

  // Get the value of the 'domain' parameter
  let { domain } = getQueryParams(window.location.href);

  // Get the select element
  let select = document.getElementById("domain");

  // Loop through the options in the select element
  for (let i = 0; i < select.options.length; i++) {
    let option = select.options[i];

    // If the value of the option matches the 'domain' parameter,
    // set the option as selected
    if (option.value === domain) {
      option.selected = true;
      break;
    }
  }
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("hello");
  const phoneNumber = phoneInput.value;

  const isValid = is10DigitNumber(phoneNumber);
  if (isValid) {
    const elements = form.elements;
    console.log(elements);
    const formData = {};
    // for (var i = 0; i < elements.length; i++) {
    //   var element = elements[i];
    //   if (element.name) {
    //     formData[element.name] = element.value;
    //   }
    // }
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      if (element.name) {
        if (element.type === "select-multiple") {
          var selectedOptions = Array.from(element.selectedOptions).map(
            (option) => option.value
          );
          if (formData[element.name]) {
            formData[element.name] =
              formData[element.name].concat(selectedOptions);
          } else {
            formData[element.name] = selectedOptions;
          }
        } else {
          if (formData[element.name]) {
            formData[element.name] = [].concat(
              formData[element.name],
              element.value
            );
          } else {
            formData[element.name] = element.value;
          }
        }
      }
    }
    console.log(typeof formData.domain);
    if (typeof formData.domain === typeof []) {
      formData.domain = formData.domain.join(", ");
    }
    formData["phone-number"] = parseInt(formData["phone-number"]);
    console.log(formData);
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

