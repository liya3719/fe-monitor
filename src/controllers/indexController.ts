/**
 * 路由控制器，读取页面
 */
import { Controller, Get } from 'routing-controllers';
const fs = require('fs');
const baseDir = process.cwd();

@Controller()

export class IndexController {
  /**
   * 首页
   * @return 模板内容
   */
  @Get('/index')
  async getUploadAction(): Promise<string> {
    let tplHtml: string = fs.readFileSync(`${baseDir}/web/views/index.pug`).toString();
    return tplHtml;
  }
}