const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path')

const resRoutes = require('./Routes/Restaurant');   // importing routes from routes file

const hostname = 'localhost';
const port = 6503;

const app = express();

app.use(bodyParser.json());    // applying body-parser as middleware to parse JSON requests 


// handling CORS - Cross Origin Resource Sharing Issue
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

// var staticPath = path.join(__dirname, '/')
/* console.log(staticPath);
app.use(express.static(staticPath)); */
// app.use('/', staic)
// app.use(express.static(path.join(__dirname, '../build')));

/* app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../Client/build/index.html'));
  }); */

// navigating all requests to routes
app.use('/api', resRoutes);

// connect to mongo DB instance of atlas
mongoose.connect('mongodb://localhost:27017/classdatabase',
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(client => {
    // starting the server using the listen function
    app.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`)
    });
}).catch(err => {
    console.log(err);
})