'use strict';
const path = require('path');
const dotenv = require('dotenv');
const server = require('./src/server');
/*
    npm install --save-dev nodemon
    npm install --save express bcrypt cookie-parser cors dotenv
        express-session morgan mysql2 nunjucks passport sequelize
*/

dotenv.config({ path: path.join(__dirname, "src/config", ".env") });

server.listen(process.env.PORT, () => {
    console.log(`Server :: http://localhost:${process.env.PORT}`);
});