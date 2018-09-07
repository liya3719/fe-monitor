/**
 * 上传图片相关Sql
 * @class
 */

export class IndexSql {
  /**
   * 查询是否注册过
   */
  static RegisterSelect: string = `
    select
    count(user_name) as count
    from upload_user
    where user_name = ?
  `;
  /**
   * 如果用户名不存在则创建用户
   */
  static RegisterInsert: string = `
    insert into upload_user set ?
  `;
  /**
   * 登录
   */
  static Login: string = `
    select 
    id, user_name
    from upload_user where user_name = ? and password = ?
  `;
  /**
   * 上传图片前判断图片是否存在
   */
  static imgIsExists: string = `
    select count(*) as count from upload_images_list where image_url like "%" ?
  `;
  /**
   * 上传图片 
   */
  static UploadImage: string = `
    insert into upload_images_list set ?
   `;
}