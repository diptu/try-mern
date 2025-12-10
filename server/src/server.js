// server.js
const app = require("./app");
const { PORT, NODE_ENV, BASE_URL } = require('./secret.js')


//  Server Initialization
app.listen(PORT, () => {
    console.log(`Server running in ${NODE_ENV} mode on ${BASE_URL}:${PORT}`);
});