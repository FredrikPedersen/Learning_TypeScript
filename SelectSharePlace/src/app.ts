import axios from "axios";
import {API_KEY} from "./constants";
import {addMapToDOM} from "./mapLoader";

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
            const map = new google.maps.Map(document.getElementById("map") as HTMLElement, {
                center: coordinates,
                zoom: 13,
            });

            new google.maps.Marker({position: coordinates, map: map});

            console.log(coordinates);
        }).catch((error: any) => {
            alert(error.message);
    })
}

addMapToDOM();
form.addEventListener("submit", searchAddressHandler);