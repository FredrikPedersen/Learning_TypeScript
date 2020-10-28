# Libraries

General notes on how to utilize different third party libraries with TypeScript.

## Dotenv

 - Has no @types version, so needs a workaround via Webpack.

```Bash
npm install --save-dev dotenv-webpack
```

In webpack-config add:

```Javascript
const Dotenv = require("dotenv-webpack");
module.exports = {
  plugins: [new Dotenv()],
};
```

Can now be used like this in TypeScript:

```TypeScript
const ENV_VALUE = process.env.VALUE;
```

## Axios

Has built-in TS-support, no config required.

```Bash
npm install --save axios
```

## Google Maps

Easiest way to get a map working seems to be to create a addMapToDOM function, after installing googlemaps types.
See project [SelectSharePlace](https://github.com/FredrikPedersen/Understanding_TypeScript/tree/master/SelectSharePlace) for a working example.

```Bash
npm install --save-dev @types/googlemaps
```

```Javascript
export function addMapToDOM() {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    script.async = true;
    script.defer = true;

    document.head.appendChild(script);
}
```