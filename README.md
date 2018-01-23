# tozti-gulp
*A Gulp wrapper used by tozti extensions.*

This package sets up a [Gulp](https://gulpjs.com/) program that compiles ES2015, Vue and SASS files for use within tozti extensions.


## Usage.
This package is not meant to be used alone, but rather as a dependency of your extension.

For instance, add the following to your `package.json`:
```json
"devDependencies": {
    "gulp": "^3.9.1",
    "gulp-tozti": "tozti/tozti-gulp"
},
```

And then invoke `tozti-gulp` in your `gulpfile.js`:
```js
let gulp = require('tozti-gulp')

gulp({
    scripts: ['src/index.js'],
    fonts: ['assets/fonts'],
    images: ['assets/img'], 
    styles: ['assets/sass/style.scss'],
})
```

## Installing `tozti-gulp` globally.

As this package and its dependencies are quite heavy, you might not want to add a copy of them to each of your tozti extensions. One way to avoid this by installing this package globally (using the `-g` flag), and then link that global instance in each of the extensions you are working on.

First of all, make sure that you're running the latest version of npm using:
```
npm install -g npm@next
```

Then, install this package globally from GitHub:
```
npm install -g tozti/tozti-gulp
```

Finally, to use it inside a tozti extension, run this command inside the extension's folder (instead of running `npm install`):
```
npm link tozti-gulp
```