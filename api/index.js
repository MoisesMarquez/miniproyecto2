const mongoose = require('mongoose');
const express = require('./app');
const MONGODB_URI = 'mongodb://localhost:27017/inspecciones' 


mongoose.connect(MONGODB_URI,  { useNewUrlParser: true})
    .then(() => {
        console.log(`Connection to DB: ${MONGODB_URI} succesfuly`)
    
        express.listen(3001, () => {
            console.log(`Server running on http://localhost: 3001`);
        });
    })
    .catch(err => console.log(err));