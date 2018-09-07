/**
 * 把上传的图片同步到gitlab
 * @class
 */
const shell = require('shelljs');
const request = require('request');
const utils = require('heibao-utils');
import { publishUtils } from './utils';
const url = 'http://vcs.51talk.com/api/v3/projects?private_token=pKGxG9hoHVvkAfyfyhrH';

export class publishService {
  /**
   * 同步到gitlab操作
   */
  static async syncGitlabService() {
    let pms = utils.dateFormat('yyyyMMddhhmmss', new Date());
    let id = await publishUtils.baseHandler(request, url, 'fe-online');
    let data = {
      'branch': pms,
      'ref': 'release'
    }
    shell.cd('/data/fe-online/')
    // 从release创建新的分支
    await publishUtils.createNewBranch(request, id, data);
    shell.exec(`git fetch origin ${pms}:${pms}`);
    shell.exec(`git checkout ${pms}`);
    shell.exec('git pull origin release');
    //拷贝fe-static下images文件夹到fe-online/apollo/fe-static/下面
    shell.cp('-R', `/data/fe-static/images`, `/data/fe-online/apollo/fe-static/`);
    shell.exec('git add .');
    shell.exec(`git commit -am ${pms}`);
    shell.exec(`git push origin ${pms}`);
    // merge request 参数
    var createMRdata = {
      "source_branch": pms,
      "target_branch": "release",
      "title": pms,
      "description": pms,
      "assignee_id": 276
    }
    // 发起merge request
    await publishUtils.createMergeRequest(request, id, createMRdata);
    shell.exec('git checkout release');
    shell.exec(`git branch -D ${pms}`);
    return {
      code: 10000,
      message: '同步成功'
    }
  }
}