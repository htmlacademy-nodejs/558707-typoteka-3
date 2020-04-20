"use strict";

const nanoid = require(`nanoid`);

const {readFile, writeFile} = require(`fs`).promises;

const EMPTY_FILE_MESSAGE = `[]`;

const getContent = async (filePath, isNeedToParse = true) => {
  const fileContent = await readFile(filePath, `utf-8`) || EMPTY_FILE_MESSAGE;
  return isNeedToParse ? JSON.parse(fileContent) : fileContent;
};

const rewriteContent = async (fileName, contents) => await writeFile(fileName, JSON.stringify(contents));

const addElementToContent = (contents, requestBody) => {
  requestBody.id = nanoid.nanoid(5);
  contents.push(requestBody);
};

const removeElementFromContent = (contents, element) => {
  const elementIndex = contents.indexOf(element);
  contents.splice(elementIndex, 1);
};

const updateElementContent = (element, requestBody) => {
  for (let key in requestBody) {
    if (requestBody.hasOwnProperty(key)) {
      if (!requestBody[key]) {
        throw new Error(`Empty VALUE of KEY: ${key}`);
      }

      element[key] = requestBody[key];
    }
  }
};

const getElementById = (contents, elementId) => {
  const element = contents.find((offer) => offer.id === elementId);

  if (!element) {
    throw new Error(`Not found ELEMENT by ID: ${elementId}`);
  }

  return element;
};

const validateBodyRequest = (requestBody, fieldsCount) => {
  const keys = Object.keys(requestBody);
  const values = Object.values(requestBody);
  const emptyValues = values.filter((value) => value === ``);
  const isAllFields = keys.length === fieldsCount;
  const hasEmptyValues = emptyValues.length > 0;

  if (!isAllFields || hasEmptyValues) {
    throw new Error(`${keys.length} fields of required ${fieldsCount};\n
                        Empty values count: ${emptyValues.length}.`);
  }
};

module.exports = {
  getContent,
  rewriteContent,
  addElementToContent,
  removeElementFromContent,
  updateElementContent,
  getElementById,
  validateBodyRequest,
};
