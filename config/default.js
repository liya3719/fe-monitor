/**
 * 中间件列表
 * @type {string[]}
 */
module.exports.middlewares = [
  "exception"
];


/**
 * 源码编译目录
 */
module.exports.compiledDir = "build";

/**
 * 要进行依赖注入的文件
 */
module.exports.dependencyInjectConf = [
  "dataAccess",
  "services"
];