import { Service, Inject } from 'typedi';
import { IDataAccess } from '../interface/dataAccess/IDataAccess';
import { SystemSql } from '../sqlManage/SystemClassSql';
import { ISystemClassService } from '../interface/services/ISystemClassService';
import {systemClassModel} from '../models/systemClassModel';
@Service('systemService')

export class systemClassService implements ISystemClassService {
    /**
     * 数据库操作实例
     */
    @Inject('dataAccess')
    dataAccessInstance: IDataAccess;
}