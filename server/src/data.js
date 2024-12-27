const mongoose = require('mongoose');

const data = {
    users: [{
        name: 'Shoyo Hinata',
        password: 'ShoyoHinata$123',
        email: 'shoyohinata@gmail.com',
        bio : 'The middle blockers for the Boy\'s Volleyball Team of karasono high',
      
    },
    {
        name: 'Tobio Kageyama',
        password: 'Tobiokageyama$123',
        email: 'tobiokageyama@gmail.com',
        bio : 'Setter for the Boy\'s Volleyball Team of karasono high',
       
    },
    {
        name: 'Nazmul Alam',
        password: 'helloWorld$123',
        email: 'naaz@gmail.com',
        bio : 'Lab Instructor at nsu',
        isAdmin : true,
    },
]
}
module.exports = data;