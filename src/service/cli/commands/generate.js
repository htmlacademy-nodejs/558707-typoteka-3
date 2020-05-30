'use strict';

const nanoid = require(`nanoid`);
const {writeFile, readFile} = require(`fs`).promises;

const {getRandomInt, shuffle, logger} = require(`../../../utils`);
const {ExitCode, Command, FILE_NAME} = require(`../../../constants`);

const PublicationsCount = {
  DEFAULT: 1,
  MAX: 1000,
};

const FilePath = {
  SENTENCES: `./data/sentences.txt`,
  TITLES: `./data/titles.txt`,
  CATEGORIES: `./data/categories.txt`,
  COMMENTS: `./data/comments.txt`,
};

const THREE_MONTHS_MILLISECONDS = 3 * 30 * 24 * 60 * 60 * 1000;

const CURRENT_DATE = new Date();

const AnnounceSentencesCount = {
  MIN: 1,
  MAX: 5,
};

const readContent = async (filePath) => {
  try {
    const content = await readFile(filePath, `utf8`);
    return content.replace(/\r/g, ``).split(`\n`).slice(0, -1);
  } catch (err) {
    logger.showError(err);
    return [];
  }
};

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

const generatePublications = (count, titles, categories, sentences, comments) => (
  Array(count).fill({}).map(() => ({
    id: nanoid.nanoid(5),
    title: titles[getRandomInt(0, titles.length - 1)],
    createdDate: generateAnnounceDate(CURRENT_DATE, THREE_MONTHS_MILLISECONDS),
    announce: shuffle(sentences).slice(0, getRandomInt(AnnounceSentencesCount.MIN, AnnounceSentencesCount.MAX)).join(` `),
    fullText: shuffle(sentences).slice(0, getRandomInt(AnnounceSentencesCount.MIN, sentences.length - 1)).join(` `),
    category: shuffle(categories).slice(0, getRandomInt(1, categories.length - 1)),
    comments: Array(getRandomInt(1, 3)).fill({}).map(() => ({
      id: nanoid.nanoid(5),
      text: shuffle(comments).slice(1, 3).join(` `),
    })),
  }))
);

module.exports = {
  name: Command.GENERATE,
  async run(count) {
    const sentences = await readContent(FilePath.SENTENCES);
    const titles = await readContent(FilePath.TITLES);
    const categories = await readContent(FilePath.CATEGORIES);
    const comments = await readContent(FilePath.COMMENTS);

    const formattedCount = parseInt(count, 10) || PublicationsCount.DEFAULT;

    if (formattedCount > PublicationsCount.MAX) {
      logger.showError(`Не больше ${PublicationsCount.MAX} публикаций`);
      process.exit(ExitCode.ERROR);
    }

    const content = JSON.stringify(generatePublications(formattedCount, titles, categories, sentences, comments));

    try {
      await writeFile(FILE_NAME, content);
      logger.showSuccess(`Operation success. File created.`);
      process.exit(ExitCode.SUCCESS);
    } catch (err) {
      logger.showError(`Can't write data to file...`);
      process.exit(ExitCode.ERROR);
    }
  },
};
