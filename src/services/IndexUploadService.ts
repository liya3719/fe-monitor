import { Container, Service, Inject } from 'typedi';
import { IDataAccess } from '../interface/dataAccess/IDataAccess';
import { IIndexUploadService } from '../interface/services/IIndexUploadService';
import { UploadModel } from '../models/IndexUploadModel';
import { IndexSql } from '../sqlManage/IndexUploadSql';

@Service('IndexUploadService')
/**
 * 首页上传service
 * @class
 * @implements IIndexUploadService
 */
export class IndexUploadService implements IIndexUploadService {

  /**
   * 数据库操作实例
   */
  @Inject('dataAccess')
  dataAccessInstance: IDataAccess;
  /**
   * 注册
   * @param registerModel 注册数据实体
   */
  async register(registerModel: UploadModel.RegisterModule): Promise<boolean> {
    let result: any = await this.dataAccessInstance.execSql(IndexSql.RegisterSelect, [
      registerModel.user_name
    ]);
    let res = result.result[0];
    if (res.count > 0) {
      return res.count > 0;
    } else {
      let data: any = {
        user_name: registerModel.user_name,
        password: registerModel.password
      }
      let registerResult = await this.dataAccessInstance.execSql(IndexSql.RegisterInsert, data);
      return registerResult.result.insertId;
    }
  }
  /**
   * 登录
   * @param loginModel 登录数据实体
   */
  async login(loginModel: UploadModel.LoginModel): Promise<UploadModel.LoginModel> {
    let result: any = await this.dataAccessInstance.execSql(IndexSql.Login, [
      loginModel.user_name,
      loginModel.password
    ]);
    let loginResult: UploadModel.LoginModel = <UploadModel.LoginModel>result.result;
    return loginResult;
  }
  /**
   * 上传前判断数据库图片是否存在
   * @param imageName 图片名称
   * @return Boolean
   */
  async imageIsExist(imageName): Promise<any> {
    let name = await this.dataAccessInstance.execSql(IndexSql.imgIsExists, imageName);
    let nameRes = name.result[0];
    if (nameRes.count > 0) {
      return {
        isExists: true
      }
    } else {
      return {
        isExists: false
      }
    }
  }
  /**
   * 上传
   * @param uploadModel 上传数据实体
   */
  async upload(uploadModel: UploadModel.Upload): Promise<any> {
    let upload: any = {
      user_id: uploadModel.user_id,
      image_url: uploadModel.image_url,
      update_time: uploadModel.update_time
    }
    let result = await this.dataAccessInstance.execSql(IndexSql.UploadImage, upload);
    let res = result.result.insertId;
    if (res > 0) {
      return true;
    } else {
      return false;
    }
  }
}