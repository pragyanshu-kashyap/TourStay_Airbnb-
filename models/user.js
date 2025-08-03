const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    }  
    //Passport-Local Mongoose will add a username, hash and salt field to store the username, the hashed password and the salt value.and also it will provide unique id's for each user.

});

userSchema.plugin(passportLocalMongoose); // This plugin adds username and password fields to the schema, along with methods for hashing and authenticating passwords.

module.exports = mongoose.model('User', userSchema);