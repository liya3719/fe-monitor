import { Controller, Param, Body, Get, Post, Ctx, UploadedFile } from 'routing-controllers';
import { Container, Inject } from 'typedi';
import { UploadModel } from '../models/IndexUploadModel';
import { IIndexUploadService } from '../interface/services/IIndexUploadService';
import { writeFileService } from '../common/writeFile/writeFileService';
import { cookieService } from '../common/messageCookie/cookieService';
import { publishService } from '../common/publish/publishService';
const shell = require('shelljs');
const util = require('heibao-utils');
const writeFile = new writeFileService();
const CookieService = new cookieService();
/**
 * 首页上传相关控制器
 * @class
 */

@Controller('/api')

export class IndexUpload {
  /**
   * 首页上传服务实例对象
   */
  @Inject('IndexUploadService')
  indexServiceInstance: IIndexUploadService;

  /**
   * 注册
   * @param registerModel 准备注册的用户实体
   * @return Object { code: number, message: string}
   */
  @Post('/register')
  async registerAction(@Body() registerModel: UploadModel.RegisterModule, @Ctx() context: any): Promise<any> {
    let isNumber = Object.prototype.toString;
    let result = await this.indexServiceInstance.register(registerModel);
    if (isNumber.call(result) === '[object Number]') {
      context.cookies.set("user_id", result)
      return {
        upload_user_id: result,
        code: 10000,
        message: '注册成功'
      }
    } else if (isNumber.call(result) === '[object Boolean]') {
      return {
        code: 20001,
        message: '用户已注册'
      }
    }
  }
  /**
   * 登录
   * @param loginModel 登录用户实体
   * @return Object {code: number, message: string}
   */
  @Post('/login')
  async loginAction(@Body() loginModel: UploadModel.LoginModel, @Ctx() ctx: any): Promise<any> {
    let result = await this.indexServiceInstance.login(loginModel);
    if (util.isEmptyObject(result)) {
      return {
        code: 20001,
        message: '用户不存在，请注册'
      }
    } else {
      for (var i in result) {
        var id = result[i].id;
        var user_name = result[i].user_name;
      }
      ctx.cookies.set('user_id', id, {
        httpOnly: false
      });
      ctx.cookies.set('user_name', user_name, {
        httpOnly: false
      });
      return {
        code: 10000,
        message: '登录成功',
        user_name: user_name
      }
    }
  }
  /**
   * 上传
   * @param uploadModel 上传数据实体
   * @return Object{ code: number, message: string}
   */
  @Post('/upload')
  async uploadAction(@UploadedFile("filename") file: any, @Ctx() ctx: any): Promise<any> {
    let user_id = CookieService.getCookie('user_id', ctx.request.header.cookie);
    let originalname = file.originalname;
    let name = originalname.split('.')[0];
    let suffix = originalname.split('.')[1];
    let imageName = `${name}_${user_id}.${suffix}`;
    // 判断图片是否存在
    let nameRes = await this.indexServiceInstance.imageIsExist(imageName);
    //@ts-ignore
    if (nameRes.isExists) {
      return {
        code: 20009,
        message: '图片已存在，请修改名字后再上传'
      }
    } else {
      // 获取前端传过来的信息流之后，把文件解码保存到指定目录
      let writeMessage = await writeFile.writeFileHandler(file, user_id);
      // 保存成功后把链接保存到数据库
      if(writeMessage.code === 20001) {
        return {
          code: 20004,
          message: writeMessage.message
        }
      }
      if (writeMessage.code === 10000) {
        let uploadConfig: any = {
          user_id: user_id,
          image_url: writeMessage.url,
          update_time: util.dateFormat('yyyy/MM/dd hh:mm:ss', new Date())
        }
        let result = await this.indexServiceInstance.upload(uploadConfig);
        if (result) {
          return {
            code: 10000,
            message: '上传成功'
          }
        } else {
          return {
            code: 20001,
            message: '上传失败'
          }
        }
      } else {
        return {
          code: writeMessage.code,
          message: writeMessage.message
        };
      }
    }
  }
  /**
     * 同步到gitlab
     * @return Object {code: number, message: string}
     */
  @Post('/sync/gitlab')
  async syncGitlabAction() {
    let res = await publishService.syncGitlabService();
    return res;
  }
}