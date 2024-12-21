const app = require('./app');
const { SERVER_PORT } = require('./secret');
const connectionDB = require('./db');


app.listen(SERVER_PORT, async ()=>{
    console.log(`server running on http://localhost:${SERVER_PORT}`);
     await connectionDB()
})

