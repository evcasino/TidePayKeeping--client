function setFormMessage(formElement, type, message)
{
    const messageElement = form.Element.querySelector(".form__message");

    messageElement.textContect = message;
    messageElement.classList.remove("form__message--success", "form__message--error");
    messageElement.classList.add(`form__message--${type}`);
}

document.addEventListener("DOMContentLoaded", () =>{
    const loginForm = document.querySelector("#login");
    const createAccForm = document.querySelector("#createAcc");

    document.querySelector("#linkCreateAcc").addEventListener("click", () => {


        loginForm.classList.add("form--hidden");
        createAccForm.classList.remove("form--hidden");
        
        
    })

});

