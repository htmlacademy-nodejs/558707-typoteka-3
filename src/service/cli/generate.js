'use strict';

const {writeFileSync} = require(`fs`);

const {getRandomInt, shuffle} = require(`../../utils`);

const {ExitCode: {ERROR}, Command: {GENERATE}} = require(`../../constants`);

const FILE_NAME = `mock.json`;

const PublicationsCount = {
  DEFAULT: 1,
  MAX: 1000,
};

const THREE_MONTHS_MILLISECONDS = 3 * 30 * 24 * 60 * 60 * 1000;

const CURRENT_DATE = new Date();

const AnnounceSentencesCount = {
  MIN: 1,
  MAX: 5,
};

const TITLES = [
  `Ёлки. История деревьев`,
  `Как перестать беспокоиться и начать жить`,
  `Как достигнуть успеха не вставая с кресла`,
  `Обзор новейшего смартфона`,
  `Лучше рок-музыканты 20-века`,
  `Как начать программировать`,
  `Учим HTML и CSS`,
  `Что такое золотое сечение`,
  `Как собрать камни бесконечности`,
  `Борьба с прокрастинацией`,
  `Рок — это протест`,
  `Самый лучший музыкальный альбом этого года`,
];

const SENTENCES = [
  `Ёлки — это не просто красивое дерево. Это прочная древесина.`,
  `Первая большая ёлка была установлена только в 1938 году.`,
  `Вы можете достичь всего. Стоит только немного постараться и запастись книгами.`,
  `Этот смартфон — настоящая находка. Большой и яркий экран, мощнейший процессор — всё это в небольшом гаджете.`,
  `Золотое сечение — соотношение двух величин, гармоническая пропорция.`,
  `Собрать камни бесконечности легко, если вы прирожденный герой.`,
  `Освоить вёрстку несложно. Возьмите книгу новую книгу и закрепите все упражнения на практике.`,
  `Бороться с прокрастинацией несложно. Просто действуйте. Маленькими шагами.`,
  `Программировать не настолько сложно, как об этом говорят.`,
  `Простые ежедневные упражнения помогут достичь успеха.`,
  `Это один из лучших рок-музыкантов.`,
  `Он написал больше 30 хитов.`,
  `Из под его пера вышло 8 платиновых альбомов.`,
  `Процессор заслуживает особого внимания. Он обязательно понравится геймерам со стажем.`,
  `Рок-музыка всегда ассоциировалась с протестами. Так ли это на самом деле?`,
  `Достичь успеха помогут ежедневные повторения.`,
  `Помните, небольшое количество ежедневных упражнений лучше, чем один раз, но много.`,
  `Как начать действовать? Для начала просто соберитесь.`,
  `Игры и программирование разные вещи. Не стоит идти в программисты, если вам нравится только игры.`,
  `Альбом стал настоящим открытием года. Мощные гитарные рифы и скоростные соло-партии не дадут заскучать.`,
];

const CATEGORIES = [
  `Деревья`,
  `За жизнь`,
  `Без рамки`,
  `Разное`,
  `IT`,
  `Музыка`,
  `Кино`,
  `Программирование`,
  `Железо`,
];

const addZeroForString = (number) => `${number}`.padStart(2, `0`);

const generateAnnounceDate = (currentDate, periodMilliseconds) => {
  const announceDate = new Date(currentDate.getTime() - getRandomInt(0, periodMilliseconds));
  const month = addZeroForString(announceDate.getMonth() + 1);
  const date = addZeroForString(announceDate.getDate());
  const hours = addZeroForString(announceDate.getHours());
  const minutes = addZeroForString(announceDate.getMinutes());
  const seconds = addZeroForString(announceDate.getSeconds());

  return `${announceDate.getFullYear()}-${month}-${date} ${hours}:${minutes}:${seconds}`;
};

const generatePublications = (count) => (
  Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    createdDate: generateAnnounceDate(CURRENT_DATE, THREE_MONTHS_MILLISECONDS),
    announce: shuffle(SENTENCES).slice(0, getRandomInt(AnnounceSentencesCount.MIN, AnnounceSentencesCount.MAX)).join(` `),
    fullText: shuffle(SENTENCES).slice(0, getRandomInt(AnnounceSentencesCount.MIN, SENTENCES.length - 1)).join(` `),
    category: shuffle(CATEGORIES).slice(0, getRandomInt(0, CATEGORIES.length - 1)),
  }))
);

module.exports = {
  name: GENERATE,
  run(args) {
    const count = parseInt(args, 10) || PublicationsCount.DEFAULT;

    if (count > PublicationsCount.MAX) {
      console.info(`Не больше ${PublicationsCount.MAX} публикаций`);
      process.exit(ERROR);
    }

    const content = JSON.stringify(generatePublications(count));

    writeFileSync(FILE_NAME, content);
  },
};
