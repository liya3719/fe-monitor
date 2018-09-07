const archiver = require('archiver');
const decompress = require('decompress');
const fs = require("fs");
const path = require("path");
/**
 * zip压缩包处理帮助类
 * @class
 */
export class ZipHelper {
  /**
   * 解压模块zip包
   * @param {string} source zip存放的路径
   * @param {string} target zip包解压后存放的路径
   */
  static deCompress(source: string, target: string): Promise<boolean> {
    return new Promise(function (resolve, reject) {
      decompress(source, target).then(function (data) {
        console.log(data);
        resolve(true);
      }).catch(function (error) {
        reject(error);
      });
    });
  }

  /**
   * 压缩文件成zip
   * @param {string} sourceDir 要压缩哪个目录的文件或者要压缩的文件数组
   * @param {string} target 文件压缩以后存放到哪个目录
   * @param {string} zipName 压缩包的名称 
   * @param {string} extensionName 压缩包的后缀名，默认为zip，可以为tar
   */
  static compress(sourceDir: string, target: string, zipName: string, extensionName?: string): Promise<boolean>;
  /**
   * 压缩文件成zip
   * @param {Array<string>} files 要压哪些文件
   * @param {string} target 文件压缩以后存放到哪个目录
   * @param {string} zipName 压缩包的名称 
   * @param {string} extensionName 压缩包的后缀名，默认为zip，可以为tar
   */
  static compress(files: Array<string>, target: string, zipName: string, extensionName?: string): Promise<boolean>;
  /**
   * 压缩文件成zip
   * @param {any} sourceDir 要压缩哪个目录的文件或者要压缩的文件数组
   * @param {string} target 文件压缩以后存放到哪个目录
   * @param {string} zipName 压缩包的名称 
   * @param {string} extensionName 压缩包的后缀名，默认为zip，可以为tar
   */
  static compress(sourceDir, target: string, zipName: string, extensionName: string = "zip"): Promise<boolean> {
    let type: string = Object.prototype.toString.call(sourceDir);
    let output = fs.createWriteStream(path.normalize(`${target}/${zipName}.${extensionName}`));
    let archive = archiver(extensionName);
    return new Promise(function (resolve, reject) {
      archive.on('error', function (error) {
        reject(reject);
      });
      archive.pipe(output);
      switch (type) {
        case "[object String]":
          archive.directory(sourceDir, false);
          break;
        case "[object Array]":
          break;
        default:
          break;
      }
      output.on('end', function () {
        resolve(true);
      });
      output.on('close', function () {
        resolve(true);
      });
      archive.finalize();
    });
  }
}