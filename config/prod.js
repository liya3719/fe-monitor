/**
 * 日志记录相关配置
 */
module.exports.loggerSetting = {
    dir: "/root/logs/fe-monitor",
    level: "INFO"
};

module.exports.dbConfig = {
    host: "",
    user: "",
    password: "",
    database: "",
    connectionLimit: 10,
    port: "3306",
    waitForConnections: false,
    multipleStatements: true
};