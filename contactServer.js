var express        =         require("express");
var bodyParser     =         require("body-parser");
var fs  =   require('fs');
var cors = require('cors')
var _ = require('lodash');
var app  =  express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get('/api/contactSearch' +
    '' +
    '', function (req, res) {
    fs.readFile('../src/Contact.json', (err, data) => {
        if (err) throw err;
        let contact = JSON.parse(data);
        console.log(contact);
        var keyword = req.query.contactName;
        //console.log(keyword);
        let result = searchContact(contact,keyword);
        console.log(result);
        res.send(JSON.stringify(result));
    });

})

app.post('/api/addContacts', function (req, res) {
    // First read existing users.
    let contacts = [];
   console.log('Hit POST API' +  req);
    if(req.body!= null){
    const newcontact = req.body;
    contacts.push(newcontact);
    let data = JSON.stringify(contacts);
    console.log(data);
    fs.writeFile('../src/Contact.json', data, (err) => {
            if (err) throw err;
            console.log('Data written to file');
     });
     console.log('This is after the write call');
    }
})

function searchContact(x, somename){
    var result=[];
    for(var i = 0; i < x.length; i++) {
        if (x[i]['Name'] == somename ){
            result.push(x[i]);
        }
    }
    return result; //Array containing matched names. Returns empty array if no matches found.
}



var server = app.listen(8082, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s")
})