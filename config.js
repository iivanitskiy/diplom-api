module.exports.JWT_TOKEN = process.env.NODE_ENV !== 'production' ? 'dev.secret' : process.env.JWT_TOKEN;
module.exports.DB_ADRESS = 'mongodb://localhost:27017/diplom';
module.exports.PORT_SERVER = 3000;
