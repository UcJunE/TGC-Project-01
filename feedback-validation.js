document.querySelector("#submit-btn").addEventListener("click", function () {
  // target all the relevant input text box

  let username = document.querySelector("#form-name").value;
  let email = document.querySelector("#form-email").value;
  let subjectText = document.querySelector("#form-subject").value;
  let messageText = document.querySelector("#form-message").value;

  //target all the error message element
  let nameError = document.querySelector("#name-error");
  let emailError = document.querySelector("#email-error");
  let subjectError = document.querySelector("#subject-error");
  let messageError = document.querySelector("#message-error");

  // console.log(username, email, subjectText, messageText);
  // to validate name

  if (username == "") {
    nameError.innerHTML = "Please provide your name";
  } else {
    nameError.innerHTML = "";
  }

  //to validate email

  if (!email.includes("@") || !email.includes(".")) {
    emailError.innerHTML = "Please provide valid email";
  } else {
    emailError.innerHTML = "";
  }

  //to validate subject
  if (subjectText == "") {
    subjectError.innerHTML = "Please provide subject";
  } else {
    subjectError.innerHTML = "";
  }

  // to validate message
  if (messageText == "") {
    messageError.innerHTML = "Please provide message";
  } else {
    messageError.innerHTML = "";
  }
});
