import { Service, Inject} from 'typedi';
import { IDataAccess } from '../interface/dataAccess/IDataAccess';
import { timeSql } from '../sqlManage/TimeClassSql';
import { ITimeClassService } from '../interface/services/ITimeClassService';
import {timeClassModel} from '../models/timeClassModel';
@Service('timeService')
export class timeClassService implements ITimeClassService {
    @Inject('dataAccess')
    dataAccessInstance: IDataAccess;
}