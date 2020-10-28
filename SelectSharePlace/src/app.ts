import axios from "axios";

const API_KEY = process.env.API_KEY;
console.log(API_KEY);
const form = document.querySelector("form")! as HTMLFormElement;
const addressInput = document.getElementById("address")! as HTMLInputElement;

//Note! These are not all the fields in the response, just the ones we need.
type GoogleGeocodingResponse = {
    results: {geometry: {location: {lat: number, lng: number}}}[];
    status: "OK" | "ZERO_RESULTS";
}

function searchAddressHandler(event: Event) {
    event.preventDefault();
    const enteredAdress = addressInput.value;

    axios.get<GoogleGeocodingResponse>(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURI(enteredAdress)}&key=${API_KEY}`)
        .then((response: any) => {
            if (response.data.status !== "OK") {
                throw new Error("Could not fetch location!");
            }
            
            const coordinates = response.data.results[0].geometry.location;
            console.log(coordinates);
        }).catch((error: any) => {
            alert(error.message);
    })
}

form.addEventListener("submit", searchAddressHandler);