const express = require('express');
const bodyParser =require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/v1/admin', require('./routes/adminRoutes'));
app.use('/api/v1/agency', require('./routes/agenciesRoutes'));
app.use('/api/v1/reports', require('./routes/reportsRoutes'));
app.use('/api/v1/hallOfShame', require('./routes/hallOfShameRoutes'));

app.get('/', (req, res, next) => {
    console.log('hi');
    res.send('hello')
})

const PORT = process.env.PORT||3000

app.listen(PORT, console.log(`Server is listening on port ${PORT}`))