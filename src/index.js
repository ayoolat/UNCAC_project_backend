const express = require('express');
const bodyParser =require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/admin', require('./routes/adminRoutes'));
app.get('/', (req, res, next) => {
    console.log('hi');
    res.send('hello')
})

const PORT = process.env.PORT||3000

app.listen(PORT, console.log(`Server is listening on port ${PORT}`))