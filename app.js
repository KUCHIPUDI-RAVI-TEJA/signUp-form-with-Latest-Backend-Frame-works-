//jshint esversion:6
var express = require("express");
var bodyParser = require("body-parser");

const mongoose = require('mongoose');
var app = express()

app.use(express.static("public"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
  extended: true
}));
mongoose.connect('mongodb://localhost:27017/signupDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});



const usersSchema = new mongoose.Schema({
  fullName: String,
  email: String,
  password: String,
  date: String,
  gender: String,
  time : { type : Date, default: Date.now }
});

const User = mongoose.model("User", usersSchema);


app.get("/", function(req, res) {
  res.render("home")
})

app.get("/register", function(req, res) {
  res.render("register");
})



app.post("/register", function(req, res) {
  const newUser = new User({
    fullName: req.body.fullName,
    email: req.body.email,
    password: req.body.password,
    date: req.body.date,
    gender: req.body.gender,
    time:req.body.time
  })

  newUser.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.render("welcome");
    }
  })

})



app.listen(3000, function() {
  console.log('server started at port 3000');
});
