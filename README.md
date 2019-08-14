# Promotion-pages-building-tool

# Landing Page Template


### Install

```
    $ npm install 
    Mac and linux users use sudo if needed
    $ sudo npm install

```




### DEV Mode

```
    $ grunt 

    $ grunt serve 
    will run localhost:9000 - with auto reload

```

### tasks

``` 
    grunt
    grunt serve
    grunt build
    grunt serve-bild
    grunt upload
    grunt zip
    grunt clean // use with caution 

```

### Build Mode


```
    $ grunt bulid

    $ grunt serve-build  
    will run localhost:8000 - NO auto reload

```


### \_FINAL\_UPLOADS folder will contain _grunt upload_


```
_FINAL\_UPLOADS
│
└─── min
|   |
|   index.html
|   index-success.html
|   index_01.html
|   index_01-success.html
|
└─── unmin
|   |
|   └─── app.css
|   └─── app.js
|   index.html
| 
└─── site.zip 
| 
index.html

```


#### \_FINAL\_UPLOADS content ^ folder will upload intp landing page server path

```
    EX. for du istream
    .com/Currency /projectID / club ID   / package ID or package / Jira issue
    .com/aed      /    5     / 56830008  /  69 || (d || w)       / DMC-22

    du-camp.mondiamediamena.com
    /aed/du/29/56830008/d/DUE-163/min/south_asian.html

```
