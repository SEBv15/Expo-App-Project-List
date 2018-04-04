/*
 * This thing gets mines data from http://expo.io/@username to get the desired user's info and a list of the apps he made
 * 
 * By Sebastian Strempfer 
 */

var fetch = require("fetch").fetchUrl

module.exports = function expoProjectList(username, callback, errorCallback = undefined) {

    fetch("http://expo.io/@"+username, function(error, meta, body) {
        if(!error) {
            body = body.toString();
            processData(body);
        } else {
            errorCallback(error);
        }
    })

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