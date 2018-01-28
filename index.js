// Только сейчас я понял, что сделал не очень правильно, засунув все примеры в один файл
// Что мешало нормально запускать "простого" бота
// Поэтому сделаем так - этого бота можно будет запустить без проблем, если вы указали все правильно
// А уже если вы поняли как это работает, то можете брать примеры код из статьи или файла extended.js и пробовать применить их сюда

// Подключение модуля
var TelegramBot = require('node-telegram-bot-api');
/////////////
var express = require('express');
var app     = express();

app.set('port', (process.env.PORT || 5000));

//For avoidong Heroku $PORT error
app.get('/', function(request, response) {
    var result = 'App is running'
    response.send(result);
}).listen(app.get('port'), function() {
    console.log('App is running, server is listening on port ', app.get('port'));
});
////////////////

// Токен вашего бота, который можно узнать у @BotFather
var token = "514827275:AAFlyESPn8KiWuLYGjIAbf6-9ZHzfW5HMfw";

// Подключаем бота и указываем, что хотим получать сообщения и тд
var bot = new TelegramBot(token, {
	polling: true
});

// Оповещение о запуске бота
bot.getMe().then(function (value) {
	
	let message = "Запущен бот @" + value['username'];
	// Вариант с логом в консоль
	console.log(message);

});

// Команда /start
bot.onText(/\/start/, (msg, match) => {
	// Текст сообщения
	let message = ", привет, я бот помощник канала Инстаграмотность.\n\nТы можешь задать мне вопрос, и Илья рассмотрит его в одном из следующих выпусков рубрики ответы на вопросы.\n\nЕсли вопроса нет, переходи и читай @INSTAumka";
	// Отправка сообщения
	bot.sendMessage(msg.chat.id,msg.from.first_name + message);
  
});

bot.on('message', (msg) => {
    console.log(msg);
if (msg.text != '/start') {
    bot.forwardMessage(245217438, msg.chat.id, msg.message_id);
    bot.sendMessage(msg.chat.id, msg.from.first_name + ', спасибо за вопрос. Мы его обязательно рассмотрим!');
}
});
