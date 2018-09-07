/**
 * 数据库连接操作协定接口
 * @interface
 */
export interface IDataAccess {
  /**
  * 执行sql语句
  * @param {string} sql 要执行的sql语句
  * @param {any[]} sqlParams 要执行的sql语句中的参数，顺序存放的数组
  */
  execSql(sql: string, sqlParams: Array<any>): Promise<any>;
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
  execTransaction(sqlEntities: Array<any>): Promise<any>;
}