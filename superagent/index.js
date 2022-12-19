const superagent = require('./superagent');
const config = require('../config/index');
const cheerio = require('cheerio');
const { machineIdSync } = require('node-machine-id');
const crypto = require('crypto');
let md5 = crypto.createHash('md5');
let uniqueId = md5.update(machineIdSync()).digest('hex'); // 获取机器唯一识别码并MD5，方便机器人上下文关联
const ONE = 'http://wufazhuce.com/'; // ONE的web版网站
const TXHOST = 'http://api.tianapi.com/txapi/'; // 天行host
const TULINGAPI = 'http://www.tuling123.com/openapi/api'; // 图灵1.0接口api
const GPTAPI = 'https://api.openai.com/v1/text-davinci/generations';
const OpenAiAPI = require('./GPTengine');

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

async function getOne() {
    // 获取每日一句
    try {
        let res = await superagent.req({ url: ONE, method: 'GET', spider: true });
        let $ = cheerio.load(res);
        let todayOneList = $('#carousel-one .carousel-inner .item');
        let todayOne = $(todayOneList[0])
            .find('.fp-one-cita')
            .text()
            .replace(/(^\s*)|(\s*$)/g, '');
        return todayOne;
    } catch (err) {
        console.log('获取每日一句出错', err);
        return err;
    }
}

async function getTXweather(city) {
    // 获取天行天气
    let url = TXHOST + 'tianqi/';
    try {
        let content = await superagent.req({
            url, method: 'GET', params: {
                key: config.TXAPIKEY,
                city: city
            }
        });
        if (content.code === 200) {
            let todayInfo = content.newslist[0];
            let obj =
                todayInfo.tips +
                '今天' +
                todayInfo.weather +
                '\n'
                + '温度:' +
                todayInfo.lowest +
                "至" +
                todayInfo.highest +
                todayInfo.wind +
                todayInfo.windspeed +
                '\n'
                ;
            return obj;
        }
    } catch (err) {
        console.log('请求天气失败', err);
    }
}


async function getWorldTime(city) {
    // 获取天行天气
    let url = TXHOST + 'worldtime/';
    try {
        let content = await superagent.req({
            url, method: 'GET', params: {
                key: config.TXAPIKEY,
                city: city
            }
        });
        if (content.code === 200) {
            let timeInfo = content.newslist[0];
            let obj =
                timeInfo.country +
                timeInfo.city +
                timeInfo.timeZone +
                '\n' +
                "星期" +
                timeInfo.week +
                '\n' +
                timeInfo.strtime +
                '\n'
                ;
            return obj;
        }
    } catch (err) {
        console.log('请求时间失败', err);
    }
}

async function getIPQuery(IPs) {
    // 获取天行天气
    let url = TXHOST + 'ipquery/';
    try {
        let content = await superagent.req({
            url, method: 'GET', params: {
                key: config.TXAPIKEY,
                ip: IPs
            }
        });
        if (content.code === 200) {
            let IPInfo = content.newslist[0];
            let obj =
                "宝贝，你所要提取的IP为： " +
                IPInfo.ip +
                '\n' +
                "地址为: " +
                IPInfo.country +
                IPInfo.province +
                IPInfo.city +
                IPInfo.district +
                '\n' +
                "经纬度为: " +
                IPInfo.longitude +
                IPInfo.latitude
            '\n'
                ;
            return obj;
        }
    } catch (err) {
        console.log('请求时间失败', err);
    }
}

async function getHtmlPic(urls) {
    // 获取图片
    let url = TXHOST + 'htmlpic/';
    try {
        let content = await superagent.req({
            url, method: 'GET', params: {
                key: config.TXAPIKEY,
                url: urls
            }
        });
        if (content.code === 200) {
            let obj = '哇，这里图片好多啊，\n';
            for (const htmlpic in content.newslist) {
                console.log(content.newslist[htmlpic]);
                obj += content.newslist[htmlpic].picUrl;
                obj += '\n';
            }
            return obj;
        }
    } catch (err) {
        console.log('请求时间失败', err);
    }
}

async function getSharesWord(words) {
    // 获取天行天气
    let url = TXHOST + 'shares/';
    try {
        let content = await superagent.req({
            url, method: 'GET', params: {
                key: config.TXAPIKEY,
                word: words
            }
        });
        if (content.code === 200) {
            let timeInfo = content.newslist[0];
            let obj =
                timeInfo.term +
                '的意思是： \n' +
                timeInfo.content +
                '\n'
                ;
            return obj;
        }
    } catch (err) {
        console.log('请求股票失败', err);
    }
}

async function getAI(words) {
    // 获取天行天气
    let url = TXHOST + 'ai/';
    try {
        console.log(words);
        if (words == "随便看看" || words == " 随便看看") {
            let content = await superagent.req({
                url, method: 'GET', params: {
                    key: config.TXAPIKEY,
                    num: 20,
                }
            });
            if (content.code === 200) {
                let obj = '以下是返回信息，\n';
                for (const AIInfo in content.newslist) {
                    obj += content.newslist[AIInfo].ctime;
                    obj += '\n';
                    obj += content.newslist[AIInfo].title;
                    obj += '\n';
                    obj += content.newslist[AIInfo].description;
                    obj += '\n';
                }
                return obj;
            }
        } else {
            let content = await superagent.req({
                url, method: 'GET', params: {
                    key: config.TXAPIKEY,
                    num: 20,
                    rand: 0,
                    word: words
                }
            });
            if (content.code === 200) {

                let obj = '好的主人，咱们来看看人工智能领域最新消息\n';
                for (const AIInfo in content.newslist) {
                    obj += content.newslist[AIInfo].ctime;
                    obj += '\n';
                    obj += content.newslist[AIInfo].title;
                    obj += '\n';
                    obj += content.newslist[AIInfo].description;
                    obj += '\n';
                    obj += content.newslist[AIInfo].url;
                    obj += '\n';
                    obj += '\n';
                }
                return obj;
            }
        }

    } catch (err) {
        console.log('请求人工智能失败', err);
    }
}

async function getFinanceNews(words) {
    // 获取天行天气
    let url = TXHOST + 'caijing/';
    try {
        console.log(words);
        if (words == "随便看看" || words == " 随便看看") {
            let content = await superagent.req({
                url, method: 'GET', params: {
                    key: config.TXAPIKEY,
                    num: 20,
                    rand: 0,
                }
            });
            if (content.code === 200) {
                let obj = '财经新闻最新20条如下，\n';
                for (const AIInfo in content.newslist) {
                    obj += content.newslist[AIInfo].ctime;
                    obj += '\n';
                    obj += content.newslist[AIInfo].title;
                    obj += '\n';
                    obj += content.newslist[AIInfo].description;
                    obj += '\n';
                }
                return obj;
            }
        } else {
            let content = await superagent.req({
                url, method: 'GET', params: {
                    key: config.TXAPIKEY,
                    num: 20,
                    rand: 0,
                    word: words
                }
            });
            if (content.code === 200) {

                let obj = "好的主人，咱们来看看" + words + "的财经新闻最新消息 \n";
                for (const AIInfo in content.newslist) {
                    obj += content.newslist[AIInfo].ctime;
                    obj += '\n';
                    obj += content.newslist[AIInfo].title;
                    obj += '\n';
                    obj += content.newslist[AIInfo].description;
                    obj += content.newslist[AIInfo].url;
                    obj += '\n';
                    obj += '\n';
                }
                return obj;
            }
        }

    } catch (err) {
        console.log('请求人工智能失败', err);
    }
}


async function getWorldNews(words) {
    // 获取天行天气
    let url = TXHOST + 'world/';
    try {
        console.log(words);
        if (words == "随便看看" || words == " 随便看看") {
            let content = await superagent.req({
                url, method: 'GET', params: {
                    key: config.TXAPIKEY,
                    num: 20,
                }
            });
            if (content.code === 200) {
                let obj = '以下是20条最新国际新闻，\n';
                for (const AIInfo in content.newslist) {
                    obj += content.newslist[AIInfo].ctime;
                    obj += '\n';
                    obj += content.newslist[AIInfo].title;
                    obj += '\n';
                    obj += content.newslist[AIInfo].description;
                    obj += '\n';
                }
                return obj;
            }
        } else {
            let content = await superagent.req({
                url, method: 'GET', params: {
                    key: config.TXAPIKEY,
                    num: 20,
                    rand: 0,
                    word: words
                }
            });
            if (content.code === 200) {

                let obj = "好的主人，咱们来看看" + words + "的国际新闻最新消息 \n";
                for (const AIInfo in content.newslist) {
                    obj += content.newslist[AIInfo].ctime;
                    obj += '\n';
                    obj += content.newslist[AIInfo].title;
                    obj += '\n';
                    obj += content.newslist[AIInfo].description;
                    obj += content.newslist[AIInfo].url;
                    obj += '\n';
                    obj += '\n';
                }
                return obj;
            }
        }

    } catch (err) {
        console.log('请求人工智能失败', err);
    }
}

async function getAutoAbstract(texts) {
    // 获取摘要
    let url = TXHOST + 'autoabstract/';
    try {
        let content = await superagent.req({
            url, method: 'GET', params: {
                key: config.TXAPIKEY,
                text: texts,
                length: 30
            }
        });
        if (content.code === 200) {
            let timeInfo = content.newslist[0];
            let obj =
                "简单来说: " +
                '\n' +
                timeInfo.summary +
                '\n'
            return obj;
        }
    } catch (err) {
        console.log('请求摘要失败', err);
    }
}

async function getQRCode(texts) {
    // 获取摘要
    let url = TXHOST + 'ewm/';
    try {
        let content = await superagent.req({
            url, method: 'GET', params: {
                key: config.TXAPIKEY,
                text: texts,
            }
        });
        if (content.code === 200) {
            console.log(content.newslist);
            let obj = content.newslist[0].text
            return obj;
        }
    } catch (err) {
        getGuoDu();
    }
}

async function getFXrate(texts) {
    // 获取摘要
    let url = TXHOST + 'fxrate/';
    try {
        let content = await superagent.req({
            url, method: 'GET', params: {
                key: config.TXAPIKEY,
                fromcoin: texts.substr(0, 3),
                tocoin: texts.substr(3),
                money: 1,
            }
        });
        if (content.code === 200) {
            let obj = "目前" + texts + "汇率为： " + content.newslist[0].money
            return obj;
        } else {
            getGuoDu();
        }
    } catch (err) {
        getGuoDu();
    }
}

// 天行对接的图灵机器人
async function getTXTLReply(word) {
    let url = TXHOST + 'tuling/';
    let content = await superagent.req({
        url, method: 'GET', params: {
            key: config.TXAPIKEY,
            question: word,
            userid: uniqueId
        }
    });

    if (content.code === 200) {
        let response = content.newslist[0].reply;
        console.log('天行对接的图灵机器人:', content);
        return response;
    } else {
        return '我好像迷失在无边的网络中了，接口调用错误：' + content.msg;
    }
}

async function getGPTReply(word) {
          var o = new OpenAiAPI("在此配置openai API")
          let result = o.CompletionsCreate(word)
          return result
    }


// 图灵智能聊天机器人
async function getTuLingReply(word) {
    let url = TULINGAPI;
    let content = await superagent.req({
        url, method: 'GET', params: {
            key: config.TULINGKEY,
            info: word
        },
        platform: 'tl'
    });

    if (content.code === 100000) {
        return content.text;
    } else {
        return '出错了：' + content.text;
    }
}

// 天行聊天机器人
async function getReply(word) {
    let url = TXHOST + 'robot/';
    let content = await superagent.req({
        url, method: 'GET', params: {
            key: config.TXAPIKEY,
            question: word,
            mode: 1,
            datatype: 0,
            userid: uniqueId
        }
    });
    if (content.code === 200) {
        let res = content.newslist[0]
        let response = '';
        if (res.datatype === 'text') {
            response = res.reply
        } else if (res.datatype === 'view') {
            response = `虽然我不太懂你说的是什么，但是感觉很高级的样子，因此我也查找了类似的文章去学习，你觉得有用吗<br>《${content.newslist[0].title}》${content.newslist[0].url}`
        } else {
            response = '你太厉害了，说的话把我难倒了，我要去学习了，不然没法回答你的问题';
        }
        return response;
    } else {
        var temp = getRandomInt(3)
        console.log(temp);
        if (temp == 0) {
            // 获取神回复
            let url = TXHOST + 'godreply/';
            try {
                let content = await superagent.req({ url, method: 'GET', params: { key: config.TXAPIKEY } });
                if (content.code === 200) {
                    let sweet = content.newslist[0].content;
                    let str = sweet.replace('\r\n', '<br>');
                    return str;
                }
            } catch (err) {
                console.log('我迷了', err);
            }
        } else if (temp == 1) {
            let url = TXHOST + 'caihongpi/';
            try {
                let content = await superagent.req({ url, method: 'GET', params: { key: config.TXAPIKEY } });
                if (content.code === 200) {
                    return content.newslist[0].content;
                }
            } catch (err) {
                console.log('我迷了', err);
            }
        } else if (temp == 2) {
            let url = TXHOST + 'one/';
            try {
                let content = await superagent.req({ url, method: 'GET', params: { key: config.TXAPIKEY, content: word } });
                let oneInfo = content.newslist[0];
                let obj =
                    oneInfo.word +
                    '\n' +
                    oneInfo.wordfrom +
                    '\n' +
                    oneInfo.imgauthor
                    ;
                return obj;
            } catch (err) {
                console.log('我迷了', err);
            }
        } else {
            let url = TXHOST + 'saylove/';
            try {
                let content = await superagent.req({ url, method: 'GET', params: { key: config.TXAPIKEY } });
                if (content.code === 200) {
                    let sweet = content.newslist[0].content;
                    let str = sweet.replace('\r\n', '<br>');
                    return str;
                } else {
                    return '你很像一款游戏。我的世界'
                }
            } catch (err) {
                console.log('获取接口失败', err);
            }
        }
    }
}

async function getNetworkHot() {
    // 获取神回复
    let url = TXHOST + 'networkhot/';
    try {
        let content = await superagent.req({ url, method: 'GET', params: { key: config.TXAPIKEY } });
        if (content.code === 200) {
            let obj = '';
            for (const networkhot in content.newslist) {
                console.log(content.newslist[networkhot]);
                obj += content.newslist[networkhot].title;
                obj += content.newslist[networkhot].digest;
                obj += '\n';
            }
            return obj;
        } else {
            getGuoDu();
        }
    } catch (err) {
        getGuoDu();
    }
}


async function getGuoDu() {
    // 获取神回复
    let url = TXHOST + 'lzmy/';
    try {
        let content = await superagent.req({ url, method: 'GET', params: { key: config.TXAPIKEY } });
        if (content.code === 200) {
            console.log(content.newslist);
            let str = content.newslist[0].saying + '\n' + content.newslist[0].transl + '---' + content.newslist[0].source + '\n';
            console.log(str);
            return str;
        }
    } catch (err) {
        console.log('我迷了', err);
    }
}

async function getEveryDay() {
    // 获取神回复
    let url = TXHOST + 'everyday/';
    try {
        let content = await superagent.req({ url, method: 'GET', params: { key: config.TXAPIKEY } });
        if (content.code === 200) {
            console.log(content.newslist);
            let str = content.newslist[0].content + '\n' + content.newslist[0].note + '\n' + content.newslist[0].source;
            console.log(str);
            return str;
        }
    } catch (err) {
        console.log('我迷了', err);
    }
}

async function getLovePoem() {
    // 获取神回复
    let url = TXHOST + 'qingshi/';
    try {
        let content = await superagent.req({ url, method: 'GET', params: { key: config.TXAPIKEY } });
        if (content.code === 200) {
            console.log(content.newslist);
            let str = content.newslist[0].source + '\n' + content.newslist[0].content + '\n' + content.newslist[0].author + '\n';
            console.log(str);
            return str;
        }
    } catch (err) {
        console.log('我迷了', err);
    }
}


async function getMingYan(words) {
    // 获取天行天气
    let url = TXHOST + 'flmj/';
    try {
        let content = await superagent.req({
            url, method: 'GET', params: {
                key: config.TXAPIKEY,
                type: words,
                num: 10,
            }
        });
        if (content.code === 200) {
            let obj = '好的主人，咱们来看看关于' + words + '的诗词' + '\n';
            for (const AIInfo in content.newslist) {
                obj += content.newslist[AIInfo].content;
                obj += '\n';
                obj += content.newslist[AIInfo].source;
                obj += '\n';
                obj += '\n';
            }
            return obj;
        }
    } catch (err) {
        console.log('请求诗词失败', err);
    }
}

async function getCangTou(words) {
    // 获取天行天气
    let url = TXHOST + 'cangtoushi/';
    try {
        let content = await superagent.req({
            url, method: 'GET', params: {
                key: config.TXAPIKEY,
                word: words,
                type: 4,
                // len：1, 七言诗
            }
        });
        if (content.code === 200) {
            let obj = '好的主人，咱们来看看关于' + words + '的诗词' + '\n';
            for (const AIInfo in content.newslist) {
                obj += content.newslist[AIInfo].list;
                obj += '\n';
            }
            return obj;
        }
    } catch (err) {
        console.log('请求诗词失败', err);
    }
}

// /**
//  * 获取垃圾分类结果
//  * @param {String} word 垃圾名称
//  */
// async function getRubbishType(word) {
//     let url = TXHOST + 'lajifenlei/';
//     let content = await superagent.req({ url, method: 'GET', params: { key: config.TXAPIKEY, word: word } });

//     if (content.code === 200) {
//         let type;
//         if (content.newslist[0].type == 0) {
//             type = '是可回收垃圾';
//         } else if (content.newslist[0].type == 1) {
//             type = '是有害垃圾';
//         } else if (content.newslist[0].type == 2) {
//             type = '是厨余(湿)垃圾';
//         } else if (content.newslist[0].type == 3) {
//             type = '是其他(干)垃圾';
//         }
//         let response =
//             content.newslist[0].name +
//             type +
//             '<br>解释：' +
//             content.newslist[0].explain +
//             '<br>主要包括：' +
//             content.newslist[0].contain +
//             '<br>投放提示：' +
//             content.newslist[0].tip;
//         return response;
//     } else {
//         // 获取土味情话
//         let url = TXHOST + 'godreply/';
//         try {
//             let content = await superagent.req({ url, method: 'GET', params: { key: config.TXAPIKEY } });
//             if (content.code === 200) {
//                 let sweet = content.newslist[0].content;
//                 let str = sweet.replace('\r\n', '<br>');
//                 return str;
//             }
//         } catch (err) {
//             console.log('我迷了', err);
//         }
//     }
// }





module.exports = {
    getOne,
    getTXweather,
    getReply,
    getGPTReply,
    getTuLingReply,
    getTXTLReply,
    getNetworkHot,
    getWorldTime,
    getIPQuery,
    getHtmlPic,
    getSharesWord,
    getAI,
    getAutoAbstract,
    getQRCode,
    getFXrate,
    getGuoDu,
    getLovePoem,
    getFinanceNews,
    getWorldNews,
    getEveryDay,
    getMingYan,
    getCangTou
};
