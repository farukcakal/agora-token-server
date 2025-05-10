const express = require('express');
const {RtcTokenBuilder, RtcRole} = require('agora-access-token');
const dotenv = require('dotenv');

dotenv.config();

const PORT = process.env.PORT || 8080;
const APP_ID = process.env.APP_ID;
const APP_CERTIFICATE = process.env.APP_CERTIFICATE;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS ayarları (isteğe bağlı)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Token oluşturma endpoint'i
app.get('/rtc-token', (req, res) => {
  // Gerekli parametreleri al
  const channelName = req.query.channelName;
  const uid = req.query.uid || 0;
  const role = req.query.role === 'publisher' ? RtcRole.PUBLISHER : RtcRole.SUBSCRIBER;

  if (!channelName) {
    return res.status(400).json({ 'error': 'Channel name is required' });
  }

  // Token süresi hesapla (1 saat)
  const expirationTimeInSeconds = 3600;
  const currentTimestamp = Math.floor(Date.now() / 1000);
  const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

  // Token oluştur
  let token;
  try {
    token = RtcTokenBuilder.buildTokenWithUid(
      APP_ID, 
      APP_CERTIFICATE, 
      channelName, 
      uid, 
      role, 
      privilegeExpiredTs
    );
  } catch (error) {
    console.error('Token oluşturma hatası:', error);
    return res.status(500).json({ 'error': 'Token generation failed' });
  }

  // Yanıt gönder
  return res.json({ 'token': token });
});

// Sunucuyu başlat
app.listen(PORT, () => {
  console.log(`Agora Token Server is running on port: ${PORT}`);
});

