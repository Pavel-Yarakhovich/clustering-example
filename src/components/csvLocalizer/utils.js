export const prepareInitialData = (loadedData) => {
  const dataObj = {};
  loadedData.forEach((x) => {
    dataObj[x.data[0]] = x.data.slice(1);
  });
  return dataObj;
};

export const prepareInitialDataFromJson = (initalJSON) => {
  const data = {};

  function processKeyValuePair(dataObj, baseKey) {
    Object.entries(dataObj).forEach(([key, value]) => {
      const dataKey = baseKey ? `${baseKey}.${key}` : key;
      if (typeof value === "string") {
        data[dataKey] = data[dataKey] ? [...data[dataKey], value] : [value];
      } else {
        processKeyValuePair(value, dataKey);
      }
    });
  }
  processKeyValuePair(initalJSON);

  return data;
};

export const combineTranslations = (translationFiles) => {
  if (translationFiles.length === 0) return;
  const mainFile = translationFiles[0];
  translationFiles.slice(1).forEach((file) => {
    Object.entries(file).forEach(([key, value]) => {
      if (mainFile[key]) {
        mainFile[key] = [...mainFile[key], ...value];
      }
    });
  });
  return mainFile;
};
