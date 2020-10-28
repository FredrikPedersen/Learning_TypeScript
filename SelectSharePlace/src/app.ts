const API_KEY = process.env.API_KEY;
const form = document.querySelector("form")! as HTMLFormElement;
const addressInput = document.getElementById("address")! as HTMLInputElement;

function searchAddressHandler(event: Event) {
    event.preventDefault();
    const enteredAdress = addressInput.value;
    console.log(enteredAdress);
    console.log(API_KEY);
}

form.addEventListener("submit", searchAddressHandler);