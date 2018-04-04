/*
 * This thing gets mines data from http://expo.io/@username to get the desired user's info and a list of the apps he made
 * This doesn't work on IE 7/8 because of the xhr request. Feel free to use jQuery's ajax instead to add support for that disgusting deprecated thing that calls itself a web browser :)
 * 
 * By Sebastian Strempfer 
 */

function expoProjectList(username, callback, errorCallback = undefined) {

    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            if(xhr.status === 200 || xhr.status === 304) {
                processData(xhr.responseText);
            } else {
                if(errorCallback) {
                    errorCallback(xhr);
                }
            }
        }
    }
    xhr.open('GET', "http://expo.io/@"+username, true);
    xhr.send(null);

    function processData(html) {
        html = html.split("__NEXT_DATA__")[1].substr(3);

        // Limit 'html' to just the raw JSON object
        var depth = 0
        for(let i in html) {
            if(html[i] == "{") {
                depth++
            }
            if(depth == 0) {
                html = html.substr(0,i)
                break
            }
            if(html[i] == "}") {
                depth--
            }
        }

        html = JSON.parse(html)["props"]["initialApolloState"]

        // Make data easier to read
        var out = {}
        out.apps = []

        for(let key in html) {
            if(key.substr(0,5) == "User:") {
                out.user = html[key]
            }
            if(key.substr(0,4) == "App:") {
                out.apps.push(html[key])
            }
        }

        callback(out);
    }
}