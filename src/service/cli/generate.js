'use strict';

const {getRandomInt, shuffle} = require(`../../utils`);

const FILE_NAME = `mock.json`;

const DEFAULT_COUNT = 1;

const THREE_MONTHS_MILLISECONDS = 3 * 30 * 24 * 60 * 60 * 1000;

const CURRENT_DATE = new Date();

const AnnounceSentencesCount = {
  min: 1,
  max: 5,
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

const generateAnnounceDate = (currentDate, periodMilliseconds) => {
  const announceDate = new Date(currentDate.getTime() - getRandomInt(0, periodMilliseconds));
  const month = announceDate.getMonth() + 1 > 9 ? announceDate.getMonth() + 1 : `0${announceDate.getMonth() + 1}`;
  const date = announceDate.getDate() > 9 ? announceDate.getDate() : `0${announceDate.getDate()}`;
  const hours = announceDate.getHours() > 9 ? announceDate.getHours() : `0${announceDate.getHours()}`;
  const minutes = announceDate.getMinutes() > 9 ? announceDate.getMinutes() : `0${announceDate.getMinutes()}`;
  const seconds = announceDate.getSeconds() > 9 ? announceDate.getSeconds() : `0${announceDate.getSeconds()}`;

  return `${announceDate.getFullYear()}-${month}-${date} ${hours}:${minutes}:${seconds}`;
};

const generatePublications = (count) => (
  Array(count).fill({}).map(() => ({
    title: TITLES[getRandomInt(0, TITLES.length - 1)],
    createdDate: generateAnnounceDate(CURRENT_DATE, THREE_MONTHS_MILLISECONDS),
    announce: shuffle(SENTENCES).slice(0, getRandomInt(AnnounceSentencesCount.min, AnnounceSentencesCount.max)),
    fullText: shuffle(SENTENCES).slice(0, getRandomInt(AnnounceSentencesCount.min, SENTENCES.length - 1)),
    category: shuffle(CATEGORIES).slice(0, getRandomInt(0, CATEGORIES.length - 1)),
  }))
);

module.exports = {
  name: `--generate`,
  run(args) {
    const [count] = args;
    const countPublications = parseInt(count, 10) || DEFAULT_COUNT;
    const content = JSON.stringify(generatePublications(countPublications));

    const fs = require(`fs`);

    fs.writeFile(FILE_NAME, content, (err) => {
      if (err) {
        return console.error(`Can't write data to file...`);
      }

      return console.info(`Operation success. File created.`);
    });
  },
};
