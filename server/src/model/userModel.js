const {Schema, model} = require('mongoose');
const { DEFAULT_USER_IMAGE } = require('../secret');
const bcrypt = require('bcryptjs');
const saltRounds = 10;
const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
const Users = new Schema({
    name: { 
        type: String, 
        required: [true,'User Name Required'],
        trim : true,
        maxlength : [50, 'User Name Max Length should be 50 characters'],
        minlength : [3, 'User Name min Length should be 3 characters'],
    },
   
    email: { 
        type: String, 
        required: [true,'Email Required'],
        unique : true,
        trim : true,
        lowercase : true,
        validate : {
            validator: function (v) {
                var emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
                return emailRegex.test(v); //
            },
            message: 'Please enter a valid email address',
        }
  
    },
    password: { 
        type: String, 
        // required: [true,'Password Required'],
        minlength : [8, 'Manimum length of Password  can be 8 characters'],

        // validate : {
        //     validator: function (v) {
        //         /*min 8 letter password, with at least a symbol, 
        //         upper and lower case letters and a number
        //         */
        //         var strongPassRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
        //         return strongPassRegex.test(v);
        //     },
        //     message: 'Please enter a valid password',
        // },

        //Store hash in your password DB.
        set : function (PlaintextPassword) {
           return bcrypt.hashSync(PlaintextPassword, bcrypt.genSaltSync(saltRounds));
        },

    },
    bio: { 
        type: String, 
        required: false,
    },
    
    image: { 
        type: String, 
        default:  DEFAULT_USER_IMAGE
  
    },
    isAdmin:{
        type:Boolean,
        default: false,
    },
    isBanned:{
        type:Boolean,
        default: false,
    }


    
  },{timestamps:true});
  
const User = model('User',Users);



module.exports = User;