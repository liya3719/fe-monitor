import { Service } from "typedi";
import { IDataAccess } from "../interface/dataAccess/IDataAccess";
import { Pool, createPool } from "mysql";
const async = require("async");
const logger = require("../utils/logger.js").getLogger("MysqlImpl.ts");
const dbConfig = require("config").dbConfig;

/**
 * mysql连接操作实现类
 * @class
 * @implements IDataAccess
 */
@Service("dataAccess")
export class MysqlImpl implements IDataAccess {
  /**
   * 连接池
   */
  connectionPoll: Pool;
  /** 
   * 构造器
   * 
  */
  constructor() {
    if (!this.connectionPoll) this.connectionPoll = createPool(dbConfig);
  }
  /**
  * 执行sql语句
  * @param {string} sql 要执行的sql语句
  * @param {any[]} sqlParams 要执行的sql语句中的参数，顺序存放的数组
  * @return 返回执行后的结果
  */
  execSql(sql: string, sqlParams: any[]): Promise<any> {
    let _this = this;
    return new Promise(function (resolve, reject) {
      _this.connectionPoll.getConnection(function (error, conn) {
        if (error) {
          //记录日志
          logger.error(`connect database happen error,and the error stack message is \r\n ${error.stack}`);
          conn.release();
          reject(error);
        }
        conn.query(sql, sqlParams || null, function (error, result, fields) {
          logger.info(`exec the sql,and the excuting sql is \r\n ${sql} \r\n exec sql params is ${JSON.stringify(sqlParams || {})}`);
          if (error) {
            //记录日志
            logger.error(`exec sql happen error,and the error sql is \r\n ${error.sql} \r\nthe error stack message is \r\n ${error.stack}`);
            conn.release();
            reject(error);
          } else {
            conn.release();
            resolve({
              result: result,
              fields: fields
            });
          }
        })
      });
    });
  }

  /**
   * 执行sql事务
   * @param sqlEntities 要执行的sql事务实体
   *  格式如下:
   *  [{
   *    sql:"select * from table where id = ?"
   *    params:[11]
   *  }]
   * @return 返回执行后的结果
   */
  execTransaction(sqlEntities: any[]): Promise<any> {
    let _this = this;
    return new Promise(function (resolve, reject) {
      _this.connectionPoll.getConnection(function (error, conn) {
        if (error) {
          //记录日志
          logger.error(`connect database happen error,and the error stack message is \r\n ${error.stack}`);
          conn.release();
          reject(error);
        }
        //开始事务，执行失败则回滚事务，所有sql执行成功，才commit提交事务
        conn.beginTransaction(function (error) {
          if (error) {
            //记录logger：开始执行事务失败
            logger.error(`exec transaction happen error,and the error stack message is \r\n ${error.stack}`);
            conn.release();
            reject(error);
          }
          logger.info(`开始执行transaction，共执行${sqlEntities.length}条sql语句`);
          let funcArray = [];
          sqlEntities.forEach(function (sqlEntity) {
            let fn = function (callback) {
              let sql = sqlEntity.sql;
              let param = sqlEntity.params;
              conn.query(sql, param || null, function (tErr, rows, fields) {
                if (tErr) {
                  conn.rollback(function () {
                    //执行事务失败，回滚，同时记录日志
                    logger.error(`exec transaction happen error \r\n and the error sql is \r\n ${sql} the error stack message is \r\n ${tErr.stack}`);
                    conn.release();
                    reject(tErr);
                  });
                } else {
                  return callback(null, "success");
                }
              })
            };
            funcArray.push(fn);
          });
          //开始执行sql语句
          async.series(funcArray, function (err, result) {
            if (err) {
              logger.error(`begin to exec transaction rollback happen error,and the error stack message is \r\n ${err.stack}`);
              conn.rollback(function (rError) {
                //执行事务失败，回滚，同时记录日志
                logger.error(`exec transaction rollback happen error,and the error stack message is \r\n ${rError.stack}`);
                conn.release();
                reject(rError);
              });
            } else {
              //提交事务
              conn.commit(function (cError) {
                //logger 记录事务信息
                //logger.info(`transaction info: \r\n ${JSON.stringify(info)}`);
                if (cError) {
                  logger.error(`commit transaction happen error,and the error stack message is \r\n ${cError.stack}`);
                  conn.rollback(function (rError) {
                    logger.error(`commit transaction rollback happen error,and the error stack message is \r\n ${rError.stack}`);
                    conn.release();
                    reject(rError);
                  });
                } else {
                  conn.release();
                  resolve({ success: true });
                }
              })
            }
          })
        });
      });
    });
  }
}