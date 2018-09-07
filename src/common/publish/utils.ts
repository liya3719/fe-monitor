/**
 * 同步到gitlab的公用方法
 * @class
 */
const fs = require('fs');
export class publishUtils {
  /**
   * 发起GET请求
   * @param  {function} request
   * @param  {string} url     gitlab api url
   * @return {Object}         返回所有的仓库列表
   */
  static async response(request, url) {
    return new Promise((resolve, reject) => {
      request(url, (err, res, body) => {
        if (err) {
          reject({
            code: 500,
            message: '服务器错误'
          });
          return;
        };
        let resp = JSON.parse(body);
        resolve(resp);
      })
    })
  }
  /**
   * 判断文件是否存在
   * @param {path} 文件路径
   * @param {fileName} 是否存在的文件
   */
  isExists(path) {
    try {
      fs.accessSync(path, fs.constants.F_OK);
    } catch (e) {
      return false;
    }
    return true;
  }
  /**
   * 发起POST请求
   * @param  {function} request
   * @param  {string} url     请求url
   * @param  {object} data    请求参数
   * @return {object}        返回成功信息
   */
  static async sendRequest(request, url, data) {
    return new Promise((resolve, reject) => {
      request.post({
        url: url,
        form: data,
        headers: {
          "content-type": "application/json",
          "PRIVATE-TOKEN": "pKGxG9hoHVvkAfyfyhrH"
        }
      }, (err, httpResponse, body) => {
        if (err) {
          reject({
            error: 500,
            message: err.message
          })
          return;
        }
        let data = JSON.parse(body);
        let done = httpResponse.statusCode >= 200 && httpResponse.statusCode < 300;
        data.error = done ? 0 : httpResponse.statusCode;
        resolve(data);
      })
    })
  }
  /**
   * 获取当前仓库id
   * @param  {function} request [description]
   * @param  {string} url     [description]
   * @return {object}         [description]
   */
  static async baseHandler(request, url, fileName) {
    let _self = this;
    return new Promise((resolve, reject) => {
      _self.response(request, url).then((data) => {
        //@ts-ignore;
        data.forEach((item, index) => {
          if (fileName === item.name) {
            resolve(item.id);
          }
        })
      });
    })
  }
  /**
   * 创建新分支
   * @param  {function} request
   * @param  {string} id      创建分支的仓库id
   * @param  {object} data    请求参数
   * @return {object}         返回成功信息
   */
  static async createNewBranch(request, id, data) {
    let _self = this;
    return new Promise((resolve, reject) => {
      let res = _self.sendRequest(request, `http://vcs.51talk.com/api/v4/projects/${id}/repository/branches`, data);
      resolve(res);
    })
  }
  /**
   * 发起merge request
   * @param  {function} request [description]
   * @param  {string} id      仓库id
   * @param  {object} data    请求参数
   * @return {object}         返回创建信息
   */
  static async createMergeRequest(request, id, data) {
    let _self = this;
    return new Promise((resolve, reject) => {
      let res = _self.sendRequest(request, `http://vcs.51talk.com/api/v3/projects/${id}/merge_requests`, data);
      resolve(res);
    });
  }
}