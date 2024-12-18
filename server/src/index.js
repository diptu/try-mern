const express = require('express');
const morgan = require('morgan')
const app = express();
app.use(morgan("dev"));

app.listen(3000, ()=>{
    console.log('server running on http://localhost:3000/');
});


app.get('/', (req, res)=>{
    res.send('Welcome to home');
});

app.get('/products', (req, res)=>{
    res.send('Show  all products');
});