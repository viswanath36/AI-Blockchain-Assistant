let documentText = "";

const saveDocumentText = (text) => {
  documentText = text;
};

const getDocumentText = () => {
  return documentText;
};

module.exports = {
  saveDocumentText,
  getDocumentText
};