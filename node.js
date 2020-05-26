const express = require('express')
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var bodyParser = require('body-parser');
var path = require('path');


// create our app obj
const app = express()
// set the port to the port you are communicating with
app.set('port', 3000);
//

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.engine('handlebars', handlebars.engine)
app.set('view engine', 'handlebars')
app.use(express.static(path.join(__dirname + '/public')));


app.use(express.json())
app.use(express.urlencoded({extended: false}))

function api_call(url, host, hostPair, key, keyPair, query, queryPair) {
    // function for making api call with the pokemon api site that I have.
    // for each render, have to put it in on load function for this, then parse the
    //data to a json, and then you can render the page.
    var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
    var newReq = new XMLHttpRequest();
    newReq.open("GET", url)
    newReq.setRequestHeader(host, hostPair)
    newReq.setRequestHeader(key, keyPair)
    newReq.setRequestHeader(query, queryPair)
    newReq.send()
    return newReq
}






app.get('/', (req, res) => {
    // also puts into the header what kind of request it was.
    req.title = 'Home Page'
    req.images = ['/images/fun_time', '/images/epic_looking', 'images/wwe_pika']
    res.render('home', req)
})

app.post('/', (req, res) => {
    res.download("/images/pokemon_go_cheatsheet.jpg")
    res.render('home', req)
})

app.get('/survey', (req, res) => {
    // also puts into the header what kind of request it was.
    req.title = 'Pokemon Survey'
    req.day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    res.render('survey', req)
})


app.get('/alolan', (req, res) => {
    req.title = 'Alolan Pokemon in Scrolling text element'
    var aReq = api_call("https://pokemon-go1.p.rapidapi.com/alolan_pokemon.json", "x-rapidapi-host",  "pokemon-go1.p.rapidapi.com",
        "x-rapidapi-key", "3ee34390c0msh41a879d140ef586p1d24b8jsn5ec51d1df08a", "useQueryString",
        true)
    aReq.onload = function () {
        var alolan = JSON.parse((aReq.responseText))
        req.alolan = alolan
        res.render('alolan', req)
    }
})

app.get('/weather_type', (req, res) => {
    req.title = 'Strong in this Weather Types'
    var newReq = api_call("https://pokemon-go1.p.rapidapi.com/weather_boosts.json", "x-rapidapi-host", "pokemon-go1.p.rapidapi.com",
        "x-rapidapi-key", "3ee34390c0msh41a879d140ef586p1d24b8jsn5ec51d1df08a", "useQueryString", true)
    newReq.onload = function () {
        var weatherTypes = JSON.parse(newReq.responseText)
        req.weather = weatherTypes
        res.render('weather_type', req)

    };


})

app.post('/survey', (req, res) => {
    // that puts into the header what kind of request that it was.
    res.render('survey', req)


    // so it re renders on the post, it doesn't do another get every time something happens
})



// when the app gets the first ready signal for the page.
app.listen(app.get('port'), () => {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
})
module.exports = app
