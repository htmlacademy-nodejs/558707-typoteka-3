"use strict";

const nanoid = require(`nanoid`);

const {readFile, writeFile} = require(`fs`).promises;

const EMPTY_FILE_MESSAGE = `[]`;

const getContent = async (filePath) => {
  const fileContent = await readFile(filePath, `utf-8`) || EMPTY_FILE_MESSAGE;
  return typeof fileContent === `string` ? fileContent : JSON.parse(fileContent);
};

const rewriteContent = async (fileName, content) => await writeFile(fileName, JSON.stringify(content));

const addElementToContent = (content, requestBody) => {
  const newElement = requestBody;
  newElement.id = nanoid.nanoid(5);
  content.push(newElement);
};

const removeElementFromContent = (content, element) => {
  const elementIndex = content.indexOf(element);
  content.splice(elementIndex, 1);
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

const getElementById = (content, elementId) => {
  const element = content.find((offer) => offer.id === elementId);

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
