### 项目介绍

前端监控

### 项目说明
- config 存放各种配置文件，数据库配置、中间件配置、依赖注入配置、编译目录配置
- server 项目启动
- src
    - common 存放公用方法
    - controllers 控制器
    - dataAccess 数据库连接操作
    - exception 异常处理
    - interface 定义接口
    - middlewares 中间件
    - models 描述数据实体
    - services server层
    - sqlManage 存放sql语句目录
    - utils 存放方法
- web 静态资源
#### 特点

- 引入Typescript，开发使用强类型，开发上更直观，业务逻辑呈现更清晰，维护更好
- 引入依赖注入，开发完全面向接口，功能模块之间耦合更低
- 按照后端开发习惯，划分Controller、Service、DataAccess、Web等，更接近后端开发模式，完全面向对象
- 使用koa2 nodejs的开发框架

### 使用

#### 安装依赖

```
cnpm install
```

#### 更新依赖包devtool的electron依赖

由于开发使用了devtool包，而该包依赖的electron不支持async、await这些特性，需要更新electron

```
cd node_modules/devtool
cnpm install electron@1.7.2 --save
```

#### 执行开发命令

```
npm run dev
```

#### 监控流程图
<!-- ![监控系统流转图](https://github.com/liya3719/fe-monitor/blob/master/fe-monitor.png) -->
#### 监控内容

- 时间类, 主要使用performance.timing,收集各种耗时，包括DNS查询耗时、TCP连接耗时、request耗时、资源加载耗时(全部资源耗时)、解析dom耗时、白屏耗时、Domready时间、onload时间
- 错误类, window.onerror, promise错误(window.addEventListener('unhandledrejection'))事件, sourceMap, .map文件保存到内网环境，调用mozilla/source-map进行源码映射
- 基本信息类, 主要包括 当前用户使用的操作系统、当前浏览器以及版本、内存(内存大小的限制、可使用的内存、js对象使用的内存)、cpu数量、网络连接数、pv、uv、客户端语言、ip(ip所在的区域)、使用的网络、分辨率

#### 数据上报方式

- navgiator.sendBeacon
- 1px*1px gif图片?data={}
- xmlHttpRequest

#### 备注

- **由于项目接入了mysql，所以开发前请务必安装了mysql数据库，并且修改项目根目录下面的config/dev.js上面的数据库配置，以及在本地建立logs存放目录**
- **时序数据库(TSDB\HitSDB\Kairosdb\OpenTsdb\beringei)**
- **node版本建议>=8.9.0**