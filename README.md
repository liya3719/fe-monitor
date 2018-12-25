### 项目介绍

前端监控，项目架构基于Typescript、koa2搭建，使得开发应用变得几乎跟java类似，强类型的使用使得我们能更方便的维护应用业务逻辑，编译阶段即可发现潜在的由于类型使用不正确而导致的应用错误

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


### 备注

- **由于项目接入了mysql，所以开发前请务必安装了mysql数据库，并且修改项目根目录下面的config/dev.js上面的数据库配置，以及在本地建立logs存放目录**
- **node版本建议>=8.9.0**