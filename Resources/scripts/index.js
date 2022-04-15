const baseUrl = "https://localhost:5001/tidepaykeeping-api/Employee"; //api to reach the employee table in database
var employeeList = [];
var myEmployees = {};

function logIn(){
    const email = document.getElementById("getEmail").value;
    const password = document.getElementById("getPassword").value;
    const getEmployeeApiUrl = baseUrl + "/" + email + "/" + password;
    fetch(getEmployeeApiUrl).then(function(response){ 
        console.log("made it");
        return response.json();
    }).then(function(json) { //asyncronous call
        // console.log(json);
        employeeList=json;
        console.log(employeeList);
        //let html=getFavSongs();
        // document.getElementById("getEmail").value;
        // document.getElementById("getPassword").value;
        window.location.href = "./template.html";
    }).catch(function(error) {
        console.log(error);
    });
}

// function setFormMessage(formElement, type, message)
// {
//     const messageElement = form.Element.querySelector(".form__message");

//     messageElement.textContect = message;
//     messageElement.classList.remove("form__message--success", "form__message--error");
//     messageElement.classList.add(`form__message--${type}`);
// }

// document.addEventListener("DOMContentLoaded", () =>{
//     const loginForm = document.querySelector("#login");
//     const createAccForm = document.querySelector("#createAcc");

//     document.querySelector("#linkCreateAcc").addEventListener("click", () => {


//         loginForm.classList.add("form--hidden");
//         createAccForm.classList.remove("form--hidden");
        
        
//     })

// });

