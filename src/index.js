const express = require('express');
const bodyParser =require('body-parser');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT||5000;

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));




app.listen(PORT, console.log(`Server is listening on port ${PORT} \nhttp://localhost:${PORT}`))