function sendResponse(res, status, msg) {
  return res.json({ status, msg });
}

module.exports = { sendResponse };
