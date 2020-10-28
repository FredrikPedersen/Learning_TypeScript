# Project Setup Notes

## With Webpack: 

1. Run these commands
```Bash
npm init # Creates package.json
npm install webpack webpack-cli webpack-dev-server typescript ts-loader
npx tsc --init # Creates tsconfig.json. Alt: Copy from one of these projects.
```

 - Webpack the main webpack package for bundling and transforming code when distributing.
 - Webpack-cli to run webpack commands.
 - Webpack-dev-server for automatically trigger webpack to compile.
 - TypeScript for having a local typescript instalation in case of global version mismatches with project version.
 - Ts-loader works with webpack to convert typescript to javascript to enable typescript to js compilation and then bundling.
 - Clean-webpack-plugin is for wiping the build folder before rebundling the project in production environment.

1.1 If initializing a new tsconfig, make sure to atleast have these values:

```Javascript
{
	"compilerOptions": {
		"target": "es6",
		"module": "es2015",
		"sourceMap": true,   
		"outDir": "./dist",
		"removeComments": true,
		"experimentalDecorators": true,
	},
	"exclude": [
		"node_modules"
	]
}
````
 
1.2 Create webpack.config.js file for development

This can be done using [createapp.dev](https://createapp.dev/) if you are uncertain how to set up the config file.
Look at the [official webpack docs](https://webpack.js.org/concepts/) for more information 

```Javascript
module.exports = {
    mode: "development",
    entry: "./src/script/app.ts",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "build"),
        publicPath: "build"
    },
    devtool: "inline-source-map",
    devServer: {
        contentBase: "./build",
    },
    module: {
        rules: [
            {
                test: /\.ts$/, // Regex specifying that all .ts-files should be handled by this rule
                use: "ts-loader",
                exclude: /node_modules/
            }
        ],
    },
    resolve: {
        extensions: [".ts", "js"] //enables webpack to look for ts and js files. Only js files is default.
    }
};
```

1.3 Create webpack.config.prod.js file for production setup

```Javascript
const path = require("path");
const CleanPlugin = require("clean-webpack-plugin");

module.exports = {
    mode: "production",
    entry: "./src/script/app.ts",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "build")
    },
    devtool: "none",
    devServer: {
        contentBase: "./build",
    },
    module: {
        rules: [
            {
                test: /\.ts$/, // Regex specifying that all .ts-files should be handled by this rule
                use: "ts-loader",
                exclude: /node_modules/
            }
        ],
    },
    resolve: {
        extensions: [".ts", "js"] //enables webpack to look for ts and js files. Only js files is default.
    },
    plugins: [
        new CleanPlugin.CleanWebpackPlugin()
    ]
};
```


1.4 Configre package.json

This is not required, but make sure to add scripts to package.json to make life a bit easier for yourself
```Javascript
"scripts": {
	"test": "echo \"Error: no test specified\" && exit 1",
    "start": "lite-server",
    "build": "webpack",
    "prod-build": "webpack --config webpack.config.prod.js"
},
```

1.5 Set Javascript CDN in index.html to point to bundle.js.

## With lite-server (for smaller projects): 

2 Run these commands
```Bash
npm init # Creates package.json
npm install typescript --save-dev # Installs TypeScript
npx tsc --init # Creates tsconfig.json. Alt: Copy from one of these projects.
npm install lite-server --save-dev
```

2.1 If initializing a new tsconfig, make sure to atleast have these values:

```Javascript
{
	"compilerOptions": {
		"target": "es6",
		"module": "es2015",
		"sourceMap": true, 
		"rootDir": "./src/script"		
		"outDir": "./dist",
		"removeComments": true,
		"experimentalDecorators": true,
	},
	"exclude": [
		"node_modules"
	]
}
````

2.2 Create bs-config to point lite-server to root serving directory
 
 ```Javascript
{
	"server": { "baseDir": "./"}
}
 ````

2.3 Configre package.json

```Javascript
"scripts": {
	"test": "echo \"Error: no test specified\" && exit 1",
    "start": "lite-server",
},
```

2.4 Set Javascript CDN in index.html to point to whatever generated js-file should be your entry point.

2.5 If working with ES6 modules, remember to set Javascript CDN type to "module", and add .js file endings to all imports in TypeScript.

```HTML
<script type="module" src="/build/app.js" defer></script>
```

```Javascript
import {ProjectList} from "./components/projectList.js";
```
