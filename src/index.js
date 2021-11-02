const express = require('express');
const bodyParser =require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

/* // CORS
app.use(cors({
    credentials: true, 
    origin: true,
    origin: ['http://localhost:3001/', 'http://localhost:3001', '*'] // Set up your CORS
})); */

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

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