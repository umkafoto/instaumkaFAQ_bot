// Подключение модуля
var TelegramBot = require('node-telegram-bot-api');

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

bot.onText(/\/help/, (msg, match) => {
  // Текст сообщения
  let message = "Бот канала Инстаграмотность. Здесь вы можете задать свои вопросы по Instagram, и в одном из выпуском получить отвт на них";
  // Отправка сообщения
  bot.sendMessage(msg.chat.id,message);
  
});

bot.on('message', (msg) => {
    console.log(msg);
if (msg.text != '/start' && msg.text!='/help') {
    bot.forwardMessage(245217438, msg.chat.id, msg.message_id);
    bot.sendMessage(msg.chat.id, msg.from.first_name + ', спасибо за вопрос. Мы его обязательно рассмотрим!');
}
});
