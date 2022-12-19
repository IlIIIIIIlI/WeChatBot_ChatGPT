# WeChatBot
20220903 updates:
1. 新增了天行数据上全网热搜，世界时间，IP查询，网页图片，股票术语，AI新闻，获取摘要，二维码，汇率换算，励志名言，古代情诗，财经新闻，国际新闻，分类诗词和藏头诗词等接口功能
2. 新增了定时发送功能，以及多用户多任务定时发送功能。


# 以下是原代码
## 微信每日说
[![node version](https://img.shields.io/badge/node-%3E%3D16-blue.svg)](http://nodejs.cn/download/)
[![node version](https://img.shields.io/badge/wechaty-%3E%3D1.20.2-blue.svg)](https://github.com/Chatie/wechaty)
![](https://img.shields.io/badge/Window-green.svg)
![](https://img.shields.io/badge/Mac-yellow.svg)
![](https://img.shields.io/badge/Centos-blue.svg)

wechatBot 是基于 node 与 [wechaty](https://github.com/Chatie/wechaty) 的微信小情话工具。最初功能只有每日发送天气和一句情话，后来添加了智能机器人聊天功能。但由于本项目面向小白用户与刚接触 node 开发的用户，故拆分了两个项目，一个是功能专一面向小白的 [《微信每日说》](https://github.com/gengchen528/wechatBot) （也就是本项目） ，另一个也在我的仓库下 [《智能微秘书》](https://github.com/gengchen528/wechat-assistant-pro) 面向有较多编程经验的用户。下面主要介绍微信每日说的使用


## 安装配置

视频教程： <a href="https://www.bilibili.com/video/av56077628?pop_share=1" target="_blank">《三步教你用 Node 做一个微信哄女友神器》</a>

### 下载安装 node

访问 node 官网：[http://nodejs.cn/download/](http://nodejs.cn/download/)，下载系统对应版本的 node 安装包，并执行安装。

> 1. windows 下安装步骤详细参考 [NodeJs 安装 Windwos 篇](https://www.cnblogs.com/liuqiyun/p/8133904.html)
> 2. Mac 下安装详细步骤参考 [NodeJs 安装 Mac 篇](https://blog.csdn.net/qq_32407233/article/details/83758899)
> 3. Linux 下安装详细步骤参考 [NodeJs 安装 Linux 篇](https://www.cnblogs.com/liuqi/p/6483317.html)

### 配置 npm 源

配置 `npm` 源为淘宝源（重要，因为需要安装 `chromium`，不配置的话下载会失败或者速度很慢，因为这个玩意 140M 左右）

```bash
npm config set registry https://registry.npmmirror.com/
npm config set disturl https://npm.taobao.org/dist
npm config set puppeteer_download_host https://npm.taobao.org/mirrors
```

### 下载代码

![download-project](https://user-gold-cdn.xitu.io/2019/6/16/16b5fcb3ea7ee507?w=1917&h=937&f=png&s=180655)

```bash
# 如果没有安装 git，也可直接下载项目zip包
git clone https://github.com/leochen-g/wechatBot.git
cd wechatBot
npm install
```

### 项目配置

所有配置项均在 `config/index.js` 文件中


### 执行

当以上步骤都完成后，在命令行界面输入 `node index.js`，第一次执行会下载 puppeteer，所以会比较慢，稍等一下，出现二维码后即可拿出微信扫描

![](https://user-gold-cdn.xitu.io/2019/6/16/16b5fa4678361c14?w=969&h=724&f=png&s=51158)

执行成功后可看到

![](https://user-gold-cdn.xitu.io/2019/6/16/16b5fa9bc1f5c76e?w=977&h=322&f=png&s=25797)

## 效果展示

![](https://user-gold-cdn.xitu.io/2019/6/16/16b5fbf97805f02e?w=959&h=779&f=png&s=73686)

<div>
    <img style="width:43%;display:inline-block;" src="http://image.bloggeng.com/WechatIMG62069.jpeg">
    <img style="width:43%;display:inline-block" src="http://image.bloggeng.com/WechatIMG62085.jpeg">
</div>

<div>
<img style="width:43%;display:inline-block;margin-right:10%" src="https://user-gold-cdn.xitu.io/2019/6/16/16b5fc09ba9648f6?w=396&h=897&f=png&s=72212"alt="">
<img style="width:43%;display:inline-block;" src="https://user-gold-cdn.xitu.io/2019/6/16/16b5fbdd0d8cf81f?w=401&h=592&f=png&s=55280" >
</div>

## 常见问题处理 (FAQ)

问题解决基本方案:

- 先检查 node 版本是否大于 16
- 确认 npm 或 yarn 已经配置好淘宝源
- 存在 package-lock.json 文件先删除
- 删除`node_modules`后重新执行`npm install` 或`cnpm install`
- 使用最新版[《智能微秘书》](https://github.com/leochen-g/wechat-assistant-pro)，摆脱环境问题

1. 我的微信号无法登陆
    
    最新版代码已经解决不能登录的问题，放心拉最新代码使用就行了

    ~~从 2017 年 6 月下旬开始，使用基于 web 版微信接入方案存在大概率的被限制登陆的可能性。 主要表现为：无法登陆 Web 微信，但不影响手机等其他平台。 验证是否被限制登陆： https://wx.qq.com 上扫码查看是否能登陆。 更多内容详见：~~

    [~~Can not login with error message: 当前登录环境异常。为了你的帐号安全，暂时不能登录 web 微信。~~](https://github.com/Chatie/wechaty/issues/603)

    [[谣言] 微信将会关闭网页版本](https://github.com/Chatie/wechaty/issues/990)

    [~~新注册的微信号无法登陆~~](https://github.com/Chatie/wechaty/issues/872)

2. 类似 Failed to download Chromium rxxx 的问题
    `ERROR: Failed to download Chromium r515411! Set "PUPPETEER_SKIP_CHROMIUM_DOWNLOAD" env variable to skip download.{ Error: read ETIMEDOUT at _errnoException (util.js:1041:11) at TLSWrap.onread (net.js:606:25) code: 'ETIMEDOUT', errno: 'ETIMEDOUT', syscall: 'read' }`

    解决方案：[https://github.com/GoogleChrome/puppeteer/issues/1597](https://github.com/GoogleChrome/puppeteer/issues/1597)

    `npm config set puppeteer_download_host=https://npm.taobao.org/mirrors`

    `sudo npm install puppeteer --unsafe-perm=true --allow-root`

3. 执行 `npm run start` 时无法安装 puppet-puppeteer&&Chromium

    - Centos7 下部署出现以下问题
      ![](http://image.bloggeng.com/14481551970095_.pic_hd.jpg)
      问题原因:[https://segmentfault.com/a/1190000011382062](https://segmentfault.com/a/1190000011382062)
      解决方案:
            #依赖库
            yum install pango.x86_64 libXcomposite.x86_64 libXcursor.x86_64 libXdamage.x86_64 libXext.x86_64 libXi.x86_64 libXtst.x86_64 cups-libs.x86_64 libXScrnSaver.x86_64 libXrandr.x86_64 GConf2.x86_64 alsa-lib.x86_64 atk.x86_64 gtk3.x86_64 -y

            #字体
            yum install ipa-gothic-fonts xorg-x11-fonts-100dpi xorg-x11-fonts-75dpi xorg-x11-utils xorg-x11-fonts-cyrillic xorg-x11-fonts-Type1 xorg-x11-fonts-misc -y
    - ubuntu 下，下载 puppeteer 失败  
       问题原因：[https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#chrome-headless-doesnt-launch-on-unix](https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md#chrome-headless-doesnt-launch-on-unix)
      解决方案：

           sudo apt-get  gconf-service libasound2 libatk1.0-0 libatk-bridge2.0-0 libc6 libcairo2 libcups2 libdbus-1-3 libexpat1 libfontconfig1 libgcc1 libgconf-2-4 libgdk-pixbuf2.0-0 libglib2.0-0 libgtk-3-0 libnspr4 libpango-1.0-0 libpangocairo-1.0-0 libstdc++6 libx11-6 libx11-xcb1 libxcb1 libxcomposite1 libxcursor1 libxdamage1 libxext6 libxfixes3 libxi6 libxrandr2 libxrender1 libxss1 libxtst6 ca-certificates fonts-liberation libappindicator1 libnss3 lsb-release xdg-utils wget

    - windows 下，下载 puppeteer 失败

      链接：https://pan.baidu.com/s/1YF09nELpO-4KZh3D2nAOhA
      提取码：0mrz

      把下载的文件放到如下图路径，并解压到当前文件夹中即可
      ![](http://image.bloggeng.com/14241551970542_.pic_hd.jpg)

    - 下载 puppeteer 失败,Linux 和 Mac 执行以下命令
      `PUPPETEER_DOWNLOAD_HOST = https://npm.taobao.org/mirrors npm install wechaty-puppet-wechat`

    - 下载 puppeteer 失败,Windows 执行以下命令

      `SET PUPPETEER_DOWNLOAD_HOST = https://npm.taobao.org/mirrors npm install wechaty-puppet-wechat`

4. 如图所示问题解决办法，关闭 win / mac 防火墙；如果公司网络有限制的话也可能引起无法启动问题
    ![](http://image.bloggeng.com/WechatIMG7619.png)

5. 支持 红包、转账、朋友圈… 吗 ?

    支付相关 - 红包、转账、收款 等都不支持

6. 更多关于 wechaty 功能相关接口

    [参考 wechaty 官网文档](https://wechaty.js.org/docs/)
    
7. 希望输出运行日志相关 DEBUG 信息, 并保存到本地
   - 在运行前, 系统里输入 `export WECHATY_LOG=verbose` 就能将默认日志输出改为详细 (其他等级参考[官方文档](https://www.npmjs.com/package/brolog#loglevelnewlevel)) 
   - 保存到本地, 在支持 `bash` 环境的命令行中, 可以用这样的方式启动程序: `node index.js 2>&1 | tee bot.log`, 这样控制台和后台会同时显示/存储日志信息.

8 .CentOS 安装 better-sqlite3 报错的问题

* 首先执行 `sudo yum install centos-release-scl-rh`，`sudo yum install devtoolset-8-build `这两个方法

* 安装相应的gdb，`sudo yum install devtoolset-8-gdb`
  
* 同样，也可以安装相应版本的 gcc 和 g++，`sudo yum install devtoolset-8-gcc devtoolset-8-gcc-c++`

* yum安装完后，原来的gcc不覆盖，所以需要执行enable脚本更新环境变量，`sudo source /opt/rh/devtoolset-8/enable`

* 可以通过加入到profile里面开机自动`source, vim /etc/profile`, 跳到最后一行加入以下内容，`source /opt/rh/devtoolset-8/enable`

参考文章 [better-sqlite3](https://www.cnblogs.com/clwsec/p/12493653.html)

有其他问题也可添加小助手微信后，发送`'加群'`进入微信每日说技术交流群

## 注意

本项目属于个人兴趣开发，开源出来是为了技术交流，请勿使用此项目做违反微信规定或者其他违法事情。
建议使用小号进行测试，有被微信封禁网页端登录权限的风险（客户端不受影响），请确保自愿使用。因为个人使用不当导致网页端登录权限被封禁，均与作者无关，谢谢理解

