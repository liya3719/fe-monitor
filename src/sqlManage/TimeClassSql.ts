/**
 * 查询时间类Sql
 * 包括DNS查询耗时、TCP链接耗时、接口request请求耗时、解析dom树耗时、白屏时间、domReady时间、onload时间
 * @class
 */

export class timeSql {
    /**
     * 保存当前用户耗时时间
     */
    static insertTime: string = `
        insert into monitor_time_class set ?
    `;
    /**
     * 查询当前用户所在频道消耗时间
     */
    static selectTime: string = `
        select * from monitor_time_class where user_id = ? and channel = ?
    `

}