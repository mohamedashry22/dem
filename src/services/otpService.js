const { v4: uuidv4 } = require('uuid');
const generateOtp = require('../utils/otpGenerator');

const sessions = new Map();
const logs = [];

function createOtpSession(emailOrPhone, deviceId) {
  const sessionId = uuidv4();
  const otp = generateOtp();
  const createdAt = Date.now();

  sessions.set(sessionId, { emailOrPhone, deviceId, otp, createdAt, verified: false });

  console.log(`Sending Push Notification... (Simulated)`);
  console.log(`Sending SMS fallback... (Simulated)`);
  console.log(`Sending Email fallback... (Simulated)`);

  logs.push({ sessionId, action: 'otp_generated', timestamp: new Date().toISOString() });

  return { sessionId };
}

function verifyOtp(sessionId, otpInput) {
  const session = sessions.get(sessionId);
  if (!session) return false;

  // OTP expiry 5 minutes
  const isExpired = Date.now() - session.createdAt > 5 * 60 * 1000;
  if (isExpired || session.verified) return false;

  if (session.otp === otpInput) {
    session.verified = true;
    logs.push({ sessionId, action: 'otp_verified', timestamp: new Date().toISOString() });
    return true;
  }

  logs.push({ sessionId, action: 'otp_failed', timestamp: new Date().toISOString() });
  return false;
}

function getLogs() {
  return logs;
}

module.exports = {
  createOtpSession,
  verifyOtp,
  getLogs
};
