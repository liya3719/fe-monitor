import { Controller, Get, Post, Body, BodyParam, Param, QueryParam } from 'routing-controllers';
import { Inject } from 'typedi';
import { ImagesLst } from '../models/ImgListModel';
import { GetImagesListService } from '../services/GetImagesListService';
import { userInfo } from 'os';
/**
 * 获取图片列表
 */
@Controller('/api')

export class GetImagesList {
  /**
   * 获取图片列表服务实例
   */
  @Inject('GetImagesListService')
  GetImagesListServiceInstance: GetImagesListService;

  @Get('/images/list/:id/:pageIndex/:pageSize')
  /**
   * 获取图片列表
   * @param {id} 用户id
   * @return 图片列表实体
   */
  async getImagesListAction(@Param("id") id: number, @Param("pageIndex") pageIndex: number, @Param("pageSize") pageSize: number): Promise<ImagesLst.ImagesLstModel> {
    if (isNaN(id)) {
      throw Error('用户id不存在');
    }
    let imagesList: ImagesLst.ImagesLstModel = await this.GetImagesListServiceInstance.getImagesList(id, pageIndex, pageSize);
    return imagesList;
  }
  @Post('/delete/image/:id/:userId')
  /**
   * 根据图片自增id删除选中的图片
   */
  async delectImageById(@Param("id") id: number, @Param("userId") userId: number, @BodyParam("image_name") image_name: string) {
    if (isNaN(id)) {
      throw Error('用户id不存在');
    }
    const itemImage =  await this.GetImagesListServiceInstance.deleteImageById(id, userId, image_name);
  }
}