/**
 * 路由控制器，读取页面
 */
import { Controller, Get } from 'routing-controllers';
const fs = require('fs');
const baseDir = process.cwd();

@Controller()

export class IndexController {
  /**
   * 首页上传
   * @return 模板内容
   */
  @Get('/upload')
  async getUploadAction(): Promise<string> {
    let tplHtml: string = fs.readFileSync(`${baseDir}/web/views/upload.html`).toString();
    return tplHtml;
  }

  /**
   * 获取图片列表
   * @return 模板内容
   */
  @Get('/images/list')
  async getImagesListAction(): Promise<any> {
    let tplHtml: string = fs.readFileSync(`${baseDir}/web/views/list.html`).toString();
    return tplHtml;
  }
}