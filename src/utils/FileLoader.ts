const fs = require('fs');
const path = require('path');
const loadFile = require('./loadFile.js');
/**
 * 对象加载器
 */
export class FileLoader {
  /**
   * 单例对象
   */
  private static _instance: FileLoader = null;

  /**
   * 定义私有构造函数，不允许外部new
   */
  private FileLoader() { }
  /**
   * 获取单例对象
   */
  public static getInstance(): FileLoader {
    if (FileLoader._instance) return FileLoader._instance;
    FileLoader._instance = new FileLoader();
    return FileLoader._instance;
  }

  /**
   * 内部私有方法，加载文件
   * @param filePath 文件路径
   */
  private loadFile(filePath: string): void {
    let _this = this;
    var files = fs.readdirSync(filePath);
    files.forEach(function (file) {
      let stat = fs.statSync(`${filePath}/${file}`);
      if (stat.isDirectory()) {
        // 如果是文件夹遍历
        _this.loadFile(`${filePath}/${file}`);
      } else {
        loadFile.load(`${filePath}/${file}`);
      }
    });
  }

  /**
   * 
   * @param basePathDir 文件跟目录
   * @param files 要加载的文件集合
   */
  public load(basePathDir: string, files: Array<string>): void {
    let _this = this;
    let baseDir: string = path.normalize(`${process.cwd()}/${basePathDir}`);
    if (files && files.length > 0) {
      files.forEach((file) => {
        let stat = fs.statSync(path.normalize(`${baseDir}/${file}`));
        if (stat.isDirectory()) {
          // 如果是文件夹遍历
          _this.loadFile(path.normalize(`${baseDir}/${file}`));
        } else {
          loadFile.load(path.normalize(`${baseDir}/${file}`));
        }
      });
    }
  }
}