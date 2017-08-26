import {
    Meteor
} from 'meteor/meteor';
import '../collections/resturants.js';
import '../collections/users.js';

import '../imports/js/Util.js'
var XLSX = require("xlsx");
import {
    Email
} from 'meteor/email'



var basicAuth = new HttpBasicAuth(function(username, password) {
    return 'admin' == username & 'password' == password;
});

basicAuth.protect(['/admin']);


Cloudinary.config({
    cloud_name: 'reacttech',
    api_key: '142485444681552',
    api_secret: 'ei9TxRxIGg3Wro4_xQmLPnx6kxM'
})

process.env.MAIL_URL = "smtp://66e088199f478322e4669b9b91b99650:7deb273d8860bdfc2c8cacb88a9e22ef@in-v3.mailjet.com:587/"

Meteor.startup(() => {
    // code to run on server at startup
});

Meteor.methods({
    'Resturant.add' ({
        data
    }) {
        return Resturants.insert(data);
    }
});

Meteor.methods({
    'Resturant.addReview' ({
        id,
        data
    }) {
        return Resturants.update({
                _id: id
            }, {
                $push: {
                    "reviews": data
                }
            },
            function(err, result) {
                if (err) {
                    return err
                        // return  error
                }
                //return success
                return result
            });
        // return Resturants.insert(data);
    }
});
Meteor.methods({
    'Resturant.updateRating' ({
        id,
        rating
    }) {
        try {
            const newId = id._id;
            delete id._id;
            Resturants.update(id, {
                $set: {
                    rating: rating
                }
            });
            return newId;
        } catch (exception) {
            throw new Meteor.Error('500', exception);
        }

    }
});
Meteor.methods({
    'setPassword' ({
        id,
        password
    }) {
        try {
            const newId = id._id;
            delete id._id;
            Users.update(id, {
                $set: {
                    password: password
                }
            });
            return newId;
        } catch (exception) {
            throw new Meteor.Error('500', exception);
        }
    }
});

function sendEmail(to, from, subject, text) {

    Email.send({
        to,
        from,
        subject,
        text
    });

}

function sendSetPassword(email, userId) {
    const url = 'http://localhost:3000/setPassword/' + userId._str;
    sendEmail(email, 'hello@reacttech.co', 'Time to set a password!', 'Follow the link to set a new password for your account: ' + url)
}

function processUsers(worksheet, row, insert) {


    var users = Users.find({}).fetch();


    var name = Util.getCell(worksheet, "A" + row);
    var surname = Util.getCell(worksheet, "B" + row);
    var email = Util.getCell(worksheet, "C" + row);
    var password = Util.getCell(worksheet, "D" + row);


    if (insert) {
        if (users.find(o => o.email === email) === undefined) {
            const id = new Mongo.ObjectID();
            Users.insert({
                _id: id,
                name: name,
                surname: surname,
                email: email,
                password: password
            });

            if (password === false) {
                sendSetPassword(email, id);
            }
        }
    } else {
        console.log('insert false');
    }

}


Meteor.methods({
    uploadUsers: function(data) {
        var workbook = XLSX.read(data, {
            type: "binary"
        });
        var worksheet = workbook.Sheets[workbook.SheetNames[0]];
        var columns = ["name", "surname", "email", "password (optional)"];
        for (var i = 0; i < columns.length; i++) {
            var cellAddress = Util.alphabet[i] + "1";
            if (!(worksheet[cellAddress] && worksheet[cellAddress].v)) {
                xlsxError("1", "Header column '" + columns[i] + "' should be in cell " + cellAddress);
                return;
            }
        }

        var rowCount = 0;

        for (var i = 1; i <= 100000; i++) {
            if (!(worksheet["B" + i] && worksheet["B" + i].v)) {
                rowCount = i - 2;
                break;
            }
        }

        for (var i = 2; i < (rowCount + 2); i++) {
            var error = processUsers(worksheet, i, false);
            if (error) {
                Util.xlsxError(i, error);
                return;
            }
        }

        for (var i = 2; i < (rowCount + 2); i++) {
            processUsers(worksheet, i, true);
        }
    }
})
