const express = require('express')
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var bodyParser = require('body-parser');
var path = require('path');


function create_table(req) {

    var myParams = {};
    for (var p in req) {
        myParams[p] = req[p]
    }

    return myParams
}


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




// every time it gets a request, will check the session id to see some unique identifiers
app.get('/', (req, res) => {
    // also puts into the header what kind of request it was.
    req.title = 'Home Page'
    req.images = ['/images/fun_time','/images/epic_looking', 'images/wwe_pika']
    res.render('home', req)
})

app.get('/is_shiny', (req, res) => {
    var thing = [1,2,3]
    req.title = 'Shiny Pokemon Search'
    res.render('is_shiny', req)
})

app.get('/weather_type', (req, res) => {
    req.title = 'Strong in this Weather Types'
    res.render('is_shiny', req)
})

app.post('/', (req, res) => {
    // that puts into the header what kind of request that it was.
    putInValue(req, req.title, 'is_shiny')
    console.log(req.body)
    req.someParams = create_table(req.query)
    req.bodyParams = create_table(req.body)
    // so it re renders on the post, it doesn't do another get every time something happens
    res.render('home', req)
})

// when the app gets the first ready signal for the page.
app.listen(app.get('port'), () => {
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
})
module.exports = app
