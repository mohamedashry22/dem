const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const otpController = require('./controllers/otpController');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

const allowedOrigins = [
  'http://localhost:3000',
  'https://otpdemo.netlify.app'
];

app.use(cors({
  origin: allowedOrigins,
}));

app.use(helmet());
app.use(express.json());

app.post('/api/request-otp', otpController.requestOtp);
app.post('/api/verify-otp', otpController.verifyOtp);
app.get('/api/logs', otpController.getLogs);
app.get('/api/health', (req, res) => res.json({ status: 'ok' }));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
