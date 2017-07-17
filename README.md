# Mondia_starter
Landing Page Starter Template

read wiki for full instulation
https://github.com/mozahersalem/Mondia_starter/wiki/Installalation


You will need to install node, npm, grunt

clone the repo and run npm install 

tasks:

# grunt watch

Less to css(global.css), all js files to (app.js)

```js
// Project files.
  css/global.less
  dist/global.css
    
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