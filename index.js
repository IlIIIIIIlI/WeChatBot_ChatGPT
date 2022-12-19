/**
 * WechatBot
 *  - https://github.com/gengchen528/wechatBot
 */
const { WechatyBuilder } = require('wechaty');
const schedule = require('./schedule/index');
const config = require('./config/index');
const untils = require('./utils/index');
const superagent = require('./superagent/index');
const { tasks } = require('./config/index');

// 延时函数，防止检测出类似机器人行为操作
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// 二维码生成
function onScan(qrcode, status) {
  require('qrcode-terminal').generate(qrcode); // 在console端显示二维码
  const qrcodeImageUrl = [
    'https://api.qrserver.com/v1/create-qr-code/?data=',
    encodeURIComponent(qrcode),
  ].join('');

  console.log(qrcodeImageUrl);
}

// 登录
async function onLogin(user) {
  console.log(`贴心小助理${user}登录了`);
  const date = new Date()
  console.log(`当前容器时间:${date}`);
  if (config.AUTOREPLY) {
    console.log(`已开启机器人自动聊天模式`);
  }

  // 登陆后创建定时任务
  await initDay();
}

// 登出
function onLogout(user) {
  console.log(`小助手${user} 已经登出`);
}

// 监听对话
async function onMessage(msg) {
  const contact = msg.talker(); // 发消息人
  const content = msg.text().trim(); // 消息内容
  const room = msg.room(); // 是否是群消息
  const alias = await contact.alias() || await contact.name(); // 发消息人备注
  const isText = msg.type() === bot.Message.Type.Text;
  if (msg.self()) {
    return;
  }

  if (room && isText) {
    // 如果是群消息 目前只处理文字消息
    const topic = await room.topic();
    console.log(`群名: ${topic} 发消息人: ${await contact.name()} 内容: ${content}`);

    // 群消息接收到以后
    if (content.substr(0, 1) == '@') {
      let contactContent = content.replace('@', '');
      let reply;
      if (config.DEFAULTBOT == '0') {
        // 天行聊天机器人逻辑
        reply = await superagent.getGPTReply(contactContent);
        console.log('天行机器人回复：', reply);
      } else if (config.DEFAULTBOT == '1') {
        // 图灵聊天机器人
        reply = await superagent.getGPTReply(contactContent);
        console.log('图灵机器人回复：', reply);
      } else if (config.DEFAULTBOT == '2') {
        // 天行对接的图灵聊
        reply = await superagent.getGPTReply(contactContent);
        console.log('天行对接的图灵机器人回复：', reply);
      }
      try {
        console.log(typeof reply)
        await delay(700);
        var result =JSON.stringify(reply['choices'][0].text);
        console.log(typeof result)
        let result2 = result.replace('\"', '').replace('"', '').replace(/\\n/g, '                                                  ').replace("/\\§", '').replace("\\§","").replace("?","")
        let result3 = result2.trim();
        await room.say(result3);
      } catch (e) {
        console.error(e);
      }
    } 

  } else if (isText) {
    // 如果非群消息 目前只处理文字消息
    console.log(`发消息人: ${alias} 消息内容: ${content}`);


    // 根据发送文字的前四个字进行判断
    if (content.substr(0, 4) == '今日天气' || content.substr(0, 2) == '天气') {
      let contactContent = content.replace('今日天气', '').replace('天气', '');
      if (contactContent) {
        let res = await superagent.getTXweather(contactContent);
        await delay(600);
        await contact.say(res);
      }
    } else if (content.substr(0, 4) == '全网热搜' || content.substr(0, 2) == '热搜') {
      let res = await superagent.getNetworkHot();
      await delay(610);
      await contact.say(res);
    } else if (content.substr(0, 4) == '世界时间' || content.substr(0, 2) == '时间') {
      let contactContent = content.replace('世界时间', '').replace('时间', '');
      if (contactContent) {
        let res = await superagent.getWorldTime(contactContent);
        await delay(620);
        await contact.say(res);
      }
    } else if (content.substr(0, 4) == 'IP查询' || content.substr(0, 2) == 'IP') {
      let contactContent = content.replace('IP查询', '').replace('IP', '');
      if (contactContent) {
        let res = await superagent.getIPQuery(contactContent);
        await delay(500);
        await contact.say(res);
      }
    } else if (content.substr(0, 4) == '网页图片' || content.substr(0, 2) == '图片') {
      let contactContent = content.replace('网页图片', '').replace('图片', '');
      if (contactContent) {
        let res = await superagent.getHtmlPic(contactContent.toString());
        await delay(510);
        await contact.say(res);
      }
    } else if (content.substr(0, 4) == '股票术语' || content.substr(0, 2) == '股票') {
      let contactContent = content.replace('股票术语', '').replace('股票', '');
      if (contactContent) {
        let res = await superagent.getSharesWord(contactContent.toString());
        await delay(520);
        await contact.say(res);
      }
    } else if (content.substr(0, 4) == 'AI新闻' || content.substr(0, 2) == 'AI') {
      let contactContent = content.replace('AI新闻', '').replace('AI', '');
      if (contactContent) {
        let res = await superagent.getAI(contactContent.toString());
        await delay(530);
        await contact.say(res);
      }
    } else if (content.substr(0, 4) == '获取摘要' || content.substr(0, 2) == '摘要') {
      let contactContent = content.replace('获取摘要', '').replace('获取摘要', '');
      if (contactContent) {
        let res = await superagent.getAutoAbstract(contactContent.toString());
        await delay(410);
        await contact.say(res);
      }
    } else if (content.substr(0, 3) == '二维码' || content.substr(0, 2) == 'QR') {
      let contactContent = content.replace('二维码', '').replace('QR', '');
      if (contactContent) {
        let res = await superagent.getQRCode(contactContent.toString());
        await delay(400);
        await contact.say(res);
      }
    } else if (content.substr(0, 4) == '汇率换算' || content.substr(0, 2) == '汇率') {
      let contactContent = content.replace('汇率换算', '').replace('汇率', '');
      if (contactContent) {
        let res = await superagent.getFXrate(contactContent.toString());
        await delay(300);
        await contact.say(res);
      }
    } else if (content.substr(0, 4) == '励志名言' || content.substr(0, 2) == '励志') {
      let res = await superagent.getGuoDu();
      await delay(100);
      await contact.say(res);

    } else if (content.substr(0, 4) == '古代情诗' || content.substr(0, 2) == '情诗') {
      let res = await superagent.getLovePoem();
      await delay(200);
      await contact.say(res);
    } else if (content.substr(0, 4) == '财经新闻' || content.substr(0, 2) == '财经') {
      let contactContent = content.replace('财经新闻', '').replace('财经', '');
      if (contactContent) {
        let res = await superagent.getFinanceNews(contactContent.toString());
        await delay(250);
        await contact.say(res);
      }
    } else if (content.substr(0, 4) == '国际新闻' || content.substr(0, 2) == '国际') {
      let contactContent = content.replace('国际新闻', '').replace('国际', '');
      if (contactContent) {
        let res = await superagent.getWorldNews(contactContent.toString());
        await delay(270);
        await contact.say(res);
      }
    } else if (content.substr(0, 4) == '分类诗词' || content.substr(0, 2) == '诗词') {
      let contactContent = content.replace('分类诗词', '').replace('诗词', '');
      if (contactContent) {
        let res = await superagent.getMingYan(contactContent.toString());
        await delay(290);
        await contact.say(res);
      }
    } else if (content.substr(0, 4) == '藏头诗词' || content.substr(0, 2) == '藏头') {
      let contactContent = content.replace('藏头诗词', '').replace('藏头', '');
      if (contactContent) {
        let res = await superagent.getCangTou(contactContent.toString());
        await delay(300);
        console.log(res)
        await contact.say(res);
      }
    }
    else if (config.AUTOREPLY && config.AUTOREPLYPERSON.indexOf(alias) > -1) {
      // 如果开启自动聊天且已经指定了智能聊天的对象才开启机器人聊天\
      if (content) {
        let reply;
        if (config.DEFAULTBOT == '0') {
          // 天行聊天机器人逻辑
          reply = await superagent.getGPTReply(content);
          console.log('天行机器人回复：', reply);
        } else if (config.DEFAULTBOT == '1') {
          // 图灵聊天机器人
          reply = await superagent.getGPTReply(content);
          console.log('图灵机器人回复：', reply);
        } else if (config.DEFAULTBOT == '2') {
          // 天行对接的图灵聊
          reply = await superagent.getGPTReply(content);
          console.log('天行对接的图灵机器人回复：', reply);
        }
        try {
          console.log(typeof reply)
          await delay(700);
          var result =JSON.stringify(reply['choices'][0].text);
          console.log(typeof result)
          let result2 = result.replace('\"', '').replace('"', '').replace(/\\n/g, '                                                  ').replace("/\\§", '').replace("\\§","").replace("?","")
          await contact.say(result2);
        } catch (e) {
          console.error(e);
        }
      } 
    }
  }
}

// 创建微信每日说定时任务
async function initDay() {
  console.log(`已经设定每日说任务`);

  schedule.setSchedule(config.SENDDATE, async () => {
    console.log('你的贴心小助理开始工作啦！');
    let logMsg;
    let contact =
      (await bot.Contact.find({ name: config.NICKNAME })) ||
      (await bot.Contact.find({ alias: config.NAME })); // 获取你要发送的联系人
    let contact2 =
      (await bot.Contact.find({ name: "Becky2" })) ||
      (await bot.Contact.find({ alias: "Becky2" })); // 获取你要发送的联系人

    let one = await superagent.getOne(); //获取每日一句
    let lizhi = await superagent.getGuoDu();
    let weather = await superagent.getTXweather("上海"); //获取天气信息
    let yingyu = await superagent.getEveryDay();
    let AI = await superagent.getAI("随便看看");
    let today = await untils.formatDate(new Date()); //获取今天的日期
    let memorialDay = untils.getDay(config.MEMORIAL_DAY); //获取纪念日天数
    let fx = await superagent.getFXrate("AUDCNY");
    let finance = await superagent.getFinanceNews("随便看看");

    // 你可以修改下面的 str 来自定义每日说的内容和格式
    // PS: 如果需要插入 emoji(表情), 可访问 "https://getemoji.com/" 复制插入
    let str = `${today}\n距离CFA考试还有${memorialDay}天\n\n${lizhi}\n${yingyu}\n${one}\n\n今日天气\n${weather}\n\n汇率为\n${fx}`;
    let str2 = `今天人工智能的新闻有${AI}\n\n今天财经的新闻有\n${finance}`;
    try {
      logMsg = str;
      await delay(1000);
      await contact.say(str); // 发送消息
      await delay(1500);
      await contact2.say(str); // 发送消息
      logMsg = str2;
      await delay(1000);
      await contact.say(str2); // 发送消息
      await delay(1500);
      await contact2.say(str2); // 发送消息
    } catch (e) {
      logMsg = e.message;
    }
    console.log(logMsg);
  });
  for (const task in config.tasks) {
    schedule.setSchedule(config.tasks[task].date, async () => {
      console.log('你的贴心小助理开始工作啦！');
      let logMsg;
      let contact =
        (await bot.Contact.find({ name: config.tasks[task].nick })) ||
        (await bot.Contact.find({ alias: config.tasks[task].nick })); // 获取你要发送的联系人
      // 你可以修改下面的 str 来自定义每日说的内容和格式
      // PS: 如果需要插入 emoji(表情), 可访问 "https://getemoji.com/" 复制插入
      let str = config.tasks[task].emoji + config.tasks[task].action;
      try {
        logMsg = str;
        await delay(1000);
        await contact.say(str); // 发送消息
      } catch (e) {
        logMsg = e.message;
      }
      console.log(logMsg);
    });
  }
}



const bot = WechatyBuilder.build({
  name: 'WechatEveryDay',
  puppet: 'wechaty-puppet-wechat', // 如果有token，记得更换对应的puppet
  puppetOptions: {
    uos: true
  }
})

bot.on('scan', onScan);
bot.on('login', onLogin);
bot.on('logout', onLogout);
bot.on('message', onMessage);

bot
  .start()
  .then(() => console.log('开始登陆微信'))
  .catch((e) => console.error(e));
