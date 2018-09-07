const fs = require('fs');
const shell = require('shelljs');
const config = require('config');
const baseUrl = 'http://static.51talk.com/apollo/fe-static/images/';
import { mkdirService } from '../mkdir/mkdirService';
/**
 * 处理图片信息流&&图片写入
 */
export class writeFileService {
  /**
   * 上传图片获取信息流写入磁盘文件
   * @param file 图片流信息集合
   */
  async writeFileHandler(file, id): Promise<any> {
    return new Promise((resolve, reject) => {
      // 上传图片前先创建保存图片的文件夹
      let dirPath = mkdirService.createDirPath();
      mkdirService.isCreateFolder(dirPath);
      // 判断图片大小，如果超过150kb，提示错误
      if (file.size > 153600) {
        resolve({
          code: 20008,
          message: '图片超过150KB，请压缩后重新上传'
        })
      }
      // 开始对图片流写入到指定位置
      fs.writeFile(`${config.imagesUrl}${file.originalname}`, file.buffer, (err) => {
        if (err) {
          resolve({
            code: 500,
            message: '服务器繁忙，请稍候再试'
          })
        } else {
          // 对图片以当前用户id进行重命名
          let image = file.originalname;
          let name = image.split('.')[0];
          let suffix = image.split('.')[1];
          let regText = /[\u4e00-\u9fa5]+/g;
          if (regText.test(name)) {
            resolve({
              code: 20001,
              message: '请上传非中文名称图片'
            });
          } else {
            fs.renameSync(`${config.imagesUrl}${file.originalname}`, `${config.imagesUrl}${name}_${id}.${suffix}`);
            resolve({
              code: 10000,
              message: '写入成功',
              url: `${baseUrl}${name}_${id}.${suffix}`
            })
          }
        }
      })
    })
  }
}