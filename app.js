const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const app = express();


// Add the following to serve up static pages(css, scripts, images)
app.use(express.static("public"));
// Use body parser to pull data from form.
app.use(bodyParser.urlencoded({ extended: true }));
//====================

app.get('/', function (req, res) {
    //Form Post Request
    res.sendFile(__dirname + '/signup.html')
  })

app.post("/", function(req,res){
    let firstName = req.body.fName;
    let lastName = req.body.lName;
    let email = req.body.Email;

    console.log(firstName, lastName, email);

})


app.listen(3000, function(){
    console.log('Server running on port 3000')
})





