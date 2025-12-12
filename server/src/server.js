// server.js
const app = require("./app");
const connectDB = require("./config/db.js");

const { PORT, NODE_ENV, BASE_URL } = require('./secret.js')


//  Server Initialization
app.listen(PORT, async () => {
    console.log(`Server running in ${NODE_ENV} mode on ${BASE_URL}:${PORT}`);
    await connectDB();
});