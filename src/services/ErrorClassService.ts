import { Service, Inject } from 'typedi';
import { IDataAccess } from '../interface/dataAccess/IDataAccess';
import { ErrorSql } from '../sqlManage/ErrorClassSql';
import { IErrorClassService } from '../interface/services/IErrorClassService';
import {errorClassModel} from '../models/errorClassModel';
@Service('ErrorClassService')
/**
 * 处理监控捕获的错误信息
 * @class ErrorClassService
 */
export class ErrorClassService implements IErrorClassService {
    /**
     * 数据库操作实例
     */
    @Inject('dataAccess')
    dataAccessInstance: IDataAccess;
}