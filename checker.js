var express = require("express");

var app = express();
var handlebars = require("express-handlebars").create({ defaultLayout: "main" });
var bodyParser = require('body-parser');

app.engine("handlebars", handlebars.engine);
app.set("view engine", "handlebars");
app.set("port", 3000);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", function (req, res) {
    var getParams = [];
    for (var p in req.query) {
        getParams.push({ 'name': p, 'value': req.query[p] });
    }
    var context = {};
    context.dataList = getParams;
    res.render("get", context);

});

app.post("/", function (req, res) {
	var postParams = [];
    for (var p in req.body) {
        postParams.push({ 'name': p, 'value': req.body[p] });
    }
	var context = {};
    context.dataList = postParams;
    res.render("post", context);
});

app.use(function (req, res) {
    res.render("home", context);
});

app.use(function (req, res) {
    res.status(404);
    res.render('404');
});

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.type('plain/text');
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function () {
    console.log('Express started on http://localhost:' + app.get('port') + '; press ctrl-c to terminate.');
    //console.log('Express started on http://flip3.engr.oregonstate.edu:' + app.get('port') + '; press Ctrl-C to terminate.');
});