# tozti-gulp
*A Gulp wrapper used by tozti extensions.*

This package sets up a [Gulp](https://gulpjs.com/) program that compiles ES2015, Vue and SASS files for use within Tozti extensions.

It is not meant to be used alone, but rather as a dependency of your extension. For instance, in your `gulpfile.js`:
```js
let gulp = require('tozti-gulp')

gulp({
    scripts: ['src/index.js'],
    fonts: ['assets/fonts'],
    images: ['assets/img'], 
    styles: ['assets/sass/style.scss'],
})
```

In order to minimize disk usage, this package can be installed globally.