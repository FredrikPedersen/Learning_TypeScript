import {API_KEY} from "./constants";

export function addMapToDOM() {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    script.async = true;
    script.defer = true;

    document.head.appendChild(script);
}