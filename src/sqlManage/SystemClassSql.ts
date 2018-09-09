/**
 * 查询操作系统、浏览器等相关Sql
 * @class
 */
export class SystemSql {
    /**
     * 操作系统信息到数据库
     */
    static insertSystemInfo: string = `
        insert into monitor_system_class set ?
    `;
    /**
     * 查询当前用户所在频道的操作系统信息
     */
    static selectSystemInfo: string = `
        select * from monitor_system_class where user_id = ? and channel = ?
    `;
}