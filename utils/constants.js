const badRequestMessage = 'Переданные данные не корректны';
const authorizationErrorMessage = 'Ошибка авторизации';
const wrongEmailOrPasswordMessage = 'Неправильные почта или пароль';
const forbiddenCardDeleteMessage = 'Нельзя удалить чужую карточку';
const userNotFoundMessage = 'Пользователь не найден';
const cardNotFoundMessage = 'Карточка не найдена';
const pageNotFoundMessage = 'Страница не найдена';
const emailAlreadyRegisteredMessage = 'Пользователь с таким email уже зарегистрирован';
const defaultErrorMessage = 'Произошла ошибка на сервере';

const urlRegex = /^http(s)?:\/\/(www\.)?[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]{1,256}\.[a-z]{1,6}\b[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*$/;

const {
  PORT = 3000,
  MONGO_URI = 'mongodb://localhost:27017/bitfilmsdb',
  JWT_SECRET = 'never share your secret',
  SALT_ROUNDS = '10',
} = process.env;

module.exports = {
  badRequestMessage,
  cardNotFoundMessage,
  forbiddenCardDeleteMessage,
  userNotFoundMessage,
  pageNotFoundMessage,
  wrongEmailOrPasswordMessage,
  defaultErrorMessage,
  authorizationErrorMessage,
  emailAlreadyRegisteredMessage,
  urlRegex,
  PORT,
  MONGO_URI,
  JWT_SECRET,
  SALT_ROUNDS: parseInt(SALT_ROUNDS, 10),
};
