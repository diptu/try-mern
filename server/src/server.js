const { app, NODE_ENV, PORT } = require("./app");



//  Server Initialization
app.listen(PORT, () => {
    console.log(`Server running in ${NODE_ENV} mode on port ${PORT}`);
});