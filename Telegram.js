const telegramBot = require('node-telegram-bot-api');

const token = "5236944708:AAHaM6S1aJTVWRks3O3pOsR3PhX9ptzJKRw";
const bot = new telegramBot(token,{polling:true});
const fetch = require('isomorphic-unfetch')

bot.on('message', async (msg) =>{
    const chatId = msg.chat.id;
    console.log(JSON.stringify(msg));
    const message = msg.text.trim().toLowerCase();
    switch(message){
        case "/start":
            bot.sendMessage(chatId,"Selamlar")
            break;
        case "/haber":
            const result = await(getNews(1));
            try {
                Array.from(Array(5)).forEach((i,index)=>{
                    if(result[index].urlToImage != "" || result[index].urlToImage != null){
                        bot.sendPhoto(chatId,result[index].urlToImage, {caption: `${result[index].title}\n${result[index].description}`})
                    }
                })
            }
            catch (e){
                
            }
            break;
        case "selam" :
            bot.sendMessage(chatId,"Seni Çok Seviyorum Zübeydem");
            bot.sendPhoto(chatId,"https://pbs.twimg.com/media/E2k2zjNXEAY5D7g?format=jpg&name=small");
            break;
        case "/enguzelkız" :
            bot.sendChatAction(chatId,"typing");
            bot.sendPhoto(chatId,"https://pbs.twimg.com/media/E2k2zjNXEAY5D7g?format=jpg&name=small");
            break;
        default:
            bot.sendMessage(chatId,"Seçeneklerde Yok");
            break;
    }
})

const getNews = (number)=>{
    return fetch("https://newsapi.org/v2/top-headlines?country=tr&apiKey=fdfd6a5c3f174dfc95c03fe5e37cb079").
    then(response=>response.json()).then(response=>{return response.articles})
}