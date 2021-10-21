const express = require('express');
const bodyParser =require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))

const PORT = process.env.PORT||5000

app.listen(PORT, console.log(`Server is listening on port ${PORT}`))