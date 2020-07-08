//日志相关配置
module.exports.loggerSetting = {
	dir: "logs",
	level: "DEBUG"
};


//数据库相关配置
module.exports.dbConfig = {
    host: "localhost",
    user: "root",
    password: "",
    database: "",
    connectionLimit: 10,
    port: "3306",
    waitForConnections: false,
    multipleStatements: true
};