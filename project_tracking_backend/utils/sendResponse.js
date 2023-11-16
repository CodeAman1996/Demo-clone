module.exports.sendResponse = (statusCode, body, headerData = {}) => {
  const headers = {
    ...headerData,
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  };
  return {
    statusCode,
    body: JSON.stringify(body),
    headers,
  };
};
