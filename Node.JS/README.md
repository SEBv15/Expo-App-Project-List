# Expo App Project List
## Installation
#### Web Browser
Download the contents of the `JavaScript` folder and place it somewhere accessible from your domain
include `<script src="/path/to/package/project-list.min.js"></script>` in your `<head>`.
#### Node.JS
`npm i expo-app-project-list` to install and include with `var expoProjectList = require("expo-app-project-list")`
## Usage
```
expoProjectList("username", function(data) {
    console.log(data)
}, function(error) {
    /* will only execute when error present */
    /* NOT REQUIRED */
    console.log(error);
});
```