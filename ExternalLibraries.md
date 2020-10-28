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

