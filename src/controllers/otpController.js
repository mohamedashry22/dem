const otpService = require('../services/otpService');

async function requestOtp(req, res, next) {
  try {
    const { emailOrPhone, deviceId } = req.body;
    const session = otpService.createOtpSession(emailOrPhone, deviceId);
    res.json({ success: true, sessionId: session.sessionId, otp: session.otp });
  } catch (err) {
    next(err);
  }
}

async function verifyOtp(req, res, next) {
  try {
    const { sessionId, otp } = req.body;
    const verified = otpService.verifyOtp(sessionId, otp);
    res.json({ verified });
  } catch (err) {
    next(err);
  }
}

async function getLogs(req, res, next) {
  try {
    const logs = otpService.getLogs();
    res.json(logs);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  requestOtp,
  verifyOtp,
  getLogs
};
