module.exports.JWT_TOKEN = process.env.NODE_ENV !== 'production' ? 'dev.secret' : process.env.JWT_TOKEN;
module.exports.DB_ADRESS = process.env.NODE_ENV !== 'production' ? 'mongodb://localhost:27017/diplom' : process.env.DB_ADRESS;
module.exports.PORT_SERVER = 3000;
