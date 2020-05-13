require('dotenv').config({ path: '.env' });

const app = require('./server');
require('./database');

//Testiando .env
console.log(process.env.TEST);


app.listen(app.get('port'), () => {
    console.log('Server on Port:', app.get('port'))
})