const fs = require('fs');
const shell = require('shelljs');
const path = require('path');
const process = require('process');
/**
 * 创建上传图片目录
 */
export class mkdirService {
  /**
   * 判断系统，创建文件夹的路径，dev环境用
   */
  static createDirPath() {
    var dirPath;
    if (process.platform === 'win32') {
      dirPath = `E:/fe-monitor/`;
    } else {
      dirPath = '/data/fe-monitor/';
    }
    return dirPath;
  }
  /**
   * 是否创建文件夹
   */
  static isCreateFolder(dirPath) {
    if (fs.existsSync(dirPath)) {
      return true;
    } else {
      if (mkdirService.isCreateFolder(path.dirname(dirPath))) {
        fs.mkdirSync(dirPath);
        return true;
      }
    }
  }
}
