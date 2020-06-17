const mongoose = require('mongoose');

// const { JAMA_BASIC_HOST,JAMA_BASIC_DATABASE} = process.env;
// const MONGODB_URI=`mongodb://${JAMA_BASIC_HOST}/${JAMA_BASIC_DATABASE}`;

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
})

.then(db => console.log('La base de datos esta Conectada'))
.catch(err => console.log(err));