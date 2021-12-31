const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
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
    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.Email;
    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };


const jsonData = JSON.stringify(data);

const url = "https://us20.api.mailchimp.com/3.0/lists/6f140249cf";

const options = {
    method: "POST",
    auth: "<apikey.txt>"

}

const request = https.request(url, options, function(response){
    if(response.statusCode == 200) {
        res.sendFile(__dirname + '/success.html')
    } else {
        res.sendFile(__dirname + '/failure.html')

    }
    response.on("data", function(data){
        console.log(JSON.parse(data));
        
    });
});

request.write(jsonData);

request.end();

});

// FAILURE ROUTE - Upon failure redirect to "/"
app.post("/failure", function(req, res){
    res.redirect("/")

})


app.listen(3000, function(){
    console.log('Server running on port 3000')
})


