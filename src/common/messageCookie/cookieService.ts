/**
 * 处理cookie相关
 */

export class cookieService {
  /**
   * 获取cookie
   * @param key 要获取的cookie名字
   */
  getCookie(key, cookies) {
    var cookieArr = cookies.split(';');
    for (var i = 0; i < cookieArr.length; i++) {
      var arr = cookieArr[i].split('=');
      if (arr[0].trim() === key) {
        return arr[1];
      }
    }
    return false;
  }
}