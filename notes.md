# TypeScript Notes

## Initializing a plain Project (no framework or library)

1. Run these commands: 
```Bash
npm init # Creates package.json
npm install typescript --save-dev # Installs TypeScript
npx tsc --init # Creates tsconfig.json. Alt: Copy from one of these projects.
npm install lite-server --save-dev
```

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

2. Create bs-config to point lite-server to root serving directory
 
 ```Javascript
{
	"server": { "baseDir": "./"}
}
 ````
 
3. Install Webpack and other build dependencies.

Run these commands:
```Bash
npm install webpack webpack-cli webpack-dev-server typescript ts-loader
```

 - Webpack the main webpack package for bundling and transforming code when distributing.
 - Webpack-cli to run webpack commands.
 - Webpack-dev-server for automatically trigger webpack to compile.
 - TypeScript for having a local typescript instalation in case of global version mismatches with project version.
 - Ts-loader works with webpack to convert typescript to javascript to enable typescript to js compilation and then bundling.
 
3.1 Create webpack.config.js file  

Look at the [official webpack docs](https://webpack.js.org/concepts/) for more information 

```Javascript
const path = require("path");

module.exports = {
    entry: "./src/script/app.ts",
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "build")
    },
    devtool: "inline-source-map",
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