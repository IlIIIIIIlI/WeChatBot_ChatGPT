// 配置文件
module.exports = {
    // 每日说配置项（必填项）
    NAME: 'Andy', //主人的备注姓名
    NICKNAME: 'Andy', //主人的昵称
    MEMORIAL_DAY: '2023/02/02', //CFA考试日
    CITY: '墨尔本', //主人的所在城市（城市名称，不要带“市”）
    SENDDATE: '0 00 10 * * *', //定时发送时间 每天8点06分0秒发送，规则见 /schedule/index.js
    TXAPIKEY: 'c6842365e368cb3ffe19a91d2038e7a3', //此处须填写个人申请的天行apikey,请替换成自己的 申请地址https://www.tianapi.com/signup.html?source=474284281

    // 高级功能配置项（非必填项）
    AUTOREPLY: true, //自动聊天功能 默认开启, 关闭设置为: false
    DEFAULTBOT: '0', //设置默认聊天机器人 0 天行机器人 1 图灵机器人 2 天行对接的图灵机器人，需要到天行机器人官网充值（50元/年，每天1000次）
    AUTOREPLYPERSON: ['Andy', 'Becky', 'Becky2', '却尘'], //指定多个好友开启机器人聊天功能   指定好友的备注，最好不要带有特殊字符
    // TULINGKEY: 'd4559612ec0c49b4b7d7f61a36c0bf49',//图灵机器人apikey,需要自己到图灵机器人官网申请，并且需要认证

    // (自定义) 如果你有 DIY 和基本的编程基础, 可以在这自己定义变量, 用于 js 文件访问, 包括设置简单的定时任务, 例如可以定义 task 数组
    tasks: [
        { nick: 'Andy', emoji: '🌝', action: 'eat xx', date: '0 0 8 * * *' },
        { nick: 'Andy', emoji: '🌞', action: '喝西北风', date: '20 58 18 * * *' },
        { nick: 'Andy', emoji: '🌔', action: '吃饭去咯', date: '30 58 18 * * *' },
        { nick: 'Andy', emoji: '🤖', action: 'sleep', date: '0 0 22 * * *' },
        { nick: 'Andy', emoji: '👽', action: 'sleep', date: '0 0 22 * * *' },
        { nick: 'Andy', emoji: '🤡', action: 'sleep', date: '0 0 22 * * *' },
        { nick: 'Andy', emoji: '🧑🏾‍🎄', action: 'sleep', date: '0 0 22 * * *' },
        { nick: 'Andy', emoji: '🛌🏾', action: 'sleep', date: '0 0 22 * * *' },
        { nick: 'Andy', emoji: '🌚', action: 'sleep', date: '0 0 22 * * *' }

    ],
}
