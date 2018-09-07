/**
 * 接口返回给客户端的error code的枚举
 */
export class HttpResponseCodeEnum {
  /**
   * 获取数据成功
   * @returns {number}
   * @constructor
   */
  static get Ok() {
    return 200;
  }

  /**
   * 请求参数有错误
   * @returns {number}
   * @constructor
   */
  static get Invalid() {
    return 400;
  }

  /**
   * 用户请求的格式不正确
   * @returns {number}
   * @constructor
   */
  static get NotAcceptable() {
    return 406;
  }

  /**
   * 用户未授权
   * @returns {number}
   * @constructor
   */
  static get Unauthorized() {
    return 401;
  }

  /**
   * 参数校验失败
   * @returns {number}
   * @constructor
   */
  static get Unprocesable() {
    return 422;
  }

  /**
   * 数据存在冲突
   * @returns {number}
   * @constructor
   */
  static get Conflict() {
    return 409;
  }

  /**
   * 禁止用户访问
   * @returns {number}
   * @constructor
   */
  static get Forbidden() {
    return 403;
  }

  /**
   * 请求的数据格式不正确
   * @returns {number}
   * @constructor
   */
  static get UnsupportedMediaType() {
    return 415;
  }

  /**
   * 请求不存在
   * @returns {number}
   * @constructor
   */
  static get NotFound() {
    return 404;
  }

  /**
   * 服务器内部错误
   * @returns {number}
   * @constructor
   */
  static get InternalServerError() {
    return 500;
  }
}