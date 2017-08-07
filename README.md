# Mondia_starter
Landing Page Starter Template

read wiki for full installation
https://github.com/mozahersalem/Mondia_starter/wiki/Installalation


You will need to install

## node 
https://nodejs.org/en/

## npm 
will install with node check with npm --version

## grunt 
https://gruntjs.com/getting-started

### clone the repo and run npm install 

tasks:

# grunt 
    Create dist folder and 
    css/global.less
    dist/global.css

# grunt watch

keep watching for chang in (global.css), (app.js)

``` CSS
// Project files.
  css/**/*.less
  dist/global.css
 ```

 ``` JS
  js/**/*.js
  js/app.js
```

# grunt dist

minify (global.css to global.min.css), (app.js to app.min.js)
copy all css from global.min.css
and js from app.min.js
and embed in upload/index.html


```js
// Project files.
   upload/index.html
   ```

