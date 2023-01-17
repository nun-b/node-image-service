const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/dbConfig.json')[env];

const db = {};
const sequelize = new Sequelize(
    config.database, config.username, config.password, config,
);

db.sequelize = sequelize;

// 모델 자동 설정
// imitiate를 전부하고 난 후에, associate를 해야 한다.

const basename = path.basename(__filename); // index.js

fs.readdirSync(__dirname)     // models
    .filter(file => {
        // 숨김파일 제외, index.model.js 제외, 파일 이름의 마지막 3자리는 model.js이어야 한다.
        return file.indexOf('.') !== 0 && file !== basename && file.slice(-8) === 'model.js';
    })
    .forEach(file => {
        const model = require(path.join(__dirname, file));  // 다이나믹 인포트
        console.log(file, model.name);
        // hashtag.model.js Hashtag
        // post.model.js Post
        // user.model.js User
        db[model.name] = model;
        model.initiate(sequelize);
    });    

Object.keys(db).forEach(modelName => {
    if(db[modelName].associate) {
        // 모델에 associate가 존재한다면
        db[modelName].associate(db);
    }
});

module.exports = db;
