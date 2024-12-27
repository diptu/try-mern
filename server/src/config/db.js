const mongoose = require('mongoose');
const {MONGO_DB_URL} = require('../secret');
const connectionDB = async(options= {}) => {
    try{
        await mongoose.connect(MONGO_DB_URL, options);
        console.log('DB connection established');
        mongoose.connection.on('error', (error)=>{
            console.error('Error connecting to  database : '+error.toString());
        });
    }catch(error){
        console.error('Could not connect to  database : '+error.toString());
    }

};
module.exports = connectionDB